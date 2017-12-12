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
import { addReviewReq } from '@/service';

export default {
  data: () => ({
    ispass: false,
    status: '否',
    postinfo: {},
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
  methods: {
    confirm() {
      this.$refs.loading.open();
      let isPass = 0;
      if (this.ispass === true) {
        isPass = 1;
      }
      const reviewInfo = {
        content: this.reviewcontent,
        time: new Date().getTime(),
        ispass: isPass,
      };
      addReviewReq(reviewInfo, this.postinfo.id, this.userInfo.id).then(() => {
        this.$emit('closeDialog', 'accepted', 'reviewdialog');
        this.$refs.loading.close();
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.$refs.snackbar.msg = '不知名错误！';
        this.$refs.snackbar.open();
        this.$refs.loading.close();
      });
    },
    cancel() {
      this.$emit('closeDialog', 'cancel', 'reviewDialog');
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