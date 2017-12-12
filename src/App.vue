<template>
  <div id="app">
    <navbar></navbar>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import store from '@/store';
import navbar from '@/components/Head';

export default {
  name: 'app',
  components: {
    navbar,
  },
  mounted() {
    const info = store.getters.userInfo;
    if (info !== null && info !== 'null') {
      const userinfo = store.getters.userInfo;
      if (userinfo != null && typeof (userinfo) === typeof ('String')) {
        this.RECORD_USERINFO(JSON.parse(userinfo));
      } else if (this.userInfo != null && typeof (this.userInfo) === typeof ({})) {
        this.RECORD_USERINFO(this.userInfo);
      }
    }
  },
  methods: {
    ...mapMutations([
      'RECORD_USERINFO',
    ]),
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 0px;
}
</style>
