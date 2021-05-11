import { request } from "../../request/index.js";
import regenerator from "../../lib/runtime/runtime";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    good_list:[]
  },

  // 获取接口数据
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },

  // 页面数据数量
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    this.QueryParams.cid = op.cid;
    this.getgoodsList();
  },

  // 子组件向父组件传值
  handleclassChange:function(e){
    // console.log(e);
    let {index} = e.detail;
    let {tab} = JSON.parse(JSON.stringify(this.data))
    // let {tab} = this.data;
    // console.log(tab);
    tab.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tab
    })
  },

  // 获取商品列表信息
  async getgoodsList(){
    let res = await request({url:'/goods/search',data:this.QueryParams})
    // console.log(res.goods)
    const total = res.total;
    // console.log(this.QueryParams.pagesize)
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    console.log(this.totalPages);
    this.setData({
      // 拼接的数组
      good_list:[...this.data.good_list,...res.goods]
    });
    
    // 请求数据成功后，关闭下拉刷新
    wx.stopPullDownRefresh();
  },
  // 页面触底事件
  onReachBottom(e){
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({ title: '已经到底了呦~'});
    }else{
      // console.log("还有下一页数据");
      this.QueryParams.pagenum++;
      this.getgoodsList();
    }
  },
  // 下拉刷新页面
  onPullDownRefresh(){
    this.setData({
      good_list:[]
    });
    this.QueryParams.pagenum=1;
    this.getgoodsList();
  }
})