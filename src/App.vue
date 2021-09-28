<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content}` : `首页`
    }}</template>
  </metainfo>
  <router-view v-slot="{ Component }">
    <keep-alive
      exclude="Login,mLogin,findPassword,sign,lookExpert,live,messageDetail"
      include="applyVip,searchOnline,index"
    >
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { useMeta } from "vue-meta";

export default {
  setup() {
    useMeta({
      title: "",
      htmlAttrs: { lang: "en", amp: true }
    });
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["token", "initMid", "logined"])
  },
  watch: {
    uid() {
      this.getUserInfo();
    }
  },
  mounted() {
    this.getUserInfo();
    this.getAiId();
  },
  methods: {
    ...mapMutations([
      "setIsMember",
      "setUserName",
      "setUserAvatar",
      "setAiExpertId",
      "setLogined"
    ]),
    getUserInfo() {
      if (!this.token) {
        return;
      }
      this.$axios
        .fetchPost("Mobile/User/userCenter", {
          token: this.token,
          mId: this.initMid
        })
        .then(res => {
          if (res.data.code == 0) {
            this.setIsMember(res.data.data.ismember);
            this.setUserName(res.data.data.username);
            this.setUserAvatar(res.data.data.avatar);
          }
        });
    },
    getAiId() {
      this.$axios.fetchPost("Mobile/Sysconfig/getAiExpert").then(res => {
        if (res.data.code == 0) {
          this.setAiExpertId(res.data.data);
        }
      });
    }
  }
};
</script>
<style lang="stylus">
#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align left
  background #EBEBEB
  min-height 100%
  position relative
  padding-top 40px
  max-width 640px
  margin 0 auto
body
  background #EBEBEB
</style>
