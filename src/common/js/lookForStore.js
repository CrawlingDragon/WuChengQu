import { Dialog } from "vant";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
export default function lookForStoreFn(href, callback) {
  const store = useStore();
  const token = computed(() => store.state.token);
  const router = useRouter();
  const route = useRoute();
  function lookForStore() {
    // const href = process.env.VUE_APP_SHARE_URL;
    const path = route.path;

    if (!token.value) {
      Dialog.alert({
        title: "提示",
        message: "找农资,请先登录"
      }).then(() => {
        // on close111
        router.push({
          path: "/login"
        });
        if (path == "/login") {
          callback && callback();
        }
      });

      return;
    }
    window.open(href, "_blank");
  }
  return {
    lookForStore
  };
}
