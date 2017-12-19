<template>
<div class="reviewdetailcontainer">
  <md-card md-with-hover>
    <md-card-header>
        <label class="head1">修改旧草稿</label>
    </md-card-header>
    <md-card-header>
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container>
            <label>title</label>
            <md-input v-model="draft.title"></md-input>
          </md-input-container>

          <md-input-container>
            <label>location</label>
            <md-input v-model="draft.location"></md-input>
          </md-input-container>

          <md-input-container class="block">
              <label>content</label>
              <md-input v-model="draft.content"></md-input>
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
        <md-button @click="submitDraft()" class="md-raised md-primary">保存草稿</md-button>
    </md-card-header>
  </md-card>  
</div>
</template>

<script>
import { addDraftPostReq } from '@/service/index';

export default {
  data: () => ({
    draft: {
      title: ' ',
      location: ' ',
      content: ' ',
      author: ' ',
      username: ' ',
    },
  }),
  methods: {
    confirm() {
    },
    cancel() {
    },
    submitDraft() {
      addDraftPostReq(this.draft);
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