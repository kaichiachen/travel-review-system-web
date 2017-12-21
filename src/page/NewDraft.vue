<template>
<div class="reviewdetailcontainer">
  <md-card md-with-hover>
    <md-card-header>
        <label class="head1">新增文章</label>
    </md-card-header>
    <md-card-header>
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container>
            <label>标题</label>
            <md-input v-model="draft.title"></md-input>
          </md-input-container>

          <md-input-container class="block">
              <label>内文</label>
              <md-input v-model="draft.content"></md-input>
          </md-input-container>

          <md-input-container>
            <md-select
              placeholder="选取地点"
              v-model="draft.location"
              style="margin-bottom: 10px;">
              <md-option value="北京">北京</md-option>
              <md-option value="上海">上海</md-option>
              <md-option value="台北">台北</md-option>
              <md-option value="纽约">纽约</md-option>
              <md-option value="伦敦">伦敦</md-option>
            </md-select>
          </md-input-container>

          <md-input-container>
            <label>作者</label>
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

.head1 {
  font-size: 200%;
  font-weight: 900;
}
</style>