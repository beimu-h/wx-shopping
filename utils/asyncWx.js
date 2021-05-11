export const getSetting = () =>{
    return new Promise((resolve,rej)=>{
        wx.getSetting({
            success: (result)=>{
                resolve(result);
            }
        });
    })
}

export const chooseAddress = ()=>{
    return new Promise((resolve,rej)=>{
        wx.chooseAddress({
            success: (result)=>{
                resolve(result)
            }
        });
    })
}

export const showModel = ({content})=>{
    return new Promise((resolve,rej)=>{
        wx.showModal({
            title: '提示删除',
            content: content,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (res) => {
                resolve(res)
            }
          });
    })
}

export const showToast = ({title})=>{
    return new Promise((resolve,rej)=>{
        wx.showToast({
            title:title,
            icon: 'none',
            mask: true,
            success: (res) => {
              resolve(res);
            },
            fail: () => {},
            complete: () => {}
          });
    })
}

export const login = ()=>{
    return new Promise((resolve,rej)=>{
        wx.login({
            timeout:10000,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                rej(err);
            }
        });
          
    })
}