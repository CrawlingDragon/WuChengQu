<template>
  <div class="hospital_online-container">
    <Header header="indexHeader" navHeader="线上网诊" :mid="mid"></Header>
    <ul v-show="!noData">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <li v-for="item in list" :key="item.id">
          <OnlineItem :list="item" @preImage="preverImg"></OnlineItem>
        </li>
      </van-list>
    </ul>
    <van-empty description="暂无网诊" v-show="noData"></van-empty>
  </div>
</template>
<script>
import Header from "@/components/hospital_header/hospital_header";
import OnlineItem from "@/components/online_item/online_item";
import { mapState } from "vuex";
import { ImagePreview } from "vant";
import { useMeta } from "vue-meta";
export default {
  setup() {
    useMeta({
      title: "线上网诊"
    });
  },
  name: "hospitalOnline",
  components: {
    Header,
    OnlineItem,
    [ImagePreview.Component.name]: ImagePreview.Component
  },

  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 0,
      noData: false
    };
  },
  created() {},
  computed: {
    ...mapState(["mid"])
  },

  watch: {},
  mounted() {},
  methods: {
    onLoad() {
      this.getList();
    },
    preverImg(item) {
      //网诊的图片预览
      ImagePreview({
        images: item.arr,
        startPosition: item.index,
        closeable: true
      });
    },
    getList() {
      // 获取网诊列表
      this.page += 1;
      this.noData = false;
      this.$axios
        .fetchPost("/Mobile/Wen/index", {
          mId: this.mid,
          page: this.page,
          isall: "self"
        })
        .then(res => {
          if (res.data.code == 0) {
            this.list = this.list.concat(res.data.data);
            this.loading = false;
          } else if (res.data.code == 201) {
            if (this.page == 1) {
              this.noData = true;
            }
            this.finished = true;
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.hospital_online-container
  ul
    background #fff
    margin-top 10px
    padding-left 12px
    li
      border-bottom 1px solid #e5e5e5
      &:last-child
        border none
</style>
