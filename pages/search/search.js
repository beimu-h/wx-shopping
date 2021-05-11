import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isfocuse:false,
    iptValue:""
  },


  // 全局计时器
  timeid:-1,

  // 获取输入框的数据
  getInput(e){
    // console.log(e);
    const {value} = e.detail;
    // 判断合不合法
    if(!value.trim()){
      this.setData({
        goods:[],
        isfocuse:false
      })
      clearTimeout(this.timeid)
      return;
    }
    // 显示按钮
    this.setData({
      isfocuse:true
    })
    // 防抖的实现
    clearTimeout(this.timeid)
    this.timeid = setTimeout(()=>{
      this.getQuery(value)
    },1000)
    // 传递值，发送请求
    
  },

  // 获取数据
  async getQuery(query){
    const res = await request({url:"/goods/qsearch",data:{query}});
    console.log(res);
    let goods = res;
    this.setData({
      goods
    })
  },

  // 取消按钮响应
  quXiao(){
    this.setData({
      iptValue:"",
      goods:[],
      isfocuse:false
    })
  }
})