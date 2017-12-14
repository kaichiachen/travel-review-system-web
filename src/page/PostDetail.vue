<template>
<div class="reviewdetailcontainer">
  <md-card md-with-hover>
    <md-card-header>
        <div class="md-title">{{title}}</div>
        <div class="md-subhead">作者：{{author}}</div>
        <div class="time">发表时间：{{submittime}}</div>
    </md-card-header>

    <md-card-content>
        {{ content}}
    </md-card-content>
  </md-card>  
</div>
</template>

<script>
export default {
  data: () => ({
    title: ' ',
    location: ' ',
    author: ' ',
    submittime: ' ',
    content: ' ',
    show: ' ',
  }),
  methods: {
    confirm() {
    },
    cancel() {
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