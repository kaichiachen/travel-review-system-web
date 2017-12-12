<template>
<div class="reviewdetailcontainer">
  <md-card md-with-hover>
    <md-card-header>
        <div class="md-title">{{reviewinfo.posttitle}}</div>
        <div class="md-subhead">作者：{{reviewinfo.postauthor}}</div>
    </md-card-header>

    <md-card-content>
        {{ reviewinfo.postcontent}}
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
      {{ this.reviewinfo.content }}
    </md-card-content>
  </md-card>
  <snackbar ref="snackbar"></snackbar>
  <loading ref="loading"></loading>
</div>
</template>

<script>

import loading from '@/components/Loading';
import snackbar from '@/components/SnackBar';
import { updateReviewReq } from '@/service';

export default {
  data: () => ({
    ispass: false,
    status: '否',
    reviewinfo: {},
    posttitle: '',
    postauther: '',
    postcontent: '',
    reviewcontent: '',
  }),
  components: {
    loading,
    snackbar,
  },
  methods: {
    confirm() {
      this.$refs.loading.open();
      updateReviewReq(this.reviewinfo).then(() => {
        this.$emit('closeDialog', 'detaildialog');
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
      this.$emit('closeDialog', 'detailialog');
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