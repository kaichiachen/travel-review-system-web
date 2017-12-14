<template>
  <div class="postViewContainer">
    <md-table>
      <md-table-row>
        <md-table-cell>
          <form novalidate @submit.stop.prevent="submit">
            <md-input-container>
            <label>search me! </label>
            <md-input v-model="searchString"></md-input>
            </md-input-container>
            </form>
            <md-button class="md-icon-button" @click="refreshPosts()" >
            <md-icon>search</md-icon></md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-table-card>
        <md-toolbar>
            <h1 class="md-title">游记列表</h1>         
        </md-toolbar>

        <md-table>
            <md-table-header>
            <md-table-row>
                <md-table-head md-sort-by="title" md-tooltip="the title of posts">游记题目</md-table-head>
                <md-table-head md-sort-by="location" md-tooltip="post's location">location</md-table-head>
                <md-table-head md-sort-by="author"  md-tooltip="author?">作者</md-table-head>
                <md-table-head md-sort-by="content"  md-tooltip="content?">正文</md-table-head>
                <md-table-head md-sort-by="submittime"  md-tooltip="submittime?">发表时间</md-table-head>
                <md-table-head md-sort-by="detail"  md-tooltip="detail?">细节</md-table-head>
                
                <!-- <md-table-head md-numeric >
                <md-icon>message</md-icon>
                <span>最新评论</span>
                </md-table-head>-->
            </md-table-row>
            </md-table-header>

            <md-table-body>
            <md-table-row v-for="(row, rowIndex) in posts" :key="rowIndex" :md-item="row">
                <!--<md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" v-if="columnIndex !== 'type'">
                {{ column }}
                </md-table-cell>-->
                <md-table-cell>
                  {{row.title}}
                </md-table-cell>
                <md-table-cell>
                  {{row.location}}
                </md-table-cell>
                <md-table-cell>
                  {{row.author}}
                </md-table-cell>
                <md-table-cell>
                  {{cut(row.content)}}
                </md-table-cell>
                <md-table-cell>
                  {{row.submittime}}
                </md-table-cell>           
                <md-button class="md-primary" @click="showContent(rowIndex)">showDetail</md-button>
            </md-table-row>
            </md-table-body>
        </md-table>
        <md-button class="md-icon-button" @click="initPost()" ><label>复原</label></md-button>
        <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog">
          <md-dialog-content class='dialogcontent'>
            <PostDetail ref="PostDetail"></PostDetail>
          </md-dialog-content>
       </md-dialog>
        </md-table-card>
        
  </div>
</template>

<script>
import snackbar from '@/components/SnackBar';
import PostDetail from '@/page/PostDetail';
import { postListReq } from '@/service';

export default {
  data: () => ({
    searchString: 'enter to search',
    posts: [
      {
        title: '上海一日游',
        location: '上海',
        author: 'bugzyz',
        submittime: '20170101',
        content: `本篇游记仅适用于第二次及以上来上海的蜂蜂
因为没有任何一个地方是旅行打卡地以及热门店铺（比如line等）
其实这次来上海是待了五天的 只是因为40度的高温实在让人无法忍受 所以实际出门只有三天
这三天中到处逛吃逛吃 走走停停 所以不打算按时间顺序来写这篇游记 
那么我就来安利一下我的上海文艺行吧～
（文末有惊喜 文艺小资必看哦）相信很多蜂蜂都和我一样 不喜欢人挤人的热门旅行地 喜欢别致、清净的地方
在来上海之前 种草了2个展览 还有一大波咖啡/下午茶店 准备一一打卡 只可惜天气太热了 所以没能去完所有种草的店铺 （我还会再来打卡的）

首先来介绍一下我看的两个展览吧～
1⃣️透明的声音
门票：50RMB
地址：上海民生美术馆
时间：7月31日结束 据说9月开始要续展（周一闭馆）
一个非常 非常 奇妙的地方 有很多亮点和很多拍照的小细节 
去看展还赠送一个好看的小杯垫
不多说了直接上图～`,
      },
    ],
  }),
  mounted() {
    this.initPost();
  },
  components: {
    snackbar,
    PostDetail,
  },

  methods: {
    showContent(rowIndex) {
      this.$refs.PostDetail.title = this.posts[rowIndex].title;
      this.$refs.PostDetail.location = this.posts[rowIndex].location;
      this.$refs.PostDetail.author = this.posts[rowIndex].author;
      this.$refs.PostDetail.submittime = this.posts[rowIndex].submittime;
      this.$refs.PostDetail.content = this.posts[rowIndex].content;
      this.$refs.dialog.open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    cut(content) {
      return content.slice(0, 20);
    },
    initPost() {
      postListReq().then((success) => {
        if (success.Post !== undefined) {
          this.posts = [];
          const res = success.Post;
          for (let i = 0; i < res.length; i += 1) {
            this.posts.push({
              title: res[i].title,
              location: res[i].location,
              author: res[i].author,
              submittime: res[i].submittime,
              content: res[i].content,
            });
          }
        }
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
      });
    },
    refreshPosts() {
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.searchString);
      postListReq().then((success) => {
        if (this.searchString === '') return;
        this.posts = [];
        if (success.Post !== undefined) {
          this.posts = [];
          const res = success.Post;
          for (let i = 0; i < res.length; i += 1) {
            if (this.searchString === res[i].title || this.searchString === res[i].location) {
              this.posts.push({
                title: res[i].title,
                location: res[i].location,
                author: res[i].author,
                submittime: res[i].submittime,
                content: res[i].content,
              });
            }
          }
        }
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
      });
    },
  },
};
</script>

<style>
.postsSpan {
  margin-top: 3%;
  padding-top: 3%;
  padding-bottom: 3%;
  margin-left: 5%;
  width: 90%;
  border: 1px groove;
  border-color: #cccccc;
}

.postViewContainer {
  padding-top: 1%;
  width: 80%;
  margin: 0 auto;
}

#spin {
  margin: 0 auto;
}

p {
  font-size: 120%;
}
</style>
