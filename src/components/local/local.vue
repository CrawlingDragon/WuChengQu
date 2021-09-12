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
      v-if="ismember == 0 && isShaoxing != '绍兴市'"
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
    ...mapState(["uid"])
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
      let localStatus = storage.session.get("localStatus");
      if (localtionAddress != "定位失败") {
        this.address = `${localtionAddress.province},${localtionAddress.city},${localtionAddress.district}`;
        this.addressObj = {
          text: `${localtionAddress.province},${localtionAddress.city},${localtionAddress.district}`,
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
      // let that = this;
      // var map = new AMap.Map("container", {
      //   resizeEnable: true, //是否监控地图容器尺寸变化
      //   zoom: 13 //初始地图级别
      // });
      // AMap.plugin("AMap.Geolocation", function() {
      //   var geolocation = new AMap.Geolocation({
      //     enableHighAccuracy: true, //是否使用高精度定位，默认:true
      //     timeout: 10000, //超过10秒后停止定位，默认：无穷大
      //     maximumAge: 0, //定位结果缓存0毫秒，默认：0
      //     convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      //     showButton: false, //显示定位按钮，默认：true
      //     buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
      //     buttonOffset: new AMap.Pixel(10, 20) //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //   });
      //   //替换方法
      //   map.addControl(geolocation);
      //   geolocation.getCurrentPosition(function(status, result) {
      //     if (status == "complete") {
      //       onComplete(result);
      //     } else {
      //       onError(result);
      //     }
      //   });
      //   function onComplete(data) {
      //     // data是具体的定位信息
      //     AMap.plugin("AMap.Geocoder", function() {
      //       var geocoder = new AMap.Geocoder({});
      //       var lnglat = [data.position.lng, data.position.lat];
      //       geocoder.getAddress(lnglat, function(status, result) {
      //         if (status === "complete" && result.info === "OK") {
      //           // result为对应的地理位置详细信息
      //           that.address = `${result.regeocode.addressComponent.province},${result.regeocode.addressComponent.city},${result.regeocode.addressComponent.district}`;
      //           that.addressObj = {
      //             text: `${result.regeocode.addressComponent.province},${result.regeocode.addressComponent.city},${result.regeocode.addressComponent.district}`,
      //             province: result.regeocode.addressComponent.province, // 省
      //             city: result.regeocode.addressComponent.city, // 市
      //             town: result.regeocode.addressComponent.district //区
      //           };
      //           // that.$emit("getAddress", that.address);
      //         }
      //       });
      //     });
      //   }
      //   function onError(error) {
      //     // 定位出错
      //     if (that.locationTime == "first") {
      //       that.addressObj = {
      //         text: "抱歉未定位到",
      //         province: "", // 省
      //         city: "", // 市
      //         town: "" //区
      //       };
      //       that.locationTime = "noFirst";
      //       return;
      //     }
      //     let adressTitle =
      //       that.userInfo.resideprovince +
      //       "," +
      //       that.userInfo.residecity +
      //       (that.userInfo.residedist == ""
      //         ? ""
      //         : "," + that.userInfo.residedist);
      //     if (error.message == "Geolocation permission denied") {
      //       //定位权限未打开
      //       if (
      //         that.userInfo.resideprovince == "" &&
      //         that.userInfo.residecity == "" &&
      //         that.userInfo.residedist == ""
      //       ) {
      //         //个人资料地址为空
      //         that.$dialog
      //           .alert({
      //             title: "定位失败",
      //             message: "检测到您未打开定位服务",
      //             confirmButtonText: "不显示地址",
      //             confirmButtonColor: "#155BBB"
      //           })
      //           .then(() => {
      //             // on close
      //             // that.address = "";
      //             that.addressObj = {
      //               text: "",
      //               province: "", // 省
      //               city: "", // 市
      //               town: "" //区
      //             };
      //             // that.$emit("getAddress", that.address);
      //           });
      //       } else {
      //         //个人资料地址不为空
      //         that.$dialog
      //           .alert({
      //             title: "定位失败",
      //             message: "检测到您未打开定位服务,已自动切换至 " + adressTitle,
      //             confirmButtonText: "好的",
      //             confirmButtonColor: "#155BBB"
      //           })
      //           .then(() => {
      //             // on close
      //             // that.address = adressTitle;
      //             that.addressObj = {
      //               text: adressTitle,
      //               province: that.userInfo.resideprovince, // 省
      //               city: that.userInfo.residecity, // 市
      //               town: that.userInfo.residedist //区
      //             };
      //             // that.$emit("getAddress", that.address);
      //           });
      //       }
      //     } else {
      //       //未打开定位权限
      //       if (
      //         that.userInfo.resideprovince == "" &&
      //         that.userInfo.residecity == "" &&
      //         that.userInfo.residedist == ""
      //       ) {
      //         that.$dialog
      //           .alert({
      //             title: "定位失败",
      //             message:
      //               "抱歉未定位到您的所在地址,后期可以在“我的-编辑资料-所在地”完善信息",
      //             confirmButtonText: "不显示地址",
      //             confirmButtonColor: "#155BBB"
      //           })
      //           .then(() => {
      //             // on close
      //             that.addressObj = {
      //               text: "",
      //               province: "", // 省
      //               city: "", // 市
      //               town: "" //区
      //             };
      //           });
      //       } else {
      //         that.$dialog
      //           .alert({
      //             title: "定位失败",
      //             message:
      //               "抱歉未定位到您的所在地址,已自动切换至 " + adressTitle,
      //             confirmButtonText: "好的",
      //             confirmButtonColor: "#155BBB"
      //           })
      //           .then(() => {
      //             // on close
      //             that.addressObj = {
      //               text: adressTitle,
      //               province: that.userInfo.resideprovince, // 省
      //               city: that.userInfo.residecity, // 市
      //               town: that.userInfo.residedist //区
      //             };
      //             // that.$emit("getAddress", that.address);
      //           });
      //       }
      //     }
      //
      //}
      // });
    },
    getMyAddress() {
      // 获取我的地址，是否加入医院
      // eslint-disable-next-line no-debugger
      this.$axios
        .fetchPost("Mobile/User/userCenter", {
          uId: this.uid,
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
            if (myAddress == 1 || this.isShaoxing == "绍兴市") {
              this.addressObj = {
                text: "浙江省,绍兴市",
                province: "浙江省", // 省
                city: "绍兴市", // 市
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
