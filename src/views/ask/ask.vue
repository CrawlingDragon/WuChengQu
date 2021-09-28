<template>
  <div class="ask-container">
    <Header :indexHeader="false"></Header>
    <HospitalHeader v-if="from == 'hospital'" navHeader="提问"></HospitalHeader>
    <div class="title">问题描述</div>
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="message"
        rows="4"
        autosize
        type="textarea"
        placeholder="请输入具体问题描述"
        class="text"
        show-word-limit
        maxlength="300"
        name="message"
      />
      <van-field name="uploader" class="uploader">
        <template #input>
          <van-uploader
            v-model="uploader"
            :after-read="afterRead"
            :before-delete="deleteItem"
            accept="image/*"
            :max-count="9"
            :before-read="beforeRead"
          />
        </template>
      </van-field>
      <div class="choose-crop" @click="goToChooseCrop">
        <div class="left">作物</div>
        <!-- <div class="right" :class="{'location':crop != '请选择'}">{{crop}}</div> -->
        <van-field
          v-model="crop"
          readonly
          class="right"
          :class="{ location: crop != '请选择' }"
          input-align="right"
          :border="false"
          name="crop"
        />
        <van-icon name="arrow" class="arrow" />
      </div>
      <div class="list" v-if="expert">
        <div class="left">咨询专家</div>
        <div class="right">{{ expert }}</div>
      </div>
      <Loacl :propMid="from ? mid : initMid" ref="localRef"></Loacl>
      <div class="sub">
        <van-button round block type="info" native-type="submit" class="btn">
          提交
        </van-button>
      </div>
    </van-form>
    <router-view @getCrop="getCrop"></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Header from "@/components/header/header";
import HospitalHeader from "@/components/hospital_header/hospital_header";
import { mapState } from "vuex";
import Foot from "@/components/foot/foot";
import { exifImg } from "@/common/js/util.js";
import Loacl from "@/components/local/local";
import { useMeta } from "vue-meta";
export default {
  setup() {
    useMeta({ title: "提问" });
  },
  name: "ask",
  components: { Header, Foot, HospitalHeader, Loacl },
  props: {},
  data() {
    return {
      address: "定位中···",
      message: "",
      crop: "请选择",
      fid: "",
      uploader: [],
      imgList: [],
      imgListTiny: [],
      ismember: "",
      isShaoxing: "",
      userInfo: "",
      locationTime: "first",
      submitBoolean: true
    };
  },
  computed: {
    ...mapState(["uid", "mid", "initMid"]),
    from() {
      return this.$route.query.from;
    },
    expert() {
      return this.$route.query.expert;
    },
    expertId() {
      return this.$route.query.expertId;
    },
    localRef() {
      return this.$refs.localRef.addressObj;
    },
    ...mapState(["token"])
  },
  created() {},
  watch: {},
  mounted() {},
  methods: {
    onSubmit(values) {
      if (values.message == "") {
        this.$toast("问题描述不能为空");
        return;
      } else if (values.message.length <= 9) {
        this.$toast("问题描述不能少余10个字");
        return;
      } else if (
        this.localRef.text == "定位中···" &&
        this.ismember == 0 &&
        this.isShaoxing != "婺城区"
      ) {
        this.$toast("地址定位中,请稍等");
        return;
      }
      this.subAsk();
    },
    goToChooseCrop() {
      //选择作物
      this.$router.push({
        path: "/ask/ask_choose_crop"
      });
    },
    getCrop(crop) {
      //选择作物
      this.crop = crop.name;
      this.fid = crop.fid;
    },
    beforeRead(file) {
      // 上传图片之前，压缩图片
      return new Promise(resolve => {
        let img = exifImg(file).then(res => {
          return res;
        });
        resolve(img);
      });
    },
    afterRead(file, detail) {
      // 图片上传
      let formData = new FormData();
      formData.append("urls[]", file.file);
      this.$axios.fetchPost("/Mobile/Wen/OssUploadFile", formData).then(res => {
        // console.log("res :>> ", res);
        if (res.data.code == 0) {
          this.imgList.push(res.data.data);
          this.imgListTiny.push(res.data.data_tiny);
          // this.uploader.push({url:res.data.data,name:'img'})
        } else {
          this.$toast(res.data.message);
          let index = detail.index;
          this.uploader = this.uploader.splice(0, index, 1);
        }
      });
    },
    deleteItem(file, val) {
      let index = val.index;
      this.imgList = this.imgList.splice(0, index, 1);
      this.imgListTiny = this.imgList.splice(0, index, 1);
      return true;
    },
    subAsk() {
      let obj = {
        mId: this.from ? this.mid : this.initMid, //mId
        token: this.token, //用户ID
        content: this.message, //发布内容
        fId: this.fid, //作物ID
        expertId: this.expertId,
        picurl: this.imgList.join(","),
        picurl_tiny: this.imgListTiny.join(","),
        location:
          this.localRef.province +
          "," +
          this.localRef.city +
          (this.localRef.town ? "," + this.localRef.town : "")
      };
      if (this.submitBoolean) {
        this.submitBoolean = false;
        this.$axios.fetchPost("Mobile/Wen/addWenQuestion", obj).then(res => {
          this.$toast(res.data.message);
          if (res.data.code == 0) {
            setTimeout(() => {
              this.$router.push({ path: "/index_online" });
              this.submitBoolean = true;
            }, 1000);
          } else {
            this.submitBoolean = true;
          }
        });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.ask-container
  height 100%
  background #fff
  position relative
  padding-bottom 0px
  .title
    background #fff
    color #333333
    font-size 16px
    line-height 16px
    padding 15px 12px 10px 12px
  .from
    background #fff
    .text
      margin-right 12px
      margin-left 12px
      width auto
      height 130px
      font-size 12px
      border 1px solid #e5e5e5
    .uploader
      padding 10px 12px
      border-bottom 1px solid #e5e5e5
      &.van-cell::after
        display none
    .choose-crop
      border-bottom 1px solid #e5e5e5
      display flex
      align-items center
      height 50px
      padding-left 12px
      .left
        width 106px
        color #333333
        font-size 16px
      .right
        flex 1
        color #999999
        text-align right
        /deep/.van-field__control
          color #999
          font-size 16px
        &.location
          color #333
          &.fail
            color #999
            /deep/.van-field__control
              color #999
          /deep/.van-field__control
            color #333
      .arrow
        font-size 12px
        color #999999
        margin 0 12px
    .list
      height 50px
      line-height 50px
      display flex
      align-items center
      justify-content space-between
      font-size 16px
      color #333
      padding 0 35px 0 12px
      border-bottom 1px solid #e5e5e5
    .sub
      background #ebebeb
      padding 16px
      padding-bottom 60px
      .btn
        margin-right 12px
        border-radius 4px
        background $theme-color
        font-size 15px
        color #fff
        width 100%
        border none
/deep/.van-field__control
  font-size 14px
</style>
