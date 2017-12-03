<template>
  <div class="homeviewvontroller">
    <md-boards :md-auto="true" :md-infinite="true" :md-duration="5000" :md-swipeable="true">
      <md-board id="slide1" class="onboard">
        <p class="board_des">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
      </md-board>

      <md-board id="slide2" class="onboard">
        <p class="board_des">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
      </md-board>

      <md-board id="slide3" class="onboard">
        <p class="board_des">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
      </md-board>
    </md-boards>
    <div class="card">
      <md-card md-with-hover class="md-card">
        <md-card-header>
          <div class="md-title">投稿</div>
          <div class="md-subhead">投稿旅游文章</div>
        </md-card-header>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
        </md-card-content>

        <md-card-actions>
          <md-button class="md-raised md-accent">马上去！</md-button>
        </md-card-actions>
      </md-card>

      <md-card md-with-hover class="md-card">
        <md-card-header>
          <div class="md-title">评审</div>
          <div class="md-subhead">评审旅游文章</div>
        </md-card-header>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
        </md-card-content>

        <md-card-actions>
          <md-button class="md-raised md-accent">马上去！</md-button>
        </md-card-actions>
      </md-card>

      <md-card md-with-hover class="md-card">
        <md-card-header>
          <div class="md-title">查阅</div>
          <div class="md-subhead">查阅旅游文章</div>
        </md-card-header>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
        </md-card-content>

        <md-card-actions>
          <md-button class="md-raised md-accent">马上去！</md-button>
        </md-card-actions>
      </md-card>
    </div>

    <div class="user">
      <router-link to="/login">
        <md-button class="md-raised md-primary user-btn" @click="openDialog('dialog', 'login')">
          登入
        </md-button>
      </router-link>
      <md-button class="md-raised md-primary user-btn" @click="openDialog('dialog', 'register')">
        注册
      </md-button>
    </div>

    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog">
      <md-dialog-content class='dialogcontent'>
        <login v-on:closeDialog="loginEventEmitted" v-if="this.type==='login'"></login>
        <register v-on:closeDialog="registerEventEmitted" v-if="this.type==='register'"></register>
      </md-dialog-content>
    </md-dialog>
  </div>

</template>

<script>

import login from '@/page/Login';
import register from '@/page/Register';

export default {
  name: 'hello',
  data() {
    return {
      type: '',
    };
  },
  components: {
    login,
    register,
  },
  methods: {
    openDialog(ref, type) {
      this.type = type;
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    loginEventEmitted(status) {
      if (status === 'accepted') {
        this.closeDialog('dialog');
      }
    },
    registerEventEmitted(status) {
      if (status === 'accepted') {
        this.closeDialog('dialog');
      }
    },
    // onOpen() {
    //   console.log('Opened');
    // },
    // onClose(type) {
    //   console.log('Closed', type);
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.homeviewvontroller {
  padding-top: 0;
}

.onboard {
  height: 300px;
  margin:0;
}

.board_des {
  position: absolute;
  bottom: 10px;
  color: white;
  text-align: center;
}

.card {
  margin: 0 auto;
  width: 100%;
}

.user {
  height: 200px;
  margin-top: 50px;
}

.user-btn {
  font-size: 15pt;
  line-height: 200%;
  margin: 5%;
  width: 10%;
}

.dialogcontent {
  width: 35vw;
}

.md-card {
  margin-top: 0px;
}

#slide1 {
  background-image: url("../assets/home/home_1.png");
}

#slide2 {
  background-image: url("../assets/home/home_2.png");
}

#slide3 {
  background-image: url("../assets/home/home_1.png");
}

a {
  color: #35495E;
}
</style>
