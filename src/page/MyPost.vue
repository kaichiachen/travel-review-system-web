<script>
import snackbar from '@/components/SnackBar';
import PostDetail from '@/page/PostDetail';
import { postListReq } from '@/service';

export default {
  data: () => ({
    searchString: 'enter to search',
    posts: [
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
              // 要怎么拿到当前登陆者的名称
            if (this.searchString === res[i].title || this.searchString === res[i].location)
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
