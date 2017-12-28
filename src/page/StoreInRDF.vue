<template>
  <div class="postViewContainer">
    <md-table>
        <md-table-cell>
          <md-button class="md-icon-button" @click="initPost()" ><label>刷新post</label></md-button>
        </md-table-cell>
        <md-table-cell>
          <md-button class="md-icon-button" @click="makeRDF()" ><label>生成当前rdf</label></md-button>
        </md-table-cell>
    </md-table>

    <md-table-card>
        <md-toolbar>
            <h1 class="md-title">存档列表</h1>         
        </md-toolbar>

        <md-table>
            <md-table-header>
            <md-table-row>
                <md-table-head md-sort-by="title" md-tooltip="store time">存档时间</md-table-head>
                <md-table-head md-sort-by="location" md-tooltip="rdf">游记存档内容</md-table-head>
            </md-table-row>
            </md-table-header>

            <md-table-body>
            <md-table-row v-for="(row, rowIndex) in files" :key="rowIndex" :md-item="row">
                <md-table-cell>
                  {{row.storetime}}
                </md-table-cell>
                <md-table-cell>
                  {{cut(row.content)}}
                </md-table-cell>
                <md-button class="md-primary" @click="showContent(rowIndex)">查看rdf内容</md-button>
            </md-table-row>
            </md-table-body>
        </md-table>
        <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog">
          <md-dialog-content class='dialogcontent'>
            <RDFDetail ref="RDFDetail"></RDFDetail>
          </md-dialog-content>
       </md-dialog>
        </md-table-card>
    <loading ref="loading"></loading>
  </div>
</template>

<script>
import snackbar from '@/components/SnackBar';
import PostDetail from '@/page/PostDetail';
import RDFDetail from '@/page/RDFDetail';
import loading from '@/components/Loading';
import { postListReq } from '@/service';
import { timeConverter } from '@/config/utils';
import { mapState } from 'vuex';

export default {
  data: () => ({
    searchString: '',
    posts: [
    ],
    searchOption: -1,
    bst: null,
    rdf: {
      rdfstring: '',
      time: '',
    },
    files: [],
  }),
  mounted() {
    this.initPost();
  },
  components: {
    snackbar,
    PostDetail,
    loading,
    RDFDetail,
  },
  computed: {
    ...mapState([
      'userInfo',
      'login',
    ]),
  },
  methods: {
    processPost(post) {
      let ret = '<Description postid=';
      ret = ret.concat(post.id);
      ret = ret.concat('> &nbsp');
      ret = ret.concat('<title>');
      ret = ret.concat(post.title);
      ret = ret.concat('</title> &nbsp');
      ret = ret.concat('<location>');
      ret = ret.concat(post.location);
      ret = ret.concat('</location> &nbsp');
      ret = ret.concat('<author>');
      ret = ret.concat(post.author);
      ret = ret.concat('</author> &nbsp');
      ret = ret.concat('<submittime>');
      ret = ret.concat(post.submittime);
      ret = ret.concat('</submittime> &nbsp');
      ret = ret.concat('<content>');
      ret = ret.concat(post.content);
      ret = ret.concat('</content> &nbsp');
      ret = ret.concat('</Description> &nbsp');
      return ret;
    },
    /* eslint no-unused-vars: ["error", { "args": "after-used" }] */
    /* eslint no-unused-vars: ["error", { "args": "none" }] */
    makeRDF() {
      const now = new Date();
      const time = timeConverter(now);
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.posts);
      let tempString = '';
      for (let i = 0; i < this.posts.length; i += 1) {
        tempString = tempString.concat(this.processPost(this.posts[i]));
      }
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(tempString);
      this.files.push({
        storetime: time,
        content: tempString,
      });
    },
    showContent(rowIndex) {
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.files);
      this.$refs.RDFDetail.storetime = this.files[rowIndex].storetime;
      this.$refs.RDFDetail.content = this.files[rowIndex].content;
      this.$refs.dialog.open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    cut(content) {
      return content.slice(0, 20);
    },
    initPost() {
      postListReq().then((success) => {
        if (success.Post !== undefined) {
          this.posts = [];
          const res = success.Post;
          for (let i = 0; i < res.length; i += 1) {
            this.posts.push({
              id: res[i].id,
              title: res[i].title,
              location: res[i].location,
              author: res[i].author,
              submittime: res[i].submittime,
              time: timeConverter(res[i].submittime),
              content: res[i].content,
            });
          }
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
.postViewContainer{
  width: 95%;
}

.postViewContainer {
  padding-top: 1%;
  width: 80%;
  margin: 0 auto;
}

#spin {
  margin: 0 auto;
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

p {
  font-size: 120%;
}
</style>
