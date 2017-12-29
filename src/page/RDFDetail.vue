<template>
<div class="reviewdetailcontainer">
  <md-card md-with-hover>
    <md-card-header>
        <div class="time">生成时间：{{storetime}}</div>
    </md-card-header>
    <md-button class="md-primary" @click="downloadRDF()">生成下载链接</md-button>
    <a :href = "url">下载：{{url}}</a>

    <md-card-content>
        {{ content }}
    </md-card-content>
  </md-card>  
</div>
</template>

<script>

import { postContentReq } from '@/service';

export default {
  data: () => ({
    storetime: '',
    content: '',
    url: '',
  }),
  components: {
  },
  mounted() {
    this.downloadRDF();
  },
  methods: {
    downloadRDF() {
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      // console.debug('down');
      // const fso = new ActiveXObject('Scripting.FileSystemObject');
      // const f = fso.createtextfile('rdf123.txt', 2, true);
      // f.writeLine(this.content);
      // f.close();
      // const f1 = new filewriter
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      // blobBuilder.append('包括这一句');
      // const url = window.URL.createObjectURL(blobBuilder.getBlob());
      // window.open(url);
      postContentReq(this.content).then((success) => {
        if (success.url !== undefined) {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(success);
          // this.$router.push(success.url);
          this.url = success.url;
        }
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
      });
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