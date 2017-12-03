<template>
    <div class="registerContainer">
        <img src="../assets/login/login.png" class="top"></img>
        <p class="topmsg">注册</p>
        <form novalidate @submit.stop.prevent="submit">
        <md-input-container>
            <label>账号: </label>
            <md-input v-model="email"></md-input>
        </md-input-container>
        <md-input-container>
            <label>密码: </label>
            <md-input type="password" v-model="pwd"></md-input>
        </md-input-container>
        </form>
        <md-button class="md-raised md-primary registerbtn" @click="register">注册</md-button>
        <snackbar ref="snackbar"></snackbar>
    </div>
</template>

<script>
import snackbar from '@/components/SnackBar';

export default {
  data() {
    return {
      email: null,
      pwd: null,
      token: null,
      name: null,
      phone: null,
      companyid: null,
      companyName: null,
      roleid: null,
      userInfo: null,
    };
  },
  components: {
    snackbar,
  },
  methods: {
    register() {
      this.$emit('closeDialog', 'accepted');
    },
  },
};
</script>

<style>
.registerContainer {
    width: 100%;
}

.registerbtn {
    font-size: 13pt;
    display: block;
    margin: 0 auto;
}

.top {
    width: 30%;
    display: block;
    margin: 0 auto;
    padding-bottom: 10%;
    padding-top: 5%;
}

.topmsg {
    font-size: 18pt;
    font-weight: 500;
    text-align:center;
    padding-bottom: 5%;
}
</style>
