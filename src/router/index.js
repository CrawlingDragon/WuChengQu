import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "index",
    component: () => import(/*webpackChunkName:"index" */ "@/views/index/index")
  },
  {
    path: "/index_online",
    name: "indexOnline",
    component: () =>
      import(
        /*webpackChunkName:"index_online" */ "@/views/index_online/index_online"
      )
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName:'login' */ "@/views/login/login.vue")
  },
  {
    path: "/m_login",
    name: "mLogin",
    component: () =>
      import(/* webpackChunkName:'m_login' */ "@/views/m_login/m_login.vue")
  },
  {
    path: "/sign",
    name: "sign",
    component: () => import(/*webpackChunkName:"sign" */ "@/views/sign/sign")
  },
  {
    path: "/find_password",
    name: "findPassword",
    component: () =>
      import(
        /*webpackChunkName:"find_password" */ "@/views/find_password/find_password"
      )
  },
  {
    path: "/search_online",
    name: "searchOnline",
    component: () =>
      import(
        /*webpackChunkName:"searchOnline" */ "@/views/search_online/search_online"
      )
  },
  {
    path: "/searchOnlineCrop",
    name: "searchOnlineCrop",
    component: () =>
      import(
        /*webpackChunkName:"searchOnlineCrop" */ "@/views/search_online_crop/search_online_crop"
      )
  },
  {
    path: "/hospital",
    name: "hospital",
    component: () =>
      import(/*webpackChunkName:"hospital" */ "@/views/hospital/hospital")
  },
  {
    path: "/into_hospital",
    name: "intoHospital",
    component: () =>
      import(
        /*webpackChunkName:"into_hospital" */ "@/views/into_hospital/into_hospital"
      )
  },
  {
    path: "/hospital_intro",
    name: "hospitalIntro",
    component: () =>
      import(
        /*webpackChunkName:"hospital_intro" */ "@/views/hospital_intro/hospital_intro"
      )
  },
  {
    path: "/search_hospital",
    name: "searchHospital",
    component: () =>
      import(
        /*webpackChunkName:"search_hospital" */ "@/views/search_hospital/search_hospital"
      )
  },
  {
    path: "/hospital_expert",
    name: "hospitalExpert",
    component: () =>
      import(
        /*webpackChunkName:"hospital_expert" */ "@/views/hospital_expert/hospital_expert"
      )
  },
  {
    path: "/hospital_online",
    name: "hospitalOnline",
    component: () =>
      import(
        /*webpackChunkName:"hospital_online" */ "@/views/hospital_online/hospital_online"
      )
  },
  {
    path: "/hospital_message",
    name: "hospitalMessage",
    component: () =>
      import(
        /*webpackChunkName:"hospital_message" */ "@/views/hospital_message/hospital_message"
      )
  },
  {
    path: "/ask",
    name: "ask",
    component: () => import(/*webpackChunkName:"ask" */ "@/views/ask/ask"),
    children: [
      {
        path: "/ask/ask_choose_crop",
        component: () =>
          import(
            /*webpackChunkName:"ask_choose_crop" */ "@/views/ask_choose_crop/ask_choose_crop"
          )
      }
    ]
  },
  {
    path: "/ask_detail",
    name: "askDetail",
    component: () =>
      import(/*webpackChunkName:"ask_detail" */ "@/views/ask_detail/ask_detail")
  },
  {
    path: "/cetu_list",
    name: "cetuList",
    component: () =>
      import(/*webpackChunkName:"cetu_list" */ "@/views/cetu_list/cetu_list")
  },
  {
    path: "/soil_detail",
    name: "soilDetail",
    component: () =>
      import(
        /*webpackChunkName:"soil_detail" */ "@/views/soil_detail/soil_detail"
      )
  },
  {
    path: "/zuozhen_list",
    name: "zuozhenList",
    component: () =>
      import(
        /*webpackChunkName:"zuozhen_list" */ "@/views/zuozhen_list/zuozhen_list"
      )
  },
  {
    path: "/zuozhen_detail",
    name: "zuozhenDetail",
    component: () =>
      import(
        /*webpackChunkName:"zuozhen_detail" */ "@/views/zuozhen_detail/zuozhen_detail"
      )
  },
  {
    path: "/apply_vip",
    name: "applyVip",
    component: () =>
      import(/*webpackChunkName:"apply_vip" */ "@/views/apply_vip/apply_vip"),
    children: [
      {
        path: "/apply_vip/ask_choose_crop",
        component: () =>
          import(
            /*webpackChunkName:"ask_choose_crop" */ "@/views/ask_choose_crop/ask_choose_crop"
          )
      }
    ]
  },
  {
    path: "/apply_vip_succeed",
    name: "applyVipSucceed",
    component: () =>
      import(
        /*webpackChunkName:"apply_vip_succeed" */ "@/views/apply_vip_succeed/apply_vip_succeed"
      )
  },
  {
    path: "/vip",
    name: "vip",
    component: () => import(/*webpackChunkName:"vip" */ "@/views/vip/vip")
  },
  {
    path: "/choose_crop",
    name: "chooseCrop",
    component: () =>
      import(
        /*webpackChunkName:"choose_crop" */ "@/views/choose_crop/choose_crop"
      )
  },
  {
    path: "/good_base",
    name: "goodBase",
    component: () =>
      import(/*webpackChunkName:"good_base" */ "@/views/good_base/good_base")
  },
  {
    path: "/base_detail",
    name: "baseDetail",
    component: () =>
      import(
        /*webpackChunkName:"base_detail" */ "@/views/base_detail/base_detail"
      )
  },
  // {
  //   path: "/base_location",
  //   name: "baseLocation",
  //   component: () =>
  //     import(
  //       /*webpackChunkName:"base_location" */ "@/views/base_location/base_location"
  //     )
  // },

  {
    path: "/message",
    name: "message",
    component: () =>
      import(/*webpackChunkName:"message" */ "@/views/message/message")
  },
  {
    path: "/message_detail",
    name: "messageDetail",
    component: () =>
      import(
        /*webpackChunkName:"message_detail" */ "@/views/message_detail/message_detail"
      )
  },
  {
    path: "/live",
    name: "live",
    component: () => import(/*webpackChunkName:"live" */ "@/views/live/live")
  },
  {
    path: "/live_list",
    name: "liveList",
    component: () =>
      import(/*webpackChunkName:"liveList" */ "@/views/live_list/live_list")
  },
  {
    path: "/expert",
    name: "expert",
    component: () =>
      import(/*webpackChunkName:"expert" */ "@/views/expert/expert")
  },
  {
    path: "/my_homePage",

    component: () =>
      import(/*webpackChunkName:"expert" */ "@/views/expert/expert")
  },
  {
    path: "/expert_crop",
    component: () =>
      import(
        /*webpackChunkName:"expert_crop" */ "@/views/expert_crop/expert_crop"
      )
  },
  {
    path: "/look_expert",
    name: "lookExpert",
    component: () =>
      import(
        /*webpackChunkName:"look_expert" */ "@/views/look_expert/look_expert"
      )
  },
  {
    path: "/expert_registration",
    name: "expertRegistration",
    component: () =>
      import(
        /*webpackChunkName:"expert_registration" */ "@/views/expert_registration/expert_registration"
      )
  },
  {
    path: "/expert_detail",
    name: "expertDetail",
    component: () =>
      import(
        /*webpackChunkName:"expert_detail" */ "@/views/expert_detail/expert_detail"
      )
  },
  {
    path: "/whole_base_list",
    name: "wholeBaseList",
    component: () =>
      import(
        /*webpackChunkName:"whole_base_list" */ "@/views/whole_base_list/whole_base_list"
      )
  },
  {
    path: "/whole_zuozhen_list",
    name: "wholeZuoZhenList",
    component: () =>
      import(
        /*webpackChunkName:"whole_zuozhen_list" */ "@/views/whole_zuozhen_list/whole_zuozhen_list"
      )
  },
  {
    path: "/whole_cetu_list",
    name: "wholeCeTuList",
    component: () =>
      import(
        /*webpackChunkName:"whole_cetu_list" */ "@/views/whole_cetu_list/whole_cetu_list"
      )
  },
  {
    path: "/about_us",
    component: () =>
      import(/* webpackChunkName:"about_us" */ "@/views/about_us/about_us")
  },
  {
    path: "/me",
    name: "me",
    component: () => import(/*webpackChunkName:"me" */ "@/views/me/me")
  },
  {
    path: "/me_edit",
    name: "meEdit",
    component: () =>
      import(/*webpackChunkName:"me_edit" */ "@/views/me_edit/me_edit")
  },
  {
    path: "/me_hospital",
    name: "meHospital",
    component: () =>
      import(
        /*webpackChunkName:"me_hospital" */ "@/views/me_hospital/me_hospital"
      )
  },
  {
    path: "/me_registration",
    name: "meRegistration",
    component: () =>
      import(
        /*webpackChunkName:"me_registration" */ "@/views/me_registration/me_registration"
      )
  },
  {
    path: "/me_answer",
    name: "meAnswer",
    component: () =>
      import(/*webpackChunkName:"me_answer" */ "@/views/me_answer/me_answer")
  },
  {
    path: "/me_base",
    name: "meBase",
    component: () =>
      import(/*webpackChunkName:"me_base" */ "@/views/me_base/me_base")
  },
  {
    path: "/me_homePage",
    name: "meHomePage",
    component: () =>
      import(
        /*webpackChunkName:"me_homePage" */ "@/views/me_homePage/me_homePage"
      )
  },
  {
    path: "/me_attention",
    name: "meAttention",
    component: () =>
      import(
        /*webpackChunkName:"me_attention" */ "@/views/me_attention/me_attention"
      )
  },
  {
    path: "/diseases",
    name: "diseases",
    component: () =>
      import(/*webpackChunkName:"diseases" */ "@/views/diseases/diseases")
  },
  {
    path: "/diseases_detail",
    name: "diseasesDetail",
    component: () =>
      import(
        /*webpackChunkName:"diseases_detail" */ "@/views/diseases_detail/diseases_detail"
      )
  },
  // {
  //   path: "/about_us",
  //   name: "aboutUs",
  //   component: () =>
  //     import(/*webpackChunkName:"about_us" */ "@/views/about_us/about_us")
  // },
  {
    path: "/video_list",
    name: "videoList",
    component: () =>
      import(/*webpackChunkName:"video_list" */ "@/views/video_list/video_list")
  },
  {
    path: "/invite_expert",
    component: () =>
      import(
        /*webpackChunkName:"invite_expert" */ "@/views/invite_expert/invite_expert"
      )
  },
  {
    path: "/video_detail",
    name: "videoDetail",
    component: () =>
      import(
        /*webpackChunkName:"video_detail" */ "@/views/video_detail/video_detail"
      )
  },
  {
    path: "/cropRecord",
    name: "cropRecord",
    component: () =>
      import(
        /* webpackChunkName:"cropRecord" */ "@/views/base_center/crop_record/crop_record"
      )
  },

  {
    path: "/base_edit",
    component: () =>
      import(/* webpackChunkName:"cropRecord" */ "@/views/base_edit/base_edit")
  },
  {
    path: "/base_center",
    name: "base_center",
    component: () =>
      import(
        /*webpackChunkName:"base_center" */ "@/views/base_center/base_center"
      ),
    children: [
      {
        path: "/center",
        component: () =>
          import(
            /* webpackChunkName:"center" */ "@/views/base_center/center/center"
          )
      },
      {
        path: "/baseInfoEdit",
        name: "baseEdit",
        component: () =>
          import(
            /* webpackChunkName:"baseEdit" */ "@/views/base_center/base_info_edit/base_info_edit"
          )
      },
      {
        path: "/cropManagement",
        name: "cropManagement",
        component: () =>
          import(
            /* webpackChunkName:"cropManagement" */ "@/views/base_center/crop_management/crop_management"
          )
      },
      {
        path: "/cropRecord",
        name: "cropRecord",
        component: () =>
          import(
            /* webpackChunkName:"cropRecord" */ "@/views/base_center/crop_record/crop_record"
          )
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not_found",
    component: () =>
      import(/* webpackChunkName:"not-found" */ "@/views/not_found/not_found")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior() {
    // ...
    return { left: 0, top: 0 };
  }
});

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject)
//     return originalPush.call(this, location, onResolve, onReject);
//   return originalPush.call(this, location).catch(err => err);
// };

router.beforeEach((to, from, next) => {
  if (
    to.name == "wholeCeTuList" ||
    to.name == "ask" ||
    to.name == "me" ||
    to.name == "zuozhenList" ||
    to.name == "cetuList" ||
    to.name == "expertRegistration" ||
    to.name == "wholeZuoZhenList" ||
    to.name == "applyVip" ||
    to.name == "me_answer" ||
    to.name == "me_attention" ||
    to.name == "me_base" ||
    to.name == "me_edit" ||
    to.name == "me_homePage" ||
    to.name == "me_hospital" ||
    to.name == "me_registration"
  ) {
    if (store.state.token == "") {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
