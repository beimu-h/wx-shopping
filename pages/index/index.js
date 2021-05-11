// 引入 用来发送请求的方法
import { request } from "../../request/index.js";

wx-Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    SwiperList:[],
    // 导航数组
    catesList:[],
    // 楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
    //   success: (result) => {
    //     console.log(result.data.message[0].floor_title)
    //     // this.setData({
    //     //   SwiperList:result.data.message
    //     // })
    //   }
    // });
    // promise优化
    this.getSwiper();
    this.getCates();
    this.getFloor();
  },

  // 获取轮播图的方法
  getSwiper(){
    // promise优化
    request({url:"/home/swiperdata"})
     .then(result=>{
       this.setData({
        SwiperList:result
       })
     })
  },

  // 获取导航栏
  getCates(){
    // promise优化
    request({url:"/home/catitems"})
     .then(result=>{
       this.setData({
        catesList:result
       })
     })
  },

  // 获取楼层
  getFloor(){
    // promise优化
    request({url:"/home/floordata"})
     .then(result=>{
       this.setData({
        floorList:result
       })
     })
  }

})