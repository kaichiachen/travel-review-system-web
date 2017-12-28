<template>
<div class="reviewdetailcontainer">
  <md-card md-with-hover>
    <md-card-header>
        <div class="md-title">{{title}}</div>
        <div class="md-subhead">作者：{{author}}</div>
        <div class="time">发表时间：{{submittime}}</div>
        <div class="md-subhead">赞：{{zanInfo.zan}}</div>
        <div class="time">阅读量：{{zanInfo.read}}</div>
    </md-card-header>

    <md-card-content>
        {{ content}}
    </md-card-content>
  </md-card>  
    <div style="padding-top: 10px;">
      <md-button v-if="!zanAlready" @click="pressZan()"><md-icon v-if="!zanAlready" >thumb_up</md-icon>点赞</md-button>
      <md-button v-if="zanAlready" @click="pressZanCancel()" class="md-primary"><md-icon class="md-primary" v-if="zanAlready">thumb_up</md-icon>已点赞</md-button>    
    </div>
</div>
</template>

<script>

import { updateZanReq, addzanOwnerReq, deletezanOwnerReq } from '@/service/index';

export default {
  data: () => ({
    title: ' ',
    location: ' ',
    author: ' ',
    submittime: ' ',
    content: ' ',
    show: ' ',
    zanInfo: {
      zanid: -1,
      postid: -1,
      zan: -1,
      read: -1,
    },
    zanOwnerInfo: {
      postid: '',
      username: '',
      id: -1,
      aord: 'add',
    },
    add: true,
    zanAlready: false,
  }),
  components: {
  },
  methods: {
    confirm() {
    },
    cancel() {
    },
    pressZanCancel() {
      if (this.zanAlready) {
        this.zanInfo.zan -= 1;
        // this.$refs.Post.zans[this.$refs.Post.nowProccess].zan += 1;
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug('update in postDetail');
        updateZanReq(this.zanInfo).then((success) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(success);
        }, (error) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(error);
        });
        this.zanOwnerInfo.postid = this.zanInfo.postid;
        this.zanOwnerInfo.aord = 'del';
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug('del in post');
        this.$emit('addZan', this.zanOwnerInfo);
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(this.zanOwnerInfo.id);
        deletezanOwnerReq(this.zanOwnerInfo.id).then((success) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(success);
          // this.deleteZanOwnerInfoInPost(this.zanOwnerInfo);
        }, (error) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(error);
        });
      }
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug('finish pressZanCancel');
      this.zanAlready = false;
    },
    pressZan() {
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug('start pressZan');
      if (!this.zanAlready) {
        this.zanInfo.zan += 1;
        // this.$refs.Post.zans[this.$refs.Post.nowProccess].zan += 1;
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug('update in postDetail');
        updateZanReq(this.zanInfo).then((success) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(success);
        }, (error) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(error);
        });
        this.zanOwnerInfo.postid = this.zanInfo.postid;
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug('add in post');
        this.zanOwnerInfo.aord = 'add';
        this.$emit('addZan', this.zanOwnerInfo);
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(this.zanOwnerInfo);
        addzanOwnerReq(this.zanOwnerInfo).then((success) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(success);
          this.zanOwnerInfo.id = success.id;
          this.addZanOwnerInfoInPost(this.zanOwnerInfo);
        }, (error) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(error);
        });
      }
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug('finish pressZan');
      this.zanAlready = true;
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