import { request } from "../../request/index.js";
import { login,showToast } from "../../utils/asyncWx";
Page({
  async getUserInfo(e){
    // console.log(e);
    // 获取登录信息以及code值
    const {encryptedData,errMsg,iv,rawData,signature} = e.detail;
    const {code} = await login();
    // console.log(code)
    // 发送请求，获取token
    const loginParams = {encryptedData,errMsg,iv,rawData,signature,code}
    // 因无企业id token不能获取到
    // const {token} = await request({url:'/users/wxlogin',data:loginParams,method:'post'});
    let token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";

    // 将token 写入缓存中
    wx.setStorageSync("token", token);

    await showToast({
      title:'获取授权成功,请返回支付',
      
    });

    wx.navigateBack({
      // 1表示返回上一层
      delta: 1
    }); 
    // wx.navigateTo({
    //   url: '/pages/pay/pay'
    // });
      
    // console.log(token);
  }
})