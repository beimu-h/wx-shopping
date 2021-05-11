let ajaxTime = 0;
export const request=(params)=>{
    ajaxTime++;
    return new Promise((resolve,reject)=>{
        // 显示加载图标
        wx.showLoading({
            title: "加载中",
            mask: true
        });
        
        const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1';
        wx.request({
            ...params,
            url:baseURL+params.url,
            success:(result)=>{
                resolve(result.data.message);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTime--;
                if(ajaxTime===0){
                    wx.hideLoading();
                }
                
            }
        }); 
    })
}