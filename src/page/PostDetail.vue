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
    <md-button class="md-primary" v-if="!zanAlready" @click="pressZan()">点赞</md-button>
</div>
</template>

<script>

import { updateZanReq } from '@/service/index';
import Post from '@/page/Post';

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
    add: true,
    zanAlready: false,
  }),
  components: {
    Post,
  },
  methods: {
    confirm() {
    },
    cancel() {
    },
    pressZan() {
      // if (!this.zanAlready) {
      //   if (this.add) {
      //     this.zanInfo.zan = 1;
      //     addZanReq(this.zanInfo);
      //     /* eslint no-console: ["error", { allow: ["debug"] }] */
      //     console.debug('add');
      //   } else {
      //     this.zanInfo.zan += 1;
      //     // this.zanInfo.read += 1;
      //     updateZanReq(this.zanInfo);
      //     /* eslint no-console: ["error", { allow: ["debug"] }] */
      //     console.debug('update');
      //   }
      // }
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