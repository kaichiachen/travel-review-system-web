<template> 

  <div class="postViewContainer">
    <md-table-card>
        <md-toolbar>
            <h1 class="md-title">草稿列表</h1>         
        </md-toolbar>

        <md-table>
            <md-table-header>
            <md-table-row>
                <md-table-head md-sort-by="title" md-tooltip="the title of posts">游记题目</md-table-head>
                <md-table-head md-sort-by="location" md-tooltip="post's location">地点</md-table-head>
                <md-table-head md-sort-by="author"  md-tooltip="author?">作者</md-table-head>
                <md-table-head md-sort-by="content"  md-tooltip="content?">正文</md-table-head>
                <md-table-head md-sort-by="detail"  md-tooltip="detail?">操作</md-table-head>
            </md-table-row>
            </md-table-header>

            <md-table-body>
            <md-table-row v-for="(row, rowIndex) in drafts" :key="rowIndex" :md-item="row">
                <md-table-cell>
                  {{row.title}}
                </md-table-cell>
                <md-table-cell>
                  {{row.location}}
                </md-table-cell>
                <md-table-cell>
                  {{row.author}}
                </md-table-cell>
                <md-table-cell>
                  {{cut(row.content)}}
                </md-table-cell>
                <md-button @click="deleteDraft(rowIndex)" class="md-raised md-primary">删除草稿</md-button>                
                <md-button @click="loadDraft(rowIndex)" class="md-raised md-primary">修改草稿</md-button>
                <md-button @click="draft2reviewpost(rowIndex)" class="md-raised md-primary">提交草稿</md-button>                
            </md-table-row>
            </md-table-body>
        </md-table>
    </md-table-card>
          <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialogNew">
            <md-dialog-content class='dialogcontent'>
              <NewDraft v-on:closeDialog="newdraftEventEmitted" ref="NewDraft"></NewDraft>
            </md-dialog-content>
          </md-dialog>
          <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialogOld">
            <md-dialog-content class='dialogcontent'>
              <OldDraft v-on:closeDialog="olddraftEventEmitted" ref="OldDraft"></OldDraft>
            </md-dialog-content>
          </md-dialog>
          <md-button @click="refresh()" class="md-raised md-primary">刷新</md-button>
          <md-button @click="newDraft()" class="md-raised md-primary">新的草稿</md-button>
          <loading ref="loading"></loading>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import { addDraftPostReq, draftListReq } from '@/service/index';
// formal
import OldDraft from '@/page/OldDraft';
import NewDraft from '@/page/NewDraft';
import { draftListReq, updateDraftPostReq, addReviewPostReq, deleteDraftPostReq } from '@/service/index';
import loading from '@/components/Loading';

export default {
  data: () => ({
    user: {
      username: '',
      author: '',
    },
    isnew: true,
    reviewpost: {
      title: '',
      content: '',
      time: '',
      location: '',
      author: '',
    },
    draft: {
      id: '',
      title: '',
      content: '',
      location: '',
      author: '',
      username: '',
      tags: [],
    },
    drafts: [],
    draftExist: false,
  }),
  components: {
    OldDraft,
    NewDraft,
    loading,
  },
  computed: {
    ...mapState([
      'userInfo',
      'login',
    ]),
  },
  mounted() {
    // this.initUser();
    this.init();
  },
  methods: {
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    refresh() {
      this.$refs.loading.open();
      this.init();
    },
    olddraftEventEmitted(status) {
      if (status === 'accepted') {
        this.refresh();
        this.closeDialog('dialogOld');
      }
    },
    newdraftEventEmitted(status) {
      if (status === 'accepted') {
        this.refresh();
        this.closeDialog('dialogNew');
      }
    },
    showContent(rowIndex) {
      this.$refs.PostDetail.title = this.posts[rowIndex].title;
      this.$refs.PostDetail.location = this.posts[rowIndex].location;
      this.$refs.PostDetail.author = this.posts[rowIndex].author;
      this.$refs.PostDetail.submittime = this.posts[rowIndex].submittime;
      this.$refs.PostDetail.content = this.posts[rowIndex].content;
      this.$refs.dialog.open();
    },
    deleteDraft(rowIndex) {
      this.$refs.loading.open();
      deleteDraftPostReq(this.drafts[rowIndex].id).then(() => {
        this.$refs.loading.close();
        this.refresh();
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.$refs.loading.close();
      });
      this.searchForOwnerDraft();
    },
    draft2reviewpost(rowIndex) {
      this.$refs.loading.open();
      this.reviewpost.title = this.drafts[rowIndex].title;
      this.reviewpost.content = this.drafts[rowIndex].content;
      // this.reviewpost.time = Math.round(new Date() / 1000);
      this.reviewpost.time = Math.round(new Date());
      this.reviewpost.location = this.drafts[rowIndex].location;
      this.reviewpost.author = this.drafts[rowIndex].author;
      this.reviewpost.tags = this.drafts[rowIndex].tags;
      addReviewPostReq(this.reviewpost).then(() => {
        deleteDraftPostReq(this.drafts[rowIndex].id).then(() => {
          this.$refs.loading.close();
          this.searchForOwnerDraft();
        }, (error) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(error);
          this.$refs.loading.close();
        });
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.$refs.loading.close();
      });
    },
    init() {
      this.searchForOwnerDraft();
      this.loadFirstDraft();
    },
    initUser() {
      this.user.author = this.userInfo.name;
      this.user.username = this.userInfo.username;
      this.user.username = 'wzx';
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug('change it to wzx');
    },
    loadFirstDraft() {
      if (this.draftExist) {
        this.draft.title = this.drafts[0].title;
        this.draft.location = this.drafts[0].location;
        this.draft.content = this.drafts[0].content;
        this.draft.username = this.drafts[0].username;
        this.draft.author = this.drafts[0].author;
        this.draft.id = this.drafts[0].id;
      } else {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug('load first down');
      }
    },
    submitDraft() {
      // print drafts
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.draft.title);
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.draft.location);
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.draft.author);
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.draft.username);
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.draft.content);
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.draft.id);
      updateDraftPostReq(this.draft);
    },
    searchForOwnerDraft() {
      // this.$refs.loading.open();
      draftListReq().then((success) => {
        if (success.Draftpost !== undefined) {
          this.drafts = [];
          const res = success.Draftpost;
          for (let i = 0; i < res.length; i += 1) {
            if (res[i].username === this.userInfo.username) {
              /* eslint no-console: ["error", { allow: ["debug"] }] */
              console.debug('heres the draft id');
              /* eslint no-console: ["error", { allow: ["debug"] }] */
              console.debug(res[i].id);
              const node = {
                id: res[i].id,
                title: res[i].title,
                location: res[i].location,
                author: res[i].author,
                username: res[i].username,
                content: res[i].content,
              };
              if (res[i].tags !== undefined) {
                node.tags = res[i].tags.split(',');
              } else {
                node.tags = [];
              }
              this.drafts.push(node);
              this.draftExist = true;
            }
          }
        }
        this.$refs.loading.close();
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.$refs.loading.close();
      });
    },
    loadDraft(rowIndex) {
      this.$refs.OldDraft.draft.id = this.drafts[rowIndex].id;
      this.$refs.OldDraft.draft.title = this.drafts[rowIndex].title;
      this.$refs.OldDraft.draft.location = this.drafts[rowIndex].location;
      this.$refs.OldDraft.draft.content = this.drafts[rowIndex].content;
      this.$refs.OldDraft.draft.tags = this.drafts[rowIndex].tags;
      this.$refs.OldDraft.draft.author = this.userInfo.name;
      this.$refs.OldDraft.draft.username = this.userInfo.username;
      this.$refs.dialogOld.open();
    },
    newDraft() {
      this.$refs.NewDraft.draft.author = this.userInfo.name;
      this.$refs.NewDraft.draft.username = this.userInfo.username;
      this.$refs.NewDraft.draft.title = '';
      this.$refs.NewDraft.draft.content = '';
      this.$refs.NewDraft.draft.location = '';
      this.$refs.NewDraft.draft.tags = [];
      this.$refs.dialogNew.open();
    },
    submitPost() {
      // for the button submit to the post
    },
    cut(content) {
      return content.slice(0, 20);
    },
  },
};

</script>

<style>
.postsSpan {
  margin-top: 3%;
  padding-top: 3%;
  padding-bottom: 3%;
  margin-left: 5%;
  width: 90%;
  border: 1px groove;
  border-color: #cccccc;
}

.postViewContainer {
  padding-top: 1%;
  width: 80%;
  margin: 0 auto;
}

.dialogcontent {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  width: 60vw;
  height: 80vh;
}

#spin {
  margin: 0 auto;
}

block {
  margin: 50%;
}

p {
  font-size: 120%;
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