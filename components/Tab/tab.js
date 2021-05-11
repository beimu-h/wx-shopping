// components/Tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tab:{
      type:Array,
      value:[]
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    acTap(e){
      const {index} = e.currentTarget.dataset;
      // console.log(index);
      // this.triggerEvent("avChange",{index});
      this.triggerEvent("classChange",{index});
    }
  }
})
