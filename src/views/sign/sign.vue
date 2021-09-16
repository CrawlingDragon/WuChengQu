<template>
  <div class="sign-container">
    <Header :indexHeader="false"></Header>
    <div class="title">快速注册</div>
    <van-form @submit="onSubmit2" class="from">
      <van-field
        v-model="username"
        name="phone"
        placeholder="请输入手机号"
        :rules="[{ validator: validatorPhone }, { required: true }]"
      />
      <van-field
        v-model="sms"
        center
        clearable
        name="code"
        placeholder="请输入4位验证码"
        maxlength="4"
        :rules="[{ required: true }]"
      >
        <template #button>
          <div class="btn" v-if="showBtn" @click="start">发送验证码</div>
          <div v-show="!showBtn">
            <van-count-down
              ref="countDown"
              millisecond
              :time="60000"
              :auto-start="false"
              format="ss秒后重试"
              @finish="finish"
            />
          </div>
        </template>
      </van-field>
      <van-field
        v-model="password"
        type="password"
        name="pwd"
        placeholder="请输入密码（6-20位）"
        minlength="6"
        maxlength="20"
        :rules="[{ required: true }]"
      />
      <div style="margin-top:30px;margin-left:16px">
        <Deal v-model:checked="checked"></Deal>
      </div>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="sub"
          :class="{ success: checked && password && username && sms }"
        >
          注册
        </van-button>
      </div>
    </van-form>
    <router-link class="go-login" to="/login"
      >已有益农宝账号，去登录</router-link
    >
  </div>
</template>
<script>
import Header from "@/components/header/header";
import { mapActions } from "vuex";
import { useMeta } from "vue-meta";
import Deal from "@/components/base/deal/deal.vue";
export default {
  name: "sign",
  components: { Header, Deal },
  setup() {
    useMeta({
      title: "注册"
    });
  },
  props: {},
  data() {
    return {
      showBtn: true,
      clickTrue: false,
      username: "",
      sms: "",
      password: "",
      checked: false
    };
  },
  created() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    ...mapActions(["saveUserInfo"]),
    validatorPhone(val) {
      // 验证手机号码
      if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
        this.clickTrue = true;
      } else {
        this.clickTrue = false;
      }
      return /^1(3|4|5|6|7|8|9)\d{9}$/.test(val);
    },
    finish() {
      this.$refs.countDown.reset();
      this.showBtn = true;
      this.clickTrue = true;
    },
    onSubmit2() {
      if (!this.checked) {
        this.$toast("必须先同意用户协议和隐私政策");
        return;
      }
      this.signFn(this.username, this.password, this.sms);
    },
    signFn(username, password, code) {
      this.$axios
        .fetchPost("Mobile/Login/register", { username, password, code })
        .then(res => {
          const data = res.data;
          this.$toast(res.data.message);
          if (data.code == 0) {
            this.saveUserInfo(data.data);
            setTimeout(() => {
              this.$router.push({ path: "/index" });
            }, 500);
          }
        });
    },
    start() {
      if (!this.clickTrue) {
        return;
      }
      this.sendPhone();
    },
    sendPhone() {
      //发送验证码
      this.$axios
        .fetchPost("Mobile/Login/ServerSmsCode", {
          mobile: this.username
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$toast(res.data.message);
            this.clickTrue = false;
            this.showBtn = false;
            setTimeout(() => {
              this.$refs.countDown.start();
            }, 100);
          } else {
            this.$toast(res.data.message);
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.sign-container
  height 100%
  position absolute
  left 0
  right 0
  background #fff
  .title
    font-size 24px
    color #333333
    text-align center
    margin 40px 0
  .from
    width 80%
    margin 0 auto
  .go-login
    margin 15px 0
    text-align center
    color #ff6600
    font-size 15px
  .van-count-down
    color #999
    font-size 13px
.sub
  &.success
    background #ff6600
    color #fff
</style>
