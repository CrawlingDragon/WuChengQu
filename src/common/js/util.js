export function inWeixin() {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else {
        return false
    }
}

export function getIsApp() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/isapp/i) == "isapp") {
        return true;
    }
    return false;
};