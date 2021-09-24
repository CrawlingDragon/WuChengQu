import { geolocation } from "./baidu_locationAddress";
import { Dialog } from "vant";
import storage from "good-storage";
export async function inToHospitalLocal(defaultCity) {
  //进院的定位
  let address = await geolocation();
  return new Promise(resolve => {
    let axiosText = `${address.province},${address.city},${address.district}`;
    let obj = {};
    if (address != "定位失败") {
      let city = address.city;
      if (city != defaultCity) {
        obj = {
          text: defaultCity,
          axiosText: `浙江省,${defaultCity}`
        };
        Dialog.alert({
          message: `检测到你的地址不在${defaultCity}，已自动切换至${defaultCity}`,
          confirmButtonText: "知道了",
          confirmButtonColor: "#155BBB"
        });
      } else if (city == defaultCity) {
        obj = {
          text: address.district,
          axiosText: axiosText
        };
      }
      storage.session.set("localStatus", obj);
    } else {
      Dialog.alert({
        message: `定位失败,已自动切换到${defaultCity}`,
        confirmButtonText: "知道了",
        confirmButtonColor: "#155BBB"
      });
      obj = {
        text: defaultCity,
        axiosText: "浙江省," + defaultCity
      };
      storage.session.set("localStatus", "localFailed");
    }
    resolve(obj);
  });
}
