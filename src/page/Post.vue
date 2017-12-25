<template>
  <div class="postViewContainer">
    
    <md-table>
      <md-table-row>
        <md-table-cell>
          <md-input-container md-clearable>
            <label>全文检索</label>
            <md-input v-model="searchString"></md-input>
          </md-input-container>
          <md-select
            placeholder="选取时间范围"
            v-model="searchOption">
            <md-option value="0">一周前</md-option>
            <md-option value="1">一个月前</md-option>
            <md-option value="2">一年前</md-option>
          </md-select>

          <md-button class="md-icon-button" @click="refreshPosts()" >
          <md-icon>search</md-icon></md-button>
          <md-button class="md-icon-button" @click="reloadPost()" ><label>刷新</label></md-button>
          
        </md-table-cell>
      </md-table-row>
    </md-table>

    <div class="sort">
      <md-button class="md-primary sortButton" @click="hotSort(1)">综合排序</md-button>
      <md-button class="md-primary sortButton" @click="hotSort(2)">赞数排序</md-button>
      <md-button class="md-primary sortButton" @click="hotSort(3)">阅读量排序</md-button> 
    </div>

    <md-table-card>
        <md-toolbar>
            <h1 class="md-title">游记列表</h1>         
        </md-toolbar>

        <md-table>
              
            <md-table-header>
            <md-table-row>
                <md-table-head md-sort-by="title" md-tooltip="the title of posts">游记题目</md-table-head>
                <md-table-head md-sort-by="location" md-tooltip="post's location">地点</md-table-head>
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
                  {{row.time}}
                </md-table-cell>           
                <md-button class="md-primary" @click="showContent(rowIndex)">阅读全文</md-button>
            </md-table-row>
            </md-table-body>
        </md-table>
        <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog">
          <md-dialog-content class='dialogcontent'>
            <PostDetail ref="PostDetail"></PostDetail>
          </md-dialog-content>
       </md-dialog>
        </md-table-card>
    <loading ref="loading"></loading>
  </div>
</template>

<script>
import snackbar from '@/components/SnackBar';
import PostDetail from '@/page/PostDetail';
import loading from '@/components/Loading';
import { postListReq, zanListReq, updateZanReq, addZanReq, reviewPostListReq } from '@/service';
import { makeBST, timeConverter, findPost } from '@/config/utils';

export default {
  data: () => ({
    searchString: '',
    posts: [
    ],
    searchOption: -1,
    bst: null,
    zans: [
    ],
    nowProccess: -1,
    revpost: [
    ],
  }),
  mounted() {
    this.initPost();
  },
  components: {
    snackbar,
    PostDetail,
    loading,
  },
  methods: {
    showContent(rowIndex) {
      this.$refs.PostDetail.title = this.posts[rowIndex].title;
      this.$refs.PostDetail.location = this.posts[rowIndex].location;
      this.$refs.PostDetail.author = this.posts[rowIndex].author;
      this.$refs.PostDetail.submittime = this.posts[rowIndex].time;
      this.$refs.PostDetail.content = this.posts[rowIndex].content;
      // zan and read
      this.$refs.PostDetail.zanAlready = false;
      let add = true;
      for (let i = 0; i < this.zans.length; i += 1) {
        if (this.posts[rowIndex].id === this.zans[i].postid) {
          this.$refs.PostDetail.add = false;
          this.$refs.PostDetail.zanInfo.postid = this.posts[rowIndex].id;
          this.$refs.PostDetail.zanInfo.zanid = this.zans[i].zanid;
          this.$refs.PostDetail.zanInfo.zan = this.zans[i].zan;
          this.zans[i].read += 1;
          this.$refs.PostDetail.zanInfo.read = this.zans[i].read;
          add = false;
          this.nowProccess = i;
          break;
        }
      }
      this.$refs.PostDetail.zanInfo.postid = this.posts[rowIndex].id;
      if (add) {
        this.$refs.PostDetail.add = true;
        this.$refs.PostDetail.zanInfo.zan = 0;
        this.$refs.PostDetail.zanInfo.read = 1;
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug('addZan in showContent ');
        // get the id of zan
        addZanReq(this.$refs.PostDetail.zanInfo).then((success) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(success);
          this.$refs.PostDetail.zanInfo.zanid = success.id;
          this.$refs.PostDetail.zanInfo.postid = success.post;
          this.$refs.PostDetail.zanInfo.zan = success.zan;
          this.$refs.PostDetail.zanInfo.read = success.read;
          this.zans.push(this.$refs.PostDetail.zanInfo);
          this.nowProccess = this.zans.length - 1;
          // this.initPost();
        }, (error) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(error);
          this.initPost();
        });
      } else {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug('update in showContent');
        updateZanReq(this.$refs.PostDetail.zanInfo).then((success) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(success);
          // this.zans[this.nowProccess].read += 1;
          // this.initPost();
        }, (error) => {
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(error);
          this.initPost();
        });
      }
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.zans);
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.$refs.PostDetail.zanInfo.zanid);
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.$refs.PostDetail.zanInfo.postid);
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.$refs.PostDetail.zanInfo.zan);
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.$refs.PostDetail.zanInfo.read);
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      console.debug(this.revpost);
      this.$refs.dialog.open();
    },
    updateScore() {
      for (let i = 0; i < this.posts.length; i += 1) {
        this.posts[i].score = this.retScore(i);
      }
    },
    retScore(index) {
      for (let i = 0; i < this.zans.length; i += 1) {
        if (this.posts[index].title === this.revpost[i].title) {
          if (this.posts[index].author === this.revpost[i].author) {
            return this.revpost[i].score;
          }
        }
      }
      return 0;
    },
    retReadZan(index) {
      for (let i = 0; i < this.zans.length; i += 1) {
        if (this.posts[index].id === this.zans[i].postid) {
          return (this.zans[i].read * 0.3) + (this.zans[i].zan * 0.7);
        }
      }
      return 0;
    },
    retRead(index) {
      for (let i = 0; i < this.zans.length; i += 1) {
        if (this.posts[index].id === this.zans[i].postid) {
          return this.zans[i].read;
        }
      }
      return 0;
    },
    retZan(index) {
      for (let i = 0; i < this.zans.length; i += 1) {
        if (this.posts[index].id === this.zans[i].postid) {
          return this.zans[i].zan;
        }
      }
      return 0;
    },
    calHot(index) {
      return this.posts[index].read + this.posts[index].zan;
      // return this.posts[index].author.length;
    },
    compareFunc(a, b) {
      return (((b.hot * 0.5) + (b.score * 0.5)) - ((a.hot * 0.5) + (a.score * 0.5)));
    },
    hotSort(type) {
      if (type === 1) {
        for (let i = 0; i < this.posts.length; i += 1) {
          this.posts[i].hot = this.retReadZan(i);
        }
      } else if (type === 2) {
        for (let i = 0; i < this.posts.length; i += 1) {
          this.posts[i].hot = this.retZan(i);
        }
      } else {
        for (let i = 0; i < this.posts.length; i += 1) {
          this.posts[i].hot = this.retRead(i);
        }
      }
      // sort
      this.posts = this.posts.sort(this.compareFunc);
    },
    // not yet using the closeDialog
    closeDialog(ref) {
      if (!this.$refs.PostDetail.zanAlready) {
        if (this.$refs.PostDetail.add) {
          for (let i = 0; i < this.zans.length; i += 1) {
            if (this.zans[i].id === this.this.$refs.PostDetail.zanInfo.zanid) {
              this.zans[i].read += 1;
              // if (this.$refs.PostDetail.add) {
              this.zans[i].zan += 1;
              // }
              break;
            }
          }
        }
      }
      this.$refs.PostDetail.zanInfo.postid = -1;
      this.$refs.PostDetail.zanInfo.id = -1;
      this.$refs.PostDetail.zanInfo.zan = -1;
      this.$refs.PostDetail.zanInfo.read = -1;
      this.$refs.PostDetail.add = true;
      this.$refs.PostDetail.zanAlready = false;
      this.$refs[ref].close();
    },
    cut(content) {
      return content.slice(0, 20);
    },
    reloadPost() {
      this.$refs.loading.open();
      this.initPost();
    },
    initPost() {
      this.posts = [];
      this.zans = [];
      reviewPostListReq().then((success) => {
        if (success.Reviewpost !== undefined) {
          this.revpost = [];
          const res = success.Reviewpost;
          for (let i = 0; i < res.length; i += 1) {
            let scoret = 0;
            if (res[i].reviewnum !== 0) {
              scoret = res[i].count / res[i].reviewnum;
            }
            this.revpost.push({
              title: res[i].title,
              location: res[i].location,
              author: res[i].author,
              submittime: res[i].submittime,
              content: res[i].content,
              score: scoret,
            });
          }
        }
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.$refs.loading.close();
      });
      postListReq().then((success) => {
        if (success.Post !== undefined) {
          this.posts = [];
          const res = success.Post;
          for (let i = 0; i < res.length; i += 1) {
            this.posts.push({
              id: res[i].id,
              title: res[i].title,
              location: res[i].location,
              author: res[i].author,
              submittime: res[i].submittime,
              time: timeConverter(res[i].submittime),
              content: res[i].content,
              score: -1,
              hot: 0,
            });
          }
          this.bst = makeBST(this.posts);
          this.$refs.loading.close();
        }
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.$refs.loading.close();
      });
      zanListReq().then((success) => {
        if (success.Zan !== undefined) {
          this.zans = [];
          const res = success.Zan;
          for (let i = 0; i < res.length; i += 1) {
            this.zans.push({
              zanid: res[i].id,
              postid: res[i].postid,
              zan: res[i].zan,
              read: res[i].read,
            });
          }
        }
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
        this.$refs.loading.close();
      });
      this.updateScore();
    },
    refreshPosts() {
      switch (this.searchOption) {
        case '0': {
          const wd = new Date();
          wd.setDate(wd.getDate() - 7);
          this.posts = findPost(this.bst, wd, this.searchString);
          break;
        }
        case '1': {
          const md = new Date();
          const m = md.getMonth();
          md.setMonth(md.getMonth() - 1);
          if (md.getMonth() === m) md.setDate(0);
          md.setHours(0, 0, 0);
          md.setMilliseconds(0);
          this.posts = findPost(this.bst, md, this.searchString);
          break;
        }
        case '2': {
          const yd = new Date();
          yd.setFullYear(yd.getFullYear() - 1);
          this.posts = findPost(this.bst, yd, this.searchString);
          break;
        }
        default: {
          this.posts = findPost(this.bst, 0, this.searchString);
          break;
        }
      }
    },
  },
};
</script>

<style>
.postViewContainer{
  width: 95%;
  padding-bottom: 10%;
}

.postViewContainer {
  padding-top: 1%;
  width: 80%;
  margin: 0 auto;
}

.sortButton {
  width: 100px;
  height: 30px;
}

#spin {
  margin: 0 auto;
}

.md-table .md-table-cell.md-has-action .md-table-cell-container {
  justify-content: space-around;
}
.md-table .md-table-head {
  text-align: center;
}
.md-table .md-table-cell {
  text-align: center;
}

p {
  font-size: 120%;
}

.sort{
  margin-right: 0;
}
</style>
