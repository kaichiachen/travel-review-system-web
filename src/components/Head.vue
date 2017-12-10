<template>
<div class="phone-viewport">
  <md-toolbar>
    <md-button class="md-icon-button" @click="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>

    <h2 class="md-title">{{ title }}</h2>
  </md-toolbar>

  <md-sidenav class="md-left" ref="leftSidenav">
      <md-card v-if="this.login">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{ this.userinfo.name }}</div>
            <div class="md-subhead">{{ this.userinfo.username }}</div>
          </md-card-header-text>

          <md-card-media>
            <img src="https://www.drupal.org/files/issues/default-avatar.png" alt="People">
          </md-card-media>
        </md-card-header>

        <md-card-actions>
          <md-button v-on:click.native="logout">登出</md-button>
        </md-card-actions>
      </md-card>
    <md-toolbar class="md-large" v-if="!this.login">
      <div class="md-toolbar-container">
        <h3 class="md-title">欢迎光临!</h3>
      </div>
    </md-toolbar>
    <div class="phone-viewport">
      <md-list>
        <md-list-item>
          <router-link to="/home" v-on:click.native="toggleLeftSidenav">
            <md-icon>home</md-icon> <span>首页</span>
          </router-link>
        </md-list-item>

        <md-list-item v-if="this.login && this.userinfo.role===0">
          <router-link to="/users" v-on:click.native="toggleLeftSidenav">
            <md-icon>people</md-icon> <span>会员名单</span>
          </router-link>
        </md-list-item>

        <md-list-item v-if="this.login">
          <router-link to="/posts" v-on:click.native="toggleLeftSidenav">
            <md-icon>people</md-icon> <span>查阅文章</span>
          </router-link>
        </md-list-item>

        <md-list-item v-if="this.login && this.userinfo.role===2">
          <router-link to="/myreview" v-on:click.native="toggleLeftSidenav">
            <md-icon>people</md-icon> <span>我的评论</span>
          </router-link>
        </md-list-item>
      </md-list>
    </div>
  </md-sidenav>
</div>
</template>

<script>

import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      title: '旅游游记评论系统',
      userRoleID: 0,
      userinfo: {
        name: '',
        username: '',
        role: -1,
      },
    };
  },
  computed: {
    ...mapState([
      'userInfo',
      'login',
    ]),
  },
  methods: {
    ...mapMutations([
      'RECORD_USERINFO',
      'OUT_LOGIN',
    ]),
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    logout() {
      this.OUT_LOGIN();
      this.$router.push({ path: '/home' });
      this.$refs.leftSidenav.toggle();
    },
  },
  watch: {
    userInfo: function userInfo() {
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.userInfo);
      if (this.userInfo != null && typeof (this.userInfo) === typeof ('String')) {
        this.userinfo = JSON.parse(this.userInfo);
      } else if (this.userInfo != null && typeof (this.userInfo) === typeof ({})) {
        this.userinfo = this.userInfo;
      }
    },
  },
};
</script>
