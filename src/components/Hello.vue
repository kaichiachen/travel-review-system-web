<template>
  <div class="homeviewvontroller">
    <md-boards :md-auto="true" :md-infinite="true" :md-duration="5000" :md-swipeable="true">
      <md-board id="slide1" class="onboard">
        <p class="board_des">伦敦三日游</p>
      </md-board>

      <md-board id="slide2" class="onboard">
        <p class="board_des">老上海巡礼</p>
      </md-board>

      <md-board id="slide3" class="onboard">
        <p class="board_des">七天环岛行</p>
      </md-board>
    </md-boards>
    <div class="card">
      <md-card md-with-hover class="md-card">
        <md-card-header>
          <div class="md-title">投稿</div>
        </md-card-header>

        <md-card-content>
          投稿旅游文章
        </md-card-content>

        <md-card-actions>
          <md-button class="md-raised md-accent" @click="linkToPost">马上去！</md-button>
        </md-card-actions>
      </md-card>

      <md-card md-with-hover class="md-card">
        <md-card-header>
          <div class="md-title">评审</div>
        </md-card-header>

        <md-card-content>
          评审旅游文章
        </md-card-content>

        <md-card-actions>
          <md-button class="md-raised md-accent" @click="linkToReview">马上去！</md-button>
        </md-card-actions>
      </md-card>

      <md-card md-with-hover class="md-card">
        <md-card-header>
          <div class="md-title">查阅</div>
        </md-card-header>

        <md-card-content>
          查阅旅游文章
        </md-card-content>

        <md-card-actions>
          <md-button class="md-raised md-accent" @click="linkToPostList">马上去！</md-button>
        </md-card-actions>
      </md-card>
    </div>

    <div class="user">
      <router-link to="/login">
        <md-button class="md-raised md-primary user-btn" @click="openDialog('dialog', 'login')" v-if="!this.login">
          登入
        </md-button>
      </router-link>
      <md-button class="md-raised md-primary user-btn" @click="openDialog('dialog', 'register')" v-if="!this.login">
        注册
      </md-button>
    </div>

    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog">
      <md-dialog-content class='dialogcontent'>
        <loginview v-on:closeDialog="loginEventEmitted" v-if="this.type==='login'"></loginview>
        <registerview v-on:closeDialog="registerEventEmitted" v-if="this.type==='register'"></registerview>
      </md-dialog-content>
    </md-dialog>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import loginview from '@/page/Login';
import registerview from '@/page/Register';

export default {
  name: 'hello',
  data() {
    return {
      type: '',
    };
  },
  components: {
    loginview,
    registerview,
  },
  computed: {
    ...mapState([
      'userInfo',
      'login',
    ]),
  },
  mounted() {
    // TODO: fix bugs cannot openDialog on mounted
    // if (this.$router.history.current.path === '/login') {
    //   this.openDialog('dialog', 'login');
    // } else if (this.$router.history.current.path === '/register') {
    //   this.openDialog('dialog', 'register');
    // }
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
    linkToPostList() {
      if (this.login) {
        this.$router.push('/posts');
      } else {
        this.openDialog('dialog', 'login');
      }
    },
    linkToReview() {
      if (this.login) {
        this.$router.push('/review/new');
      } else {
        this.openDialog('dialog', 'login');
      }
    },
    linkToPost() {
      if (this.login) {
        this.$router.push('/post/new');
      } else {
        this.openDialog('dialog', 'login');
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.homeviewvontroller {
  padding-top: 0;
}

.onboard {
  height: 600px;
  margin:0;
  text-align: center;
}

.board_des {
  margin: 0 auto;
  display: block;
  color: white;
  padding-top:550px;
  font-size: 15pt;
  line-height: 20pt;
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
  background-image: url("../assets/home/home_1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#slide2 {
  background-image: url("../assets/home/home_2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#slide3 {
  background-image: url("../assets/home/home_3.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

a {
  color: #35495E;
}
</style>
