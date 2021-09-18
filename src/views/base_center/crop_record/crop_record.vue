<template>
  <div class="crop_record-container">
    <div class="nav-bar van-hairline--bottom" v-if="false">
      <router-link
        class="nav"
        :to="{
          path: '/cropManagement',
          query: { pId: this.$route.query.pId, gId: this.$route.query.gId }
        }"
        replace
      >
        农事管理
      </router-link>
      <router-link
        class="nav"
        :to="{
          path: '/cropRecord',
          query: { pId: this.$route.query.pId, gId: this.$route.query.gId }
        }"
        replace
        >农事记录</router-link
      >
    </div>
    <div class="farm-record-content" v-show="!noData">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <FramItem
          v-for="item in list"
          :key="item.id"
          :item="item"
          @priview="imagePriview"
          @deteleHistory="updateDeteleHistory"
        ></FramItem>
      </van-list>
    </div>
    <div class="bottom-bar">
      <router-link custom v-slot="{ navigate }" to="/base_edit">
        <div class="issue-btn1" @click="navigate">
          <van-icon name="plus" class="issue-icon" />
          <span>发布农事</span>
        </div>
      </router-link>
    </div>
    <div class="no-take-wrap" v-show="noData">
      <p>暂无记录</p>
    </div>
  </div>
</template>
<script>
import FramItem from "@/components/fram_item/fram_item";
import { ImagePreview } from "vant";
import { mapState } from "vuex";

export default {
  name: "crop_record",
  components: {
    FramItem,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  props: {},
  data() {
    return {
      list: [],
      noData: false,
      page: 0,
      loading: false,
      finished: false
    };
  },
  computed: {
    ...mapState(["token"]),
    gId() {
      return this.$route.query.gId;
    },
    id() {
      return this.$route.query.id;
    }
  },
  watch: {},
  mounted() {
    // this.getHistoryList();
  },
  unmounted() {},
  methods: {
    onLoad() {
      this.getHistoryList();
    },
    goLook() {
      this.$router.replace({
        path: "/into_hospital"
      });
    },
    getHistoryList() {
      this.page++;
      this.loading = true;
      this.$axios
        .fetchPost("Mobile/Farmer/getFarmerList", {
          token: this.token,
          page: this.page
        })
        .then(res => {
          if (res.data.code == 0) {
            this.list = this.list.concat(res.data.data);
            this.loading = false;
          }
          if (res.data.code == 201) {
            if (this.page == 1) {
              this.noData = true;
              this.finished = true;
            } else {
              this.loading = false;
              this.finished = true;
            }
          }
        });
    },
    imagePriview(obj) {
      ImagePreview({
        images: obj.imgList,
        startPosition: obj.index,
        closeable: true
      });
    },
    updateDeteleHistory(id) {
      this.list = this.list.filter(item => {
        return item.id != id;
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.crop_record-container
  .nav-bar
    height 50px
    line-height 50px
    display flex
    text-align center
    .nav
      flex 1
      color #666666
      font-size 15px
      background #fff
      &.router-link-active
        color #155BBB
        position relative
        &::after
          content ''
          position absolute
          left 50%
          bottom 0px
          width 30px
          height 3px
          background #155BBB
          border-radius: 3px;
          margin-left -15px
.farm-record-content
  background #fff
  padding 15px 12px 0
.no-take-wrap
  height 300px
  p
    padding-top 150px
    color #666666
    font-size 15px
    text-align center
  .p2
    color #333
    font-size 13px
    line-height 20px
    text-align center
  .btn
    width: 112px;
    height: 40px;
    background: #155BBB;
    border: 1px solid #155BBB;
    border-radius: 40px;
    font-size 15px
    color #fff
    text-align center
    line-height 40px
    margin 0 auto
    margin-top 30px
.bottom-bar
  padding 5px 12px 5px
  position fixed
  bottom 0
  left 0
  right 0
  background #fff
  .issue-btn1
    width 100%
    display inline-block
    height 40px
    border: 1px solid #155BBB;
    border-radius: 8px;
    text-align center
    line-height 40px
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #155BBB;
    .issue-icon
      font-size 18px
      font-weight bold
      top 2px
      margin-right 3px
/deep/.van-list__finished-text,
.van-list__loading
  line-height 1.2
  padding-bottom 50px
</style>
