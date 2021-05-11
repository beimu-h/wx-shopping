// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    shounum:0
  },

  onShow(){
    const userinfo = wx.getStorageSync("userInfo");
    // console.log(userinfo);
    const shou = wx.getStorageSync("shou")||[];
    let shounum = shou.length;
    this.setData({
      userinfo,
      shounum
    })
  }
})