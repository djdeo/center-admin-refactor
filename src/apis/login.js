import request from "../axios";

const userApi = {
  Login: "/user/login",
  Logout: "/user/logout",
  UserInfo: "/user/info",
  UserMenu: "/user/nav",
  updateMobile: "/user/updateMobile",
  updateName: "/user/updateName",
  SendSms: "/user/sendVCode",
  updatePassword: "/user/updatePassword",
  forget: "/user/forgetPassword",
};

// login
export const loginUser = (params) =>
  request({
    url: userApi.Login,
    method: "post",
    data: params,
  });
