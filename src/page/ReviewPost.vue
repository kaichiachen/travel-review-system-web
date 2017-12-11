<template>
<div class="reviewdetailcontainer">
  <md-card md-with-hover>
    <md-card-header>
        <div class="md-title">{{reviewinfo.title}}</div>
        <div class="md-subhead">作者：{{reviewinfo.author}}</div>
    </md-card-header>

    <md-card-content>
        {{ reviewinfo.content}}
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
      <md-input-container>
          <md-textarea maxlength="1000" v-model="this.reviewinfo.reviewcontent"></md-textarea>
      </md-input-container>
    </md-card-content>
    <md-card-actions>
      <md-button @click="cancel()">取消</md-button>
      <md-button @click="confirm()">确定</md-button>
  </md-card-actions>
  </md-card>
  
</div>
</template>

<script>
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
  methods: {
    confirm() {
      this.$emit('closeDialog', 'accepted');
    },
    cancel() {
      this.$emit('closeDialog', 'cancel');
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