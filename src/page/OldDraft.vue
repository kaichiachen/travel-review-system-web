<template>
  <div class="myreviewcard">
    <md-card md-with-hover>
      <md-card-header>
        <label class="head1">修改旧草稿</label>
      </md-card-header>

      <md-card-content>
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container>
            <label>title</label>
            <md-input v-model="draft.title"></md-input>
          </md-input-container>
          <md-input-container>
            <label>location</label>
            <md-input v-model="draft.location"></md-input>
          </md-input-container>
          <md-input-container>
              <label>content</label>
              <md-textarea maxlength="1000" v-model="draft.content"></md-textarea>
          </md-input-container>
          <md-input-container>
            <label>username</label>
            <md-input readonly v-model="draft.username"></md-input>
          </md-input-container>
          <md-input-container>
            <label>author</label>
            <md-input readonly v-model="draft.author"></md-input>
          </md-input-container>
        </form>
        <md-button @click="submitDraft()" class="md-raised md-primary">更新草稿</md-button>
        <!-- <md-button @click="close()">关闭</md-button> -->
      </md-card-content>
    </md-card>  
  </div>
</template>

<script>
import { updateDraftPostReq } from '@/service/index';

export default {
  data: () => ({
    draft: {
      id: '',
      title: '',
      location: '',
      content: '',
      author: '',
      username: '',
    },
  }),
  methods: {
    confirm() {
    },
    cancel() {
    },
    submitDraft() {
      this.printDetail();
      updateDraftPostReq(this.draft);
    },
    printDetail() {
      // print drafts
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.draft.id);
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
    },
  },
};
</script>

<style>
.mypasscard {
  margin-top: 50px;
}
.myreviewcard {
  /* margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 10px;
  margin-right: 10px; */
  height:90%;
  width:100%;
}

.head1 {
  font-size: 200%;
  font-weight: 900;
}
</style>