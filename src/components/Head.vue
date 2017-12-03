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
            <div class="md-title">{{ userName }}</div>
            <div class="md-subhead">{{ userCompanyName }}</div>
          </md-card-header-text>

          <md-card-media>
            <img src="https://www.drupal.org/files/issues/default-avatar.png" alt="People">
          </md-card-media>
        </md-card-header>

        <md-card-actions>
          <md-button v-on:click.native="logout">Logout</md-button>
        </md-card-actions>
      </md-card>
    <md-toolbar class="md-large" v-if="!this.login">
      <div class="md-toolbar-container">
        <h3 class="md-title">Welcome!</h3>
      </div>
    </md-toolbar>
    <div class="phone-viewport">
      <md-list>
        <md-list-item>
          <router-link to="/home" v-on:click.native="toggleLeftSidenav">
            <md-icon>home</md-icon> <span>Home</span>
          </router-link>
        </md-list-item>

        <md-list-item v-if="this.login">
          <router-link to="/posts" v-on:click.native="toggleLeftSidenav">
            <md-icon>people</md-icon> <span>Post</span>
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
      title: 'Travel Review System',
      userName: '',
      userCompanyName: '',
      userRoleID: 0,
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
};
</script>
