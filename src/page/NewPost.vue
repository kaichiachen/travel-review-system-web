<template>
  <div class="postViewContainer">
    <form novalidate @submit.stop.prevent="submit">
  <md-input-container>
    <label>Initial value</label>
    <md-input v-model="initialValue"></md-input>
  </md-input-container>

  <md-input-container>
    <label>Autocomplete (with fetch)</label>
    <md-autocomplete v-model="autocompleteValue" :fetch="fetchFunction"></md-autocomplete>
  </md-input-container>

  <md-input-container>
    <label>With label</label>
    <md-input placeholder="My nice placeholder"></md-input>
  </md-input-container>

  <md-input-container md-inline>
    <label>Inline field</label>
    <md-input></md-input>
  </md-input-container>

  <md-input-container>
    <label>Number</label>
    <md-input type="number"></md-input>
  </md-input-container>

  <md-input-container>
    <label>Textarea</label>
    <md-textarea></md-textarea>
  </md-input-container>

  <md-input-container>
    <label>Disabled</label>
    <md-input disabled></md-input>
  </md-input-container>

  <md-input-container md-clearable>
    <label>Clearable</label>
    <md-input v-model="initialValue"></md-input>
  </md-input-container>
</form>
  </div>
</template>

<script>
import snackbar from '@/components/SnackBar';
import PostDetail from '@/page/PostDetail';
import { postListReq, postSearchReq } from '@/service';

export default {
  data: () => ({
    searchString: 'enter to search',
    posts: [
      {
        title: '上海一日游',
        location: '上海',
        author: 'bugzyz',
        posttime: '20170101',
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
    testposts: [
      {
        title: '上海一日游',
        location: '上海',
        author: 'bugzyz',
        posttime: '20170101',
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
      {
        title: '北京一日游',
        location: '北京',
        author: 'bugzyz',
        posttime: '20170105',
        content: `大家印象
北京文化底蕴深厚，是一个古典与现代结合的城市。旅游资源十分丰富，景色都很宏伟壮观。北京的交通和购物都很方便，也有很多美食，小吃和北京烤鸭好吃，雾霾比较严重，空气质量不行。
走进北京
北京，中国首都。每个人心中，都有一个“我爱北京天安门”的北京情结，都曾梦想着生活在传说中的紫禁城；梦想着穿梭在王朔笔下的胡同和大院；也梦想着爬上万里长城，大喊：我是好汉！在每个人心中，都一个人属于自己的北京。 北京是一座包容万象、海纳百川的城市。三千年的历史，六朝故都，这里荟萃了自元明清以来的中华文化，荟萃了众多名胜古迹和人文景观。这里汇聚了八方来客，宗教、文化、语言在这里融合，兼容并蓄。如果想准确的描绘出北京的模样，无异于痴人说梦，北京在红宫墙外的宁静小路上，在胡同儿的转弯拐角儿，在国贸的匆匆路旁，也在未名湖边的石砖小径。只有用心去感受，去聆听，才能听到北京的内心独白。 在我的心里，北京表面上它是现代大都会，但是内心却有抹不去的古朴和怀旧。闲庭信步在逐渐少去的胡同里，走进那热气腾腾的涮肉店，那才是真正的北京。 有许多著名的学府如清华、北大等也汇聚于此，可以漫步校园中想象朱自清、胡适等昔日大师在校任教时的情景。 还有许多闻名遐迩的自然景观，如红叶迷人的香山公园、竹林遍地的紫竹院、环境幽雅的玉渊潭……
最佳季节：9月-10月。这是来北京旅游的最佳时节。 秋季的北京一年中最美丽的，此时秋高气爽，气候宜人，空气质量最佳。尤其是十月下旬（霜降前后）至十一月上旬，是红叶层林尽染的时候，著名的香山“红叶节”也将在此期间举行。 另一个在北京旅游观光的好时间是每年12月初至次年2月中旬，这个时候来北京就一定要去北京的庙会逛一逛。正月里（农历大年三十到二月初一）是举办庙会最为集中的日子，厂甸、五显财神庙、白云观、雍和宫、东岳庙、龙潭湖等都会举办规模盛大的庙会，处处人山人海、热闹非凡，一派和谐欢乐的景象。`,
      },
      {
        title: '北京一日游',
        location: '北京',
        author: 'bugzyz',
        posttime: '20170110',
        content: 'hi!我只是用来测试的一小段文字嘿嘿',
      },
      {
        title: '北京一日游',
        location: '北京',
        author: 'bugzyz',
        posttime: '20170105',
        content: `大家印象
北京文化底蕴深厚，是一个古典与现代结合的城市。旅游资源十分丰富，景色都很宏伟壮观。北京的交通和购物都很方便，也有很多美食，小吃和北京烤鸭好吃，雾霾比较严重，空气质量不行。
走进北京
北京，中国首都。每个人心中，都有一个“我爱北京天安门”的北京情结，都曾梦想着生活在传说中的紫禁城；梦想着穿梭在王朔笔下的胡同和大院；也梦想着爬上万里长城，大喊：我是好汉！在每个人心中，都一个人属于自己的北京。 北京是一座包容万象、海纳百川的城市。三千年的历史，六朝故都，这里荟萃了自元明清以来的中华文化，荟萃了众多名胜古迹和人文景观。这里汇聚了八方来客，宗教、文化、语言在这里融合，兼容并蓄。如果想准确的描绘出北京的模样，无异于痴人说梦，北京在红宫墙外的宁静小路上，在胡同儿的转弯拐角儿，在国贸的匆匆路旁，也在未名湖边的石砖小径。只有用心去感受，去聆听，才能听到北京的内心独白。 在我的心里，北京表面上它是现代大都会，但是内心却有抹不去的古朴和怀旧。闲庭信步在逐渐少去的胡同里，走进那热气腾腾的涮肉店，那才是真正的北京。 有许多著名的学府如清华、北大等也汇聚于此，可以漫步校园中想象朱自清、胡适等昔日大师在校任教时的情景。 还有许多闻名遐迩的自然景观，如红叶迷人的香山公园、竹林遍地的紫竹院、环境幽雅的玉渊潭……
最佳季节：9月-10月。这是来北京旅游的最佳时节。 秋季的北京一年中最美丽的，此时秋高气爽，气候宜人，空气质量最佳。尤其是十月下旬（霜降前后）至十一月上旬，是红叶层林尽染的时候，著名的香山“红叶节”也将在此期间举行。 另一个在北京旅游观光的好时间是每年12月初至次年2月中旬，这个时候来北京就一定要去北京的庙会逛一逛。正月里（农历大年三十到二月初一）是举办庙会最为集中的日子，厂甸、五显财神庙、白云观、雍和宫、东岳庙、龙潭湖等都会举办规模盛大的庙会，处处人山人海、热闹非凡，一派和谐欢乐的景象。`,
      },
      {
        title: '上海一日游',
        location: '上海',
        author: 'bugzyz',
        posttime: '20170101',
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
      {
        title: '北京一日游',
        location: '北京',
        author: 'bugzyz',
        posttime: '20170105',
        content: `大家印象
北京文化底蕴深厚，是一个古典与现代结合的城市。旅游资源十分丰富，景色都很宏伟壮观。北京的交通和购物都很方便，也有很多美食，小吃和北京烤鸭好吃，雾霾比较严重，空气质量不行。
走进北京
北京，中国首都。每个人心中，都有一个“我爱北京天安门”的北京情结，都曾梦想着生活在传说中的紫禁城；梦想着穿梭在王朔笔下的胡同和大院；也梦想着爬上万里长城，大喊：我是好汉！在每个人心中，都一个人属于自己的北京。 北京是一座包容万象、海纳百川的城市。三千年的历史，六朝故都，这里荟萃了自元明清以来的中华文化，荟萃了众多名胜古迹和人文景观。这里汇聚了八方来客，宗教、文化、语言在这里融合，兼容并蓄。如果想准确的描绘出北京的模样，无异于痴人说梦，北京在红宫墙外的宁静小路上，在胡同儿的转弯拐角儿，在国贸的匆匆路旁，也在未名湖边的石砖小径。只有用心去感受，去聆听，才能听到北京的内心独白。 在我的心里，北京表面上它是现代大都会，但是内心却有抹不去的古朴和怀旧。闲庭信步在逐渐少去的胡同里，走进那热气腾腾的涮肉店，那才是真正的北京。 有许多著名的学府如清华、北大等也汇聚于此，可以漫步校园中想象朱自清、胡适等昔日大师在校任教时的情景。 还有许多闻名遐迩的自然景观，如红叶迷人的香山公园、竹林遍地的紫竹院、环境幽雅的玉渊潭……
最佳季节：9月-10月。这是来北京旅游的最佳时节。 秋季的北京一年中最美丽的，此时秋高气爽，气候宜人，空气质量最佳。尤其是十月下旬（霜降前后）至十一月上旬，是红叶层林尽染的时候，著名的香山“红叶节”也将在此期间举行。 另一个在北京旅游观光的好时间是每年12月初至次年2月中旬，这个时候来北京就一定要去北京的庙会逛一逛。正月里（农历大年三十到二月初一）是举办庙会最为集中的日子，厂甸、五显财神庙、白云观、雍和宫、东岳庙、龙潭湖等都会举办规模盛大的庙会，处处人山人海、热闹非凡，一派和谐欢乐的景象。`,
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
      this.$refs.PostDetail.posttime = this.posts[rowIndex].posttime;
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
              posttime: res[i].posttime,
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
      postSearchReq(this.searchString).then((success) => {
        this.posts = [];
        if (success.Post !== undefined) {
          this.posts = [];
          const res = success.Post;
          for (let i = 0; i < res.length; i += 1) {
            this.posts.push({
              title: res[i].title,
              location: res[i].location,
              author: res[i].author,
              posttime: res[i].posttime,
              content: res[i].content,
            });
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
