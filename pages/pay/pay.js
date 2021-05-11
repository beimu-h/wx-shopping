// pages/cart/cart.js
import { getSetting,chooseAddress,showModel,showToast } from "../../utils/asyncWx";
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow(){
    let address = wx.getStorageSync("address");
    // console.log(address.all)
    let cart = wx.getStorageSync("cart")||[];
    // 过滤
    cart = cart.filter(v=>v.checked);

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    });
    this.setData({
      address,
      cart,
      totalPrice,
      totalNum
    })
  },

  // 支付授权 
  async zhiFu(){
    // 获取 判断有无token
    const token = wx.getStorageSync("token");
    //  console.log(token);
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
      return;
    }
    // 创建订单
    // 请求头参数
    const head = {Authorization:token}
    // 请求体参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address;
    const cart = this.data.cart;
    let goods=[];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.goods_number,
      goods_price:v.goods_price
    }))

    // 请求连接
    const orderParams = {order_price,consignee_addr,goods};
    const res = await request({url:"/my/orders/create",method:"POST",data:orderParams,header:head});
    const ordedrid = 'HMDD20190809000000001059';
    const res1 = await request({url:"/my/orders/req_unifiedorder",method:"POST",data:ordedrid,header:head})
    console.log(res1);
  }

})