<template>
  <div class="index-container" ref="index">
    <Header></Header>
    <div class="swiper-box" ref="swiper">
      <van-swipe :autoplay="3000" :style="{ height: h }">
        <van-swipe-item
          v-for="image in swiperArr"
          :key="image.id"
          fit="cover"
          @click="goToMessageDetail(image)"
        >
          <van-image fit="cover" :src="image.thumb" lazy-load />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="nav-box">
      <router-link to="/index_online" class="item">
        <div class="icon i5"></div>
        <p>找答案</p>
      </router-link>
      <div class="item">
        <a
          :href="shareStoreUrl"
          target="_blank"
          style="display:block;color:#000;"
        >
          <div class="icon i2"></div>
          <p>找农资</p>
        </a>
      </div>
      <router-link to="/into_hospital" class="item">
        <div class="icon i5"></div>
        <p>找中心</p>
      </router-link>
      <router-link to="/ask" class="item">
        <div class="icon i5"></div>
        <p>提问</p>
      </router-link>
    </div>
    <div class="hospital-box">
      <div class="title">
        推荐中心<span>加入数字乡村运营中心，免费享受会员服务</span>
      </div>
      <ul class="h-ul">
        <li v-for="item in hospitalArr" :key="item.id">
          <RecommendHospital :list="item"></RecommendHospital>
        </li>
      </ul>
    </div>
    <div class="look-bar" @click="lookMoreHospital">找中心 ></div>
    <div class="online-box">
      <div class="title">网诊</div>
      <ul class="o-ul">
        <li v-for="item in onlineArr" :key="item.id" ref="li">
          <OnlineItem :list="item" @preImage="preverImg"></OnlineItem>
        </li>
      </ul>
    </div>
    <div class="look-bar" @click="goToAnswer">找答案 ></div>
    <Foot></Foot>
  </div>
</template>
<script>
import Header from "@/components/header/header.vue";
import RecommendHospital from "@/components/recommend_hospital/recommend_hospital";
import OnlineItem from "@/components/online_item/online_item";
import { ImagePreview } from "vant";
import { mapState } from "vuex";
import Foot from "@/components/foot/foot";
import { useMeta } from "vue-meta";

export default {
  setup() {
    useMeta({
      title: "为农服务平台"
    });
  },
  name: "index",
  components: {
    Header,
    RecommendHospital,
    OnlineItem,
    Foot,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  props: {},
  data() {
    return {
      swiperArr: [],
      hospitalArr: [],
      expertArr: [],
      onlineArr: [],
      scrollInit: false,
      shareStoreUrl: process.env.VUE_APP_SHARE_URL,
      h: 0
    };
  },
  created() {},
  computed: {
    ...mapState(["initMid", "token"])
  },
  watch: {},
  mounted() {
    this.initSwiperHeight();
    this.getIndexData();
    window.addEventListener("resize", this.initSwiperHeight);
  },
  // unmounted() { window.removeEventListener('scroll', this.scrollHandler)},
  methods: {
    initSwiperHeight() {
      let w = this.$refs.swiper.offsetWidth;
      if (w >= 640) {
        w = 640;
      }
      this.h = w / (750 / 260) + "px";
    },
    scrollHandler() {
      this.$nextTick(() => {
        // let l = this.onlineArr.length
        // let li = this.$refs.li[l - 1]
        if (this.scrollInit) {
          var scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
          //变量windowHeight是可视区的高度
          var windowHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
          //变量scrollHeight是滚动条的总高度
          var scrollHeight =
            document.documentElement.scrollHeight || document.body.scrollHeight;
          //滚动条到底部的条件
          if (scrollTop + windowHeight == scrollHeight) {
            //到了这个就可以进行业务逻辑加载后台数据了
            setTimeout(() => {
              this.$router.push({
                path: "/index_online"
              });
            }, 500);
          }
        }
      });
    },
    getIndexData() {
      // 获取首页数据
      this.$axios
        .fetchPost("/Mobile/Index/index", {
          mId: this.initMid,
          token: this.token
        })
        .then(res => {
          if (res.data.code == 0) {
            this.swiperArr = res.data.data.list_ad;
            this.hospitalArr = res.data.data.list_mpublic;
            this.expertArr = res.data.data.list_expert;
            this.onlineArr = res.data.data.list_wen;
            this.scrollInit = true;
          }
        });
    },
    goToLive() {
      this.setMid(this.initMid);
      this.$router.push({ path: "/live", query: { from: "index" } });
    },
    preverImg(item) {
      //网诊的图片预览
      ImagePreview({
        images: item.arr,
        startPosition: item.index,
        closeable: true
      });
    },
    goToAnswer() {
      //  去首页的的网诊
      this.$router.push({ path: "/index_online" }).catch(err => err);
    },
    // goToExpert() {
    //   // 找专家
    //   this.$router.push({ path: "/look_expert" }).catch(err => err);
    // },
    // goToBase() {
    //   // 找基地
    //   this.$router.push({ path: "/whole_base_list" }).catch(err => err);
    // },
    lookMoreHospital() {
      // 查找更多的医院
      this.$router.push({ path: "/into_hospital" }).catch(err => err);
    },
    goToVip() {
      this.$router.push({ path: "/vip" }).catch(err => err);
    },
    goToMessageDetail(image) {
      //轮播图去资讯详情页
      this.$router.push({
        path: "/message_detail",
        query: { id: image.id, catid: image.catid }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.index-container
  padding-bottom 50px
  .swiper-box
    width 100%
    margin-top 10px
    /deep/.van-image
      display block
      width 100%
      height 100%
  .nav-box
    height 100px
    display flex
    align-items center
    background #FFFFFF
    margin-bottom 10px
    .item
      flex 1
      text-align center
      .icon
        width 40px
        height 40px
        color #343434
        font-size 14px
        margin 0 auto
        margin-bottom 10px
        &.i1
          background url('./1.png') no-repeat center
          background-size cover
        &.i2
          background url('./2.png') no-repeat center
          background-size cover
        &.i3
          background url('./3.png') no-repeat center
          background-size cover
        &.i4
          background url('./4.png') no-repeat center
          background-size cover
        &.i5
          background url('./5.png') no-repeat center
          background-size cover
      p
        color #333333
  .hospital-box
    background #fff
    .title
      height 40px
      padding-left 12px
      border-bottom 1px solid #E5E5E5
      line-height 40px
      font-size 17px
      color #343434
      overflow hidden
      box-sizing border-box
      span
        margin-left 10px
        color #9A9A9A
        font-size 12px
    .h-ul
      margin-left: 12px;
      margin-top: 10px;
      margin-bottom: 10px;
      li
        display: inline-block;
        padding-right: 12px;
        padding-bottom: 12px;
        width 50%
        height: 285px;
        vertical-align: top;
        position: relative;
  .look-bar
    height 40px
    text-align center
    color $theme-color
    font-size 12px
    line-height 40px
    background #fff
    border-bottom 1px solid #e5e5e5
  .vip-box
    width 100%
    margin-bottom 10px
    padding 5px 12px
    background #fff
    img
      display block
      width 100%
      height 100%
  .online-box
    background #fff
    margin-top 10px
    .title
      font-size 17px
      color #343434
      height 40px
      line-height 40px
      padding-left 12px
      border-bottom 1px solid #e5e5e5
      background #fff
    .o-ul
      margin-left 12px
      li
        width 100%
        border-bottom 1px solid #e5e5e5
    .e-ul
      padding-top 10px
      column-gap 0
      column-count 2
      margin-left 12px
      border-bottom 1px solid #e5e5e5
      padding-bottom 5px
      li
        break-inside avoid
        padding-right 12px
        padding-bottom 10px
  .tips
    line-height 30px
    font-size 14px
    color #999
    text-align center
</style>
