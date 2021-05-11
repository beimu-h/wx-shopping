import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待收货",
        isActive:false
      },
      {
        id:3,
        value:"退货/退款",
        isActive:false
      }
    ],
  },

  /**
   * 生命周期函数--监听页面显示
   */
   onShow: function () {
     const token = wx.getStorageSync("token")
     if(!token){
       wx.navigateTo({
         url: '/pages/auth/auth'
       });
       return;
     }
     let pages = getCurrentPages();
    //  console.log(pages);
     let currentPage = pages[pages.length-1]
    //  console.log(currentPage.options);
     let {type} = currentPage.options;
     this.chageClass(type-1);
     this.getOrder(type)
  },

  async getOrder(type){
    const token = wx.getStorageSync("token");
    const head = {Authorization:token}
    const res = await request({url:"/my/orders/all",method:"GET",data:{type},head:head})
    console.log(res);
  },

  chageClass(index){
    let {tab} = JSON.parse(JSON.stringify(this.data))
    // let {tab} = this.data;
    // console.log(tab);
    tab.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tab
    })
  },

  handleclassChange:function(e){
    // console.log(e);
    let {index} = e.detail;
    this.chageClass(index);
  }
  
})