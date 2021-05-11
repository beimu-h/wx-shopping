import { request } from "../../request/index.js";
import regenerator from "../../lib/runtime/runtime";
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单
    meauList:[],
    // 右侧物品信息
    thingsList:[],
    // 左侧菜单选中索引
    currentIndex:0,
    // 右侧滚动条置顶
    scollTop:0
  },
  cateList:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*清除缓存
    1 看有无本地缓存数据
    2 无缓存，发送新请求
    3 有缓存数据 没过期 就使用旧数据
    */
    let Cates = wx.getStorageSync('cates');
    if(!Cates){
      this.getCates();
    }else{
      // 设置过期时间
      if(Date.now() - Cates.time > 1000*10){
        // console.log("数据过期了，重新发送")      
        this.getCates();
      }else{
        // 使用旧数据
        // console.log("使用旧数据")
        this.Cates = Cates.data;
        let meauList = this.Cates.map(v=>v.cat_name);
        let thingsList = this.Cates[0].children;
        //console.log(this.meauList)
        this.setData({
          meauList,
          thingsList
        })
      }
    }
  },

  // 获取分类信息
  async getCates(){
    // request({
    //   url:'/categories'
    // })
    // .then(result=>{
    //   // console.log(result);
    //   this.cateList = result.data.message;

    //   // 获取本地存储的数据
    //   wx.setStorageSync('cates',{time:Date.now(),data:this.cateList});

    //   // console.log(this.cateList);
    //   let meauList = this.cateList.map(v=>v.cat_name);
    //   let thingsList = this.cateList[0].children;
    //   //console.log(this.meauList)
    //   this.setData({
    //     meauList,
    //     thingsList
    //   })
    // })
    const res = await request({url:'/categories'});
      this.cateList = res;

      // 获取本地存储的数据
      wx.setStorageSync('cates',{time:Date.now(),data:this.cateList});

      // console.log(this.cateList);
      let meauList = this.cateList.map(v=>v.cat_name);
      let thingsList = this.cateList[0].children;
      //console.log(this.meauList)
      this.setData({
        meauList,
        thingsList
      })
  },
  // 左侧菜单点击事件
  dianTap(e){

    let {index} = e.currentTarget.dataset;
    // console.log(currentIndex);
    let thingsList = this.cateList[index].children;
    this.setData({
      currentIndex:index,
      thingsList,
      scollTop:0
    })
  }
})