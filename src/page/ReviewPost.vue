<template>
<div class="reviewdetailcontainer">
  <md-card md-with-hover>
    <md-card-header>
        <div class="md-title">{{postinfo.title}}</div>
        <div class="md-subhead">作者：{{postinfo.author}}</div>
    </md-card-header>

    <md-card-content>
        {{ postinfo.content}}
    </md-card-content>
  </md-card>

  <md-card md-with-hover class="mypasscard">
    <md-card-header>
        <div class="md-title ">是否通过</div>
    </md-card-header>

    <md-card-content>
        <md-switch v-model="ispass" id="my-test1" name="my-test1" class="md-primary"  @change="switchchange()">{{status}}</md-switch>
    </md-card-content>
  </md-card>
  

  <md-card md-with-hover class="myreviewcard">
    <md-card-header>
        <div class="md-title">个人意见</div>
    </md-card-header>

    <md-card-content>
      <md-input-container>
          <md-textarea maxlength="1000" v-model="reviewcontent"></md-textarea>
      </md-input-container>
    </md-card-content>
    <md-card-actions>
      <md-button @click="cancel()">取消</md-button>
      <md-button @click="confirm()">确定</md-button>
  </md-card-actions>
  </md-card>
  <snackbar ref="snackbar"></snackbar>
  <loading ref="loading"></loading>
</div>
</template>

<script>
import { mapState } from 'vuex';
import loading from '@/components/Loading';
import snackbar from '@/components/SnackBar';
import { reviewPostListReq, addReviewReq, updateReviewPostReq, addPostReq } from '@/service';

export default {
  data: () => ({
    ispass: false,
    isPass: 0,
    status: '否',
    postinfo: {},
    reviewcontent: '',
    allpostreviews: [],
  }),
  components: {
    loading,
    snackbar,
  },
  computed: {
    ...mapState([
      'userInfo',
    ]),
  },
  mounted() {
    this.initAllReviewPost();
  },
  methods: {
    initAllReviewPost() {
      reviewPostListReq().then((success) => {
        if (success.Reviewpost !== undefined) {
          const res = success.Reviewpost;
          this.allpostreviews = [];
          for (let i = 0; i < res.length; i += 1) {
            if (this.userInfo.role === 2 && res[i].status === 0) {
              this.allpostreviews.push(res[i]);
            }
            if (this.userInfo.role === 1 && res[i].status === 1) {
              this.allpostreviews.push(res[i]);
            }
          }
        }
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
      });
    },
    confirm() {
      this.$refs.loading.open();
      this.isPass = 0;
      if (this.ispass === true) {
        this.isPass = 1;
      }
      // submittime: new Date().getTime(),
      const reviewInfo = {
        content: this.reviewcontent,
        ispass: this.isPass,
      };
      addReviewReq(reviewInfo, this.postinfo.id, this.userInfo.name).then(() => {
        this.checkScore();
        this.$emit('closeDialog', 'accept', 'reviewdialog');
        this.$refs.loading.close();
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.$refs.snackbar.msg = '不知名错误！';
        this.$refs.snackbar.open();
        this.$refs.loading.close();
      });
    },
    checkScore() {
      for (let i = 0; i < this.allpostreviews.length; i += 1) {
        if (this.allpostreviews[i].id === this.postinfo.id) {
          if (this.userInfo.role === 2 && this.allpostreviews[i].status === 0) {
            this.allpostreviews[i].reviewnum += 1;
            if (this.ispass) {
              this.allpostreviews[i].count += 1;
            }
            if (this.allpostreviews[i].reviewnum - this.allpostreviews[i].count >= 3) {
              this.allpostreviews[i].status = -1;
              this.reviewpostFailOut(this.allpostreviews[i]);
            } else {
              if (this.allpostreviews[i].count >= 3) {
                this.allpostreviews[i].status += 1;
                this.allpostreviews[i].count = 0;
                this.allpostreviews[i].reviewnum = 0;
              }
              this.reviewpostPass(this.allpostreviews[i]);
            }
            break;
          } else if (this.userInfo.role === 1 && this.allpostreviews[i].status === 1) {
            this.allpostreviews[i].reviewnum += 1;
            if (this.ispass) {
              this.allpostreviews[i].count += 1;
            }
            if (this.allpostreviews[i].reviewnum - this.allpostreviews[i].count >= 2) {
              this.allpostreviews[i].status = -1;
              this.reviewpostFailOut(this.allpostreviews[i]);
            } else {
              if (this.allpostreviews[i].count >= 2) {
                this.allpostreviews[i].status += 1;
              }
              this.reviewpostPass(this.allpostreviews[i]);
            }
            break;
          }
        }
      }
    },
    reviewpostFailOut(info) {
      updateReviewPostReq(info).then(() => {
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
      });
    },
    reviewpostPass(info) {
      updateReviewPostReq(info).then(() => {
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
      });
      if (info.status === 2) {
        addPostReq({
          title: info.title,
          content: info.content,
          submittime: info.submittime,
          location: info.location,
          author: info.author,
          tags: info.tags,
        }).then(() => {
        }, (error) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(error);
        });
      }
    },
    cancel() {
      this.$emit('closeDialog', 'cancel', 'reviewdialog');
    },
    switchchange() {
      if (!this.ispass) {
        this.status = '是';
      } else {
        this.status = '否';
      }
    },
  },
};
</script>

<style>
.mypasscard {
  margin-top: 50px;
}
.myreviewcard {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>