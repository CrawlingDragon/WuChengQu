<template>
  <div>
    <van-field
      v-model="addressObj.text"
      class="address"
      name="所在位置"
      label="所在位置"
      placeholder=""
      readonly
      input-align="right"
      v-if="ismember == 0 && isShaoxing != '婺城区'"
      :class="{
        fail:
          addressObj.text == '定位中···' || addressObj.text == '抱歉未定位到'
      }"
      @click="reLocation"
    >
      <template #right-icon>
        <van-icon name="arrow" />
      </template>
    </van-field>
    <div id="container"></div>
  </div>
</template>
<script>
// import AMap from "AMap";
const defaultCity = "婺城区";
import { geolocation } from "@/common/js/baidu_locationAddress";
import { mapState } from "vuex";
import storage from "good-storage";
export default {
  name: "local",
  components: {},
  props: {
    propMid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      userInfo: "", //用户信息
      ismember: "", // 是否是会员
      isShaoxing: "",
      locationTime: "first",
      addressObj: {
        // 定位数据
        text: "定位中···",
        province: "", // 省
        city: "", // 市
        town: "" //区
      }
    };
  },
  computed: {
    ...mapState(["token"])
  },
  watch: {},
  mounted() {
    this.getMyAddress();
  },
  methods: {
    reLocation() {
      this.addressObj = {
        text: "定位中···",
        province: "", // 省
        city: "", // 市
        town: "" //区
      };
      this.getLocation();
    },
    async getLocation() {
      let localtionAddress = await geolocation();
      console.log(localtionAddress);
      let localStatus = storage.session.get("localStatus");
      if (localtionAddress != "定位失败") {
        let district = localtionAddress.district
          ? `,${localtionAddress.district}`
          : "";
        let text = `${localtionAddress.province},${localtionAddress.city}${district}`;
        this.address = text;
        this.addressObj = {
          text: text,
          province: localtionAddress.province, // 省
          city: localtionAddress.city, // 市
          town: localtionAddress.district //区
        };
      } else {
        if (this.locationTime == "first") {
          this.addressObj = {
            text: "抱歉未定位到",
            province: "", // 省
            city: "", // 市
            town: "" //区
          };
          this.locationTime = "noFirst";
          return;
        }
        let adressTitle =
          this.userInfo.resideprovince +
          "," +
          this.userInfo.residecity +
          (this.userInfo.residedist == ""
            ? ""
            : "," + this.userInfo.residedist);
        if (localStatus == 6) {
          //6是没有权限
          //7是服务不可用
          //定位权限未打开
          // 位置结果未知。对应数值“2”
          if (
            this.userInfo.resideprovince == "" &&
            this.userInfo.residecity == "" &&
            this.userInfo.residedist == ""
          ) {
            //个人资料地址为空
            this.$dialog
              .alert({
                title: "定位失败",
                message: "检测到您未打开定位服务",
                confirmButtonText: "不显示地址",
                confirmButtonColor: "#155BBB"
              })
              .then(() => {
                // on close
                // that.address = "";
                this.addressObj = {
                  text: "",
                  province: "", // 省
                  city: "", // 市
                  town: "" //区
                };
                // that.$emit("getAddress", that.address);
              });
          } else {
            //个人资料地址不为空
            this.$dialog
              .alert({
                title: "定位失败",
                message: "检测到您未打开定位服务,已自动切换至 " + adressTitle,
                confirmButtonText: "好的",
                confirmButtonColor: "#155BBB"
              })
              .then(() => {
                // on close
                // that.address = adressTitle;
                this.addressObj = {
                  text: adressTitle,
                  province: this.userInfo.resideprovince, // 省
                  city: this.userInfo.residecity, // 市
                  town: this.userInfo.residedist //区
                };
                // that.$emit("getAddress", that.address);
              });
          }
        } else {
          //未打开定位权限
          if (
            this.userInfo.resideprovince == "" &&
            this.userInfo.residecity == "" &&
            this.userInfo.residedist == ""
          ) {
            this.$dialog
              .alert({
                title: "定位失败",
                message:
                  "抱歉未定位到您的所在地址,后期可以在“我的-编辑资料-所在地”完善信息",
                confirmButtonText: "不显示地址",
                confirmButtonColor: "#155BBB"
              })
              .then(() => {
                // on close
                this.addressObj = {
                  text: "",
                  province: "", // 省
                  city: "", // 市
                  town: "" //区
                };
              });
          } else {
            this.$dialog
              .alert({
                title: "定位失败",
                message: "抱歉未定位到您的所在地址,已自动切换至 " + adressTitle,
                confirmButtonText: "好的",
                confirmButtonColor: "#155BBB"
              })
              .then(() => {
                // on close
                this.addressObj = {
                  text: adressTitle,
                  province: this.userInfo.resideprovince, // 省
                  city: this.userInfo.residecity, // 市
                  town: this.userInfo.residedist //区
                };
                // that.$emit("getAddress", that.address);
              });
          }
        }
      }
    },
    getMyAddress() {
      // 获取我的地址，是否加入医院
      // eslint-disable-next-line no-debugger
      this.$axios
        .fetchPost("Mobile/User/userCenter", {
          token: this.token,
          mId: this.propMid
        })
        .then(res => {
          console.log("res :>> ", res);
          if (res.data.code == 0) {
            // let myAddress = res.data.data.ismember;
            // // 是否是该医院的会员
            // let isDefaultCity = res.data.data.residecity;
            // 个人资料是否是规定区域
            let myAddress = res.data.data.ismember;
            this.isShaoxing = res.data.data.residecity;
            this.ismember = res.data.data.ismember;
            this.userInfo = res.data.data;
            if (myAddress == 1 || this.isShaoxing == defaultCity) {
              this.addressObj = {
                text: `浙江省,${defaultCity}`,
                province: "浙江省", // 省
                city: defaultCity, // 市
                town: "" //区
              };
            } else {
              setTimeout(() => {
                this.getLocation();
              }, 100);
            }
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
#container
  display none
.address
  border-bottom 10px solid #e5e5e5
  &.fail
    /deep/.van-field__control
      color #999
/deep/.van-cell
  font-size 16px
/deep/.van-field__label
  color #333
/deep/.van-cell
  padding 10px 12px
</style>
