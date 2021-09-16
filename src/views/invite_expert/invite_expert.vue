<template>
  <Header :indexHeader="false"></Header>
  <ul class="invite-ul">
    <li
      v-for="item in list"
      :key="item"
      :class="{ 'agree-li': item.agree, 'refuse-li': item.refuse }"
    >
      <div class="time">2020-09-03 12:00</div>
      <div class="mid">
        <van-image class="img" fit="contain" @click="goToCenter"></van-image>
        <div class="name" @click="goToCenter">
          <div class="center-name">
            坎墩运营中心坎墩运营中心坎墩运营中心坎墩运营中心
          </div>
          <div class="small-title">邀请您成为运营中心专家</div>
        </div>
      </div>
      <div class="btns van-hairline--top">
        <div class="btn agree" v-if="item.agree" @click="agree">同意</div>
        <div class="btn refuse" v-if="item.refuse" @click="refuse">拒绝</div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import Header from "@/components/header/header";
import { ref } from "vue";
import { Toast, Dialog } from "vant";
import { useMeta } from "vue-meta";
const list = ref([
  { agree: true, refuse: false },
  { agree: false, refuse: true }
]);
useMeta({
  title: "邀请专家"
});
function agree() {
  Dialog.confirm({
    message: "确定同意xx运营中心的专家邀请吗",
    confirmButtonText: "取消",
    cancelButtonText: "确定"
  })
    .then(() => {
      // on confirm
    })
    .catch(() => {
      // on cancel
      Toast("已同意");
    });
}
function refuse() {
  Dialog.confirm({
    message: "确定拒绝xx运营中心的专家邀请吗",
    confirmButtonText: "取消",
    cancelButtonText: "确定"
  })
    .then(() => {
      // on confirm
    })
    .catch(() => {
      // on cancel
      Toast("已拒绝");
    });
}

function goToCenter() {
  //去到对应的中心
}
</script>

<style lang="stylus" scoped>
.invite-ul
  margin-top 10px
  & > li
    padding 0 12px
    background #fff
    margin-bottom 10px
    &.agree-li,&.refuse-li
      .name
        color #999999 !important
      .agree
        background #B0DF87 !important
      .refuse
        color #fff !important
        background #B8B8B8 !important
        border none !important
    .time
      height 40px
      line-height 40px
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #999999;
    .mid
      display flex
      padding-bottom 15px
      .img
        width 60px
        height 60px
        background: #E5E5E5;
        border-radius: 10px;
        margin-right 10px
      .name
        display flex
        justify-content  center
        color: #333333;
        flex-direction column
        flex 1
        min-width 0
        .center-name
          font-size 19px
        .small-title
          font-size 14px
    .btns
      text-align right
      height 50px
      line-height 50px
      .btn
        display inline-block
        width 80px
        height 30px
        line-height 30px
        vertical-align middle
        text-align center
        border-radius: 4px;
        &.agree
          margin-right 15px
          background $theme-color
          color #fff
        &.refuse
          color #ff6600
          border 1px solid #ff6600
          background #fff
</style>
