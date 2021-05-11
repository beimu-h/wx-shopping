// pages/cart/cart.js
import { getSetting,chooseAddress,showModel,showToast } from "../../utils/asyncWx";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allCheck:false,
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
    
    let cart = wx.getStorageSync("cart")||[];
    // const allCheck = cart.length? cart.every(v=>v.checked):false;
    this.setData({
      address
    })
    this.setCart(cart);
  },

  async hqAddress(){
    // wx.getSetting({
    //   success: (result)=>{
    //     wx.chooseAddress({
    //       success: (result1)=>{
    //         console.log(result1)
    //       }
    //     });
    //   }
    // });
    const res1 = await getSetting();
    const address = await chooseAddress();
    address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
    console.log(address.all)
    wx.setStorageSync("address", address);
    // console.log(res2);
  },

  // 商品的选择状态改变
  itemChange(e){
    // console.log(e.currentTarget.dataset.id);
    const goods_id = e.currentTarget.dataset.id
    // console.log(goods_id);
    const {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);
  },

  // 全选取反操作
  allcheckChage(){
    let {cart,allCheck} = this.data;
    allCheck=!allCheck;
    cart.forEach(v=>v.checked=allCheck);
    this.setCart(cart);
  },

  // 数量改变
  async numChage(e){
    const {id,op} = e.currentTarget.dataset;
    // console.log(id,op);
    const {cart} = this.data;
    const indnex = cart.findIndex(v=>v.goods_id===id);
    if(cart[indnex].num === 1 && op === -1){
      const res = await showModel({content:"是否想要删除此商品~"});
      if(res.confirm){
        cart.splice(indnex,1);
        this.setCart(cart);
      }
    }
    else{
      cart[indnex].num += op;
      this.setCart(cart);
    }
    
    // if(cart[indnex].num<=1){
    //   cart[indnex].num=1;
    //   wx.showToast({
    //     title: '数量已经不能减少了~',
    //     icon: 'none',
    //     mask: true
    //   });
    // }
    
  },

  // 当选中状态改变时 重新计算各种数据
  setCart(cart){

    let allCheck = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }else{
        allCheck = false;
      }
    });
    allCheck = cart.length!=0?allCheck:false;
    this.setData({
      cart,
      allCheck,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart);
  },

  // 结算功能
  async jieSuan(e){
    let {totalNum,address} = this.data;

    if(totalNum===0){
      const res = await showToast({title:"购物车为空~，请前往选购再结算"});
      return;
    }
    else if(totalNum!==0 && !address.userName){
      const res1 = await showToast({title:"收获地址为空，请先获取收货地址"})
      return;
    }
    else{
      wx.navigateTo({
        url: '/pages/pay/pay'
      });
    }
  }
})