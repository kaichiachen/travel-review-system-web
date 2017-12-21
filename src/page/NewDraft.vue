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
  <loading ref="loading"></loading>
</div>
</template>

<script>
import { addDraftPostReq } from '@/service/index';
import loading from '@/components/Loading';

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
  components: {
    loading,
  },
  methods: {
    confirm() {
    },
    cancel() {
    },
    submitDraft() {
      this.$refs.loading.open();
      addDraftPostReq(this.draft).then(() => {
        // addDraft
        this.$refs.loading.close();
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.$refs.loading.close();
      });
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug('new draft ready to emit to father window');
      this.$emit('closeDialog', 'accepted');
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