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
          <md-button class="md-icon-button" @click="initPost()" ><label>复原</label></md-button>
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
import { postListReq } from '@/service';
import { makeBST, timeConverter, findPost } from '@/config/utils';

export default {
  data: () => ({
    searchString: '',
    posts: [
    ],
    searchOption: -1,
    bst: null,
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
              time: timeConverter(res[i].submittime),
              content: res[i].content,
            });
          }
          this.bst = makeBST(this.posts);
          /* eslint no-console: ["error", { allow: ["debug"] }] */
          console.debug(findPost(this.bst, 20170606));
        }
      }, (error) => {
        /* eslint no-console: ["error", { allow: ["debug"] }] */
        console.debug(error);
      });
    },
    refreshPosts() {
      switch (this.searchOption) {
        case '0': {
          const wd = new Date();
          wd.setDay(wd.getDay() - 7);
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
          yd.setYear(yd.getYear() - 1);
          this.posts = findPost(this.bst, yd, this.searchString);
          break;
        }
        default: {
          this.posts = findPost(this.bst, 0, this.searchString);
          break;
        }
      }
      /* eslint no-console: ["error", { allow: ["debug"] }] */
      // console.debug(this.searchOption);
      // this.$refs.loading.open();
      // postListReq().then((success) => {
      //   if (this.searchString === '') return;
      //   this.posts = [];
      //   if (success.Post !== undefined) {
      //     this.posts = [];
      //     const res = success.Post;
      //     for (let i = 0; i < res.length; i += 1) {
      //       if (this.searchString === res[i].title || this.searchString === res[i].location) {
      //         this.posts.push({
      //           title: res[i].title,
      //           location: res[i].location,
      //           author: res[i].author,
      //           time: timeConverter(res[i].submittime),
      //           content: res[i].content,
      //         });
      //       }
      //     }
      //   }
      //   this.$refs.loading.close();
      // }, (error) => {
      //   /* eslint no-console: ["error", { allow: ["debug"] }] */
      //   console.debug(error);
      //   this.$refs.loading.close();
      // });
    },
  },
};
</script>

<style>
.postViewContainer{
  width: 95%;
}

.postViewContainer {
  padding-top: 1%;
  width: 80%;
  margin: 0 auto;
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
</style>
