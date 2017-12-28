<template>
<div class="reviewdetailcontainer">
  <md-card md-with-hover>
    <md-card-header>
        <div class="time">生成时间：{{storetime}}</div>
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
    storetime: '',
    content: '',
  }),
  components: {
  },
  methods: {
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