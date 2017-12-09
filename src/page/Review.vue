<template>
<div class="reviewContainer">
    <md-table v-once>
    <md-table-header>
        <md-table-row>
            <md-table-head>标题</md-table-head>
            <md-table-head>地点</md-table-head>
            <md-table-head>时间</md-table-head>
            <md-table-head>其他操作</md-table-head>
        </md-table-row>
    </md-table-header>

    <md-table-body>
        <md-table-row v-for="(row, index) in 4" :key="index">
            <md-table-cell>{{ reviews[index].posttitle }}</md-table-cell>
            <md-table-cell>{{ reviews[index].postlocation }}</md-table-cell>
            <md-table-cell>{{ reviews[index].posttime }}</md-table-cell>
            <md-menu md-direction="bottom left" md-size="3">
                <md-button class="md-icon-button" md-menu-trigger>
                    <md-icon>edit</md-icon>
                </md-button>
                <md-menu-content>
                  <md-menu-item @click="deleteReview(reviews[index].id, row.group_id)">
                    <md-icon>delete</md-icon>
                    <span>删除</span>
                  </md-menu-item>
                  <md-menu-item @click="showDetail(index)">
                    <md-icon>details</md-icon>
                    <span>修改/检视</span>
                  </md-menu-item>
                </md-menu-content>
            </md-menu>
        </md-table-row>
    </md-table-body>
    </md-table>
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog">
      <md-dialog-content class='dialogcontent'>
        <reviewdetail ref="reviewdetail"></reviewdetail>
      </md-dialog-content>
    </md-dialog>
</div>
</template>

<script>

import reviewdetail from '@/page/ReviewDetail';

export default {
  data: () => ({
    nowreview: {},
    reviews: [
      {
        posttitle: '上海游',
        postlocation: '上海',
        posttime: '2017年10月3日',
        postcontent: `本篇游记仅适用于第二次及以上来上海的蜂蜂
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
        postauthor: 'ckj',
        reviewcontent: '真的好棒棒',
        id: 123,
        ispass: false,
      },
      {
        posttitle: '北京游',
        postlocation: '北京',
        posttime: '2017年10月4日',
        postcontent: '',
        postauthor: 'ckj',
        reviewcontent: '真的好棒棒',
        id: 123,
        ispass: true,
      },
      {
        posttitle: '深圳游',
        postlocation: '深圳',
        posttime: '2017年10月5日',
        postcontent: '',
        postauthor: 'ckj',
        reviewcontent: '真的好棒棒',
        id: 123,
        ispass: true,
      },
      {
        posttitle: '广东游',
        postlocation: '广东',
        posttime: '2017年10月6日',
        postcontent: '',
        postauthor: 'ckj',
        reviewcontent: '真的好棒棒',
        id: 123,
        ispass: true,
      },
    ],
  }),
  components: {
    reviewdetail,
  },
  methods: {
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    showDetail(index) {
      this.$refs.reviewdetail.reviewinfo = this.reviews[index];
      this.$refs.reviewdetail.ispass = this.reviews[index].ispass;
      if (this.$refs.reviewdetail.ispass) {
        this.$refs.reviewdetail.status = '是';
      } else {
        this.$refs.reviewdetail.status = '否';
      }
      this.$refs.dialog.open();
    },
  },
};
</script>

<<style>
.reviewContainer {
    margin-top: 3%;
    padding-top: 3%;
    padding-bottom: 3%;
    margin-left: 5%;
    width: 90%;
    border: 1px groove;
    border-color: #CCCCCC;
}
.dialogcontent {
  width: 70vw;
}
.md-table .md-table-cell.md-has-action .md-table-cell-container {
  justify-content: space-around;
  font-size: 15pt;
}
.md-table .md-table-head {
  text-align: center;
  font-size: 15pt;
}
.md-table .md-table-cell {
  text-align: center;
  font-size: 15pt;
}
</style>
