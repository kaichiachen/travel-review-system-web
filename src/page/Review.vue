<template>
<div class="reviewContainer">
    <md-table-card style="padding-bottom: 10px; padding-top: 10px;">
      <md-toolbar>
          <h1 class="md-title">我的评论</h1>
      </md-toolbar>
      <md-table>
        <md-table-header>
            <md-table-row>
                <md-table-head>标题</md-table-head>
                <md-table-head>作者</md-table-head>
                <md-table-head>地点</md-table-head>
                <md-table-head>时间</md-table-head>
                <md-table-head>其他操作</md-table-head>
            </md-table-row>
        </md-table-header>

        <md-table-body>
            <md-table-row v-for="(row, index) in myreviews" :key="index">
                <md-table-cell>{{ myreviews[index].posttitle }}</md-table-cell>
                <md-table-cell>{{ myreviews[index].postauthor }}</md-table-cell>
                <md-table-cell>{{ myreviews[index].postlocation }}</md-table-cell>
                <md-table-cell>{{ myreviews[index].postsubmittime }}</md-table-cell>
                <md-menu md-direction="bottom left" md-size="3">
                    <md-button class="md-icon-button" md-menu-trigger>
                        <md-icon>edit</md-icon>
                    </md-button>
                    <md-menu-content>
                      <md-menu-item @click="showDetail(index)">
                        <md-icon>details</md-icon>
                        <span>检视</span>
                      </md-menu-item>
                    </md-menu-content>
                </md-menu>
            </md-table-row>
        </md-table-body>
      </md-table>
    </md-table-card>

    <md-table-card style="margin-top: 50px; padding-bottom: 10px; padding-top: 10px;">
      <md-toolbar>
          <h1 class="md-title">可评论文章</h1>
      </md-toolbar>
      <md-table>
        <md-table-header>
            <md-table-row>
                <md-table-head>标题</md-table-head>
                <md-table-head>作者</md-table-head>
                <md-table-head>地点</md-table-head>
                <md-table-head>时间</md-table-head>
                <md-table-head>其他操作</md-table-head>
            </md-table-row>
        </md-table-header>

        <md-table-body>
            <md-table-row v-for="(row, index) in allreviews" :key="index">
                <md-table-cell>{{ allreviews[index].title }}</md-table-cell>
                <md-table-cell>{{ allreviews[index].author }}</md-table-cell>
                <md-table-cell>{{ allreviews[index].location }}</md-table-cell>
                <md-table-cell>{{ allreviews[index].submittime }}</md-table-cell>
                <md-menu md-direction="bottom left" md-size="3">
                    <md-button class="md-icon-button" md-menu-trigger>
                        <md-icon>edit</md-icon>
                    </md-button>
                    <md-menu-content>
                      <md-menu-item @click="reviewpost(index)">
                        <md-icon>details</md-icon>
                        <span>评论</span>
                      </md-menu-item>
                    </md-menu-content>
                </md-menu>
            </md-table-row>
        </md-table-body>
      </md-table>
    </md-table-card>


    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="detaildialog">
      <md-dialog-content class='dialogcontent'>
        <reviewdetail ref="reviewdetail" v-on:closeDialog="reviewEventEmitted"></reviewdetail>
      </md-dialog-content>
    </md-dialog>
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="reviewdialog">
      <md-dialog-content class='dialogcontent'>
        <reviewpost ref="reviewpost" v-on:closeDialog="reviewEventEmitted"></reviewpost>
      </md-dialog-content>
    </md-dialog>
    <snackbar ref="snackbar"></snackbar>
    <loading ref="loading"></loading>
</div>
</template>

<script>

import { reviewPostListReq, reviewListReq } from '@/service';
import { timeConverter } from '@/config/utils';
import reviewdetail from '@/page/ReviewDetail';
import reviewpost from '@/page/ReviewPost';
import snackbar from '@/components/SnackBar';
import { mapState } from 'vuex';
import loading from '@/components/Loading';

export default {
  data() {
    return {
      nowreview: {},
      allreviews: [
      ],
      myreviews: [
      ],
      isAllReviewsDownload: false,
      isMyReviewsDownload: false,
    };
  },
  components: {
    snackbar,
    reviewdetail,
    reviewpost,
    loading,
  },
  computed: {
    ...mapState([
      'userInfo',
    ]),
  },
  mounted() {
    this.initMyReviews();
    this.initAllReviews();
  },
  methods: {
    initMyReviews() {
      // this.$refs.loading.open();
      reviewListReq().then((success) => {
        if (success.Review !== undefined) {
          const res = success.Review;
          this.myreviews = [];
          for (let i = 0; i < res.length; i += 1) {
            if (res[i].author === this.userInfo.name) {
              this.myreviews.push(res[i]);
            }
          }
        }
        this.isMyReviewsDownload = true;
        if (this.isMyReviewsDownload && this.isAllReviewsDownload) {
          this.mergeData();
          this.$refs.loading.close();
        }
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.$refs.snackbar.msg = '不知名错误！';
        this.$refs.snackbar.open();
        this.isMyReviewsDownload = true;
        if (this.isMyReviewsDownload && this.isAllReviewsDownload) {
          this.$refs.loading.close();
          this.mergeData();
        }
      });
    },
    initAllReviews() {
      reviewPostListReq().then((success) => {
        if (success.Reviewpost !== undefined) {
          const res = success.Reviewpost;
          this.allreviews = [];
          for (let i = 0; i < res.length; i += 1) {
            if ((this.userInfo.role === 2 && res[i].status === 0)
            || (this.userInfo.role === 1 && res[i].status === 1)) {
              res[i].submittime = timeConverter(res[i].submittime);
              this.allreviews.push(res[i]);
            }
          }
        }
        this.isAllReviewsDownload = true;
        if (this.isMyReviewsDownload && this.isAllReviewsDownload) {
          this.$refs.loading.close();
          this.mergeData();
        }
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.isAllReviewsDownload = true;
        if (this.isMyReviewsDownload && this.isAllReviewsDownload) {
          this.$refs.loading.close();
          this.mergeData();
        }
      });
    },
    mergeData() {
      for (let i = 0; i < this.myreviews.length; i += 1) {
        for (let j = this.allreviews.length - 1; j >= 0; j -= 1) {
          if (this.myreviews[i].postid === this.allreviews[j].id) {
            this.myreviews[i].posttitle = this.allreviews[j].title;
            this.myreviews[i].postauthor = this.allreviews[j].author;
            this.myreviews[i].postlocation = this.allreviews[j].location;
            this.myreviews[i].postsubmittime = this.allreviews[j].submittime;
            this.myreviews[i].postcontent = this.allreviews[j].content;
            this.allreviews.splice(j, 1);
            break;
          }
        }
      }
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    showDetail(index) {
      this.type = 'reviewdetail';
      this.$refs.reviewdetail.reviewinfo = this.myreviews[index];
      this.$refs.reviewdetail.ispass = this.myreviews[index].ispass;
      if (this.$refs.reviewdetail.ispass) {
        this.$refs.reviewdetail.status = '是';
      } else {
        this.$refs.reviewdetail.status = '否';
      }
      this.$refs.detaildialog.open();
    },
    reviewpost(index) {
      this.type = 'reviewpost';
      this.$refs.reviewpost.postinfo = this.allreviews[index];
      this.$refs.reviewdialog.open();
    },
    reviewEventEmitted(msg, ref) {
      this.closeDialog(ref);
      if (msg === 'accept' && ref === 'reviewdialog') {
        this.isMyReviewsDownload = false;
        this.isAllReviewsDownload = false;
        this.initMyReviews();
        this.initAllReviews();
        this.$refs.loading.open();
      }
    },
  },
};
</script>

<<style>
.reviewContainer {
    margin-top: 1%;
    padding-top: 1%;
    padding-bottom: 3%;
    margin-left: 5%;
    width: 90%;
}
.dialogcontent {
  width: 70vw;
}
.md-table .md-table-cell.md-has-action .md-table-cell-container {
  justify-content: space-around;
}
.md-table .md-table-head {
  text-align: center;
}
.md-table .md-table-cell {
  text-align: center;
}
</style>
