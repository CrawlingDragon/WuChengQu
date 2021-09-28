<template>
  <teleport to="body">
    <div class="about-us">
      <Header :indexHeader="false"></Header>
      <div class="content">
        <p class="p1">
          婺城区数字乡村运营中心根据建设场地和运营主体实际情况，围绕当地主导产业（采用新建或改造升级的方式）进行数字乡村服务体系建设。
        </p>
        <p class="p1">
          依靠益农信息社升级到数字乡村服务体系，成为数字乡村运营服务中心的标配，设立专家坐诊区、农资展示展销区、接待区，功能体验及远程视频诊疗区，在此基础上依托浙农检测机构，选择有代表性的益农信息社增设土壤速测仪建立测土配方区，并可以在偏远或服务边缘地区设立村级服务点，服务覆盖婺城区所有涉农街道及乡镇，体现良好的经济效益和社会效益。
        </p>
        <!-- <van-image class="img" fit="cover" :src="require('./us.png')"></van-image> -->
      </div>
    </div>
  </teleport>
</template>
<script>
import Header from "@/components/header/header";
import { mapState } from "vuex";
export default {
  metaInfo: {
    title: "关于我们"
  },
  name: "aboutUs",
  components: { Header },
  props: {},
  data() {
    return {
      us: "",
      mpnumData: 0,
      tel: ""
    };
  },
  computed: {
    ...mapState(["initMid"]),
    mpnum() {
      let x = this.mpnumData;
      if (x < 10) {
        x = "0" + x;
      }
      return x.toString().split("");
    }
  },
  watch: {},
  mounted() {
    this.getAbout();
  },
  methods: {
    getAbout() {
      this.$axios
        .fetchPost("Mobile/Mpublic/getAboutUs", { mId: this.initMid })
        .then(res => {
          if (res.data.code == 0) {
            this.us = res.data.data;
            this.mpnumData = res.data.data.mpnum;
            this.tel = res.data.data.telephone;
          }
        });
    },
    call() {
      var that = this;
      this.$dialog
        .confirm({
          title: "开通庄稼医院",
          message: "建院咨询请联系中农在线 <br/>0571-87661693",
          confirmButtonText: "取消",
          confirmButtonColor: "#999999",
          cancelButtonText: "拨打电话",
          cancelButtonColor: "#155BBB"
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
          that.$refs.tel.click();
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.about-us
  padding-bottom 40px
  background #fff
  height 100%
  position fixed
  left 0
  right 0
  top 50px
  bottom 0
  .content
    margin-top 10px
    padding 15px 12px
    .p1
      color #333
      font-size 15px
      line-height 20px
      margin-bottom 20px
      &:last-child
        margin-bottom 0
  .bottom
    background #fff
    padding 12px
    margin-top 10px
    .small-title
      color #333333
      font-size 16px
      padding 8px 0 15px
      text-align center
    .number
      color #999999
      font-size 12px
      text-align center
      display flex
      align-items center
      justify-content center
      .num
        display inline-block
        width 27px
        height 38px
        line-height 38px
        border 1px dashed rgba(123, 179, 255, 1)
        border-radius 5px
        margin 0 5px
        font-size 30px
        color #333
        font-family HYLingXinJ
        font-weight bold
    .btn
      margin 20px 12px 0
      background #FF6600
      border-radius 4px
      color #FFFFFF
      font-size 15px
      height 50px
      line-height 50px
      text-align center
  .tip
    text-align center
    color #999999
    font-size 12px
    line-height 25px
    margin-top 25px
    padding-bottom 20px
</style>
