// pages/goods_detail/goods_detail.js
import { request } from "../../request/index.js";
import regenerator from "../../lib/runtime/runtime";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo:{},
    isShou:false
  },

  // 预览图片数组
  imgUrl:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages =  getCurrentPages();
    let currentpage = pages[pages.length-1];
    let options = currentpage.options;
    // console.log(currentpage.options);

    const {goods_id} = options;
    // console.log(goods_id)
    this.getdetialInfo(goods_id);
  },

  // 获取数据
  async getdetialInfo(goods_id){
    const goodsInfo = await request({url:'/goods/detail',data:{goods_id}})
    this.imgUrl = goodsInfo;
    // console.log(res);
    // 获取缓存中收藏商品数组
    let shou = wx.getStorageSync("shou") || [];
    let isShou = shou.some(v=>v.goods_id===this.imgUrl.goods_id);
    this.setData({
      goodsInfo:{
        goods_name:goodsInfo.goods_name,
        goods_price:goodsInfo.goods_price,
        goods_introduce:goodsInfo.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsInfo.pics
      },
      isShou
    })
  },
  // 点击轮播图 放大预览
  previewImg(e){
    const urls = this.imgUrl.pics.map(v=>v.pics_big)
    // console.log(e.currentTarget.dataset.url)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    });  
  },

  // 加入购物车
  addCart(){
    // console.log("tianjia");
    // 获取缓存中的信息
    let cart = wx.getStorageSync("cart")||[];
    // 看cart数组中是否存在要添加的信息
    let index = cart.findIndex(v=>v.goods_id===this.imgUrl.goods_id);
    if(index===-1){
      this.imgUrl.num=1;
      this.imgUrl.checked = true;
      cart.push(this.imgUrl);
    }else{
      cart[index].num++;
    }
    // 将信息返回进缓存中
    wx.setStorageSync("cart", cart);
    // 提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // 防止抖动
      mask: true
    });
      
  },

  // 收藏商品
  shouCang(){
    let isShou = false;
    let shou = wx.getStorageSync("shou")||[];
    console.log(shou);
    let index = shou.findIndex(v=>v.goods_id===this.imgUrl.goods_id)
    if(index!==-1){
      // 已经收藏过，再次点击取消收藏
      shou.splice(index,1);
      isShou = false;
      wx.showToast({
        title: '取消收藏~',
        icon: 'none',
        mask: true,
      });   
    }else{
      // 未收藏过，点击收藏
      shou.push(this.imgUrl);
      
      isShou = true;
      wx.showToast({
        title: '收藏成功~',
        icon: 'none',
        mask: true,
      });
    }
    this.setData({
      isShou
    })
    wx.setStorageSync("shou",shou);
  }
})