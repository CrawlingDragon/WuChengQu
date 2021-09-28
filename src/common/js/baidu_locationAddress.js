import BMapGL from "BMapGL";

export function getCityAddress() {
  // ip定位，获取市
  return new Promise(resolve => {
    function myFun(result) {
      var cityName = result.name;
      resolve(cityName);
    }
    var myCity = new BMapGL.LocalCity();
    myCity.get(myFun);
  });
}

export function geolocation() {
  // 浏览器精确定位
  return new Promise(resolve => {
    var geolocation = new BMapGL.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == 0) {
        let address = r.address;
        resolve(address);
      } else {
        resolve("定位失败");
        console.log("failed :>> ", this.getStatus());
      }
    });
  });
}
