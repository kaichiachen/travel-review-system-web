<template>
<div class="reviewContainer">
    <md-table>
      <md-table-header>
          <md-table-row>
              <md-table-head>标题</md-table-head>
              <md-table-head>地点</md-table-head>
              <md-table-head>时间</md-table-head>
              <md-table-head>其他操作</md-table-head>
          </md-table-row>
      </md-table-header>

      <md-table-body>
          <md-table-row v-for="(row, index) in reviews" :key="index">
              <md-table-cell>{{ reviews[index].reviewpostreviewrelation.title }}</md-table-cell>
              <md-table-cell>{{ reviews[index].reviewpostreviewrelation.location }}</md-table-cell>
              <md-table-cell>{{ reviews[index].reviewpostreviewrelation.submittime }}</md-table-cell>
              <md-menu md-direction="bottom left" md-size="3">
                  <md-button class="md-icon-button" md-menu-trigger>
                      <md-icon>edit</md-icon>
                  </md-button>
                  <md-menu-content>
                    <md-menu-item @click="deleteReview(reviews[index].id)">
                      <md-icon>delete</md-icon>
                      <span>删除</span>
                    </md-menu-item>
                    <md-menu-item @click="showDetail(index)">
                      <md-icon>details</md-icon>
                      <span>修改/检视</span>
                    </md-menu-item>
                  </md-menu-content>
              </md-menu>
          </md-table-row>
      </md-table-body>
    </md-table>

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
</div>
</template>

<script>

import { reviewPostListReq, reviewListReq } from '@/service';
import { timeConverter } from '@/config/utils';
import reviewdetail from '@/page/ReviewDetail';
import reviewpost from '@/page/ReviewPost';
import snackbar from '@/components/SnackBar';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      nowreview: {},
      allreviews: [
      ],
      reviews: [
      ],
    };
  },
  components: {
    snackbar,
    reviewdetail,
    reviewpost,
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
    initMyReviewss() {
      reviewListReq().then((success) => {
        if (success.Review !== undefined) {
          const res = success.Review;
          this.reviews = [];
          for (let i = 0; i < res.length; i += 1) {
            this.revies.push(res[i]);
          }
        }
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.$refs.snackbar.msg = '不知名错误！';
        this.$refs.snackbar.open();
      });
    },
    initAllReviews() {
      reviewPostListReq().then((success) => {
        if (success.Reviewpost !== undefined) {
          const res = success.Reviewpost;
          this.allreviews = [];
          for (let i = 0; i < res.length; i += 1) {
            res[i].submittime = timeConverter(res[i].submittime);
            this.allreviews.push(res[i]);
          }
        }
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
      });
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    showDetail(index) {
      this.type = 'reviewdetail';
      this.$refs.reviewdetail.reviewinfo = this.reviews[index];
      this.$refs.reviewdetail.ispass = this.reviews[index].ispass;
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
    reviewEventEmitted(status, ref) {
      if (status === 'accepted') {
        this.closeDialog(ref);
      } else if (status === 'cancel') {
        this.closeDialog(ref);
      }
    },
  },
};
</script>

<<style>
.reviewContainer {
    margin-top: 3%;
    padding-top: 3%;
    padding-bottom: 3%;
    margin-left: 5%;
    width: 90%;
    border: 1px groove;
    border-color: #CCCCCC;
}
.dialogcontent {
  width: 70vw;
}
.md-table .md-table-cell.md-has-action .md-table-cell-container {
  justify-content: space-around;
  font-size: 15pt;
}
.md-table .md-table-head {
  text-align: center;
  font-size: 15pt;
}
.md-table .md-table-cell {
  text-align: center;
  font-size: 15pt;
}
</style>
