import axios from 'axios'

// 服务器IP
const IP = 'http://127.0.0.1:5000';
// 请求基本路径 
axios.defaults.baseURL = IP;
//商品图片上传接口地址
export const PRO_IMG_UPLOAD = IP + '/goods/goods_img_upload';
//获取商品图片地址
export const GET_PRO_IMG = IP + '/upload/imgs/goods_img/';
//上传头像
export const USER_IMG_UPLOAD = IP + '/users/avatar_upload';
//店铺修改图片
export const STORE_IMG_UPLOAD = IP + '/shop/upload';
//店铺头像
export const GET_STORE_IMG = IP + '/upload/shop/';







//登录api
//account：账号
//password：密码
// export function login(account, password) {
//     return axios.post('/users/checkLogin', {
//         account,
//         password
//     })
// }

export const login = (account, password) => axios.post('/users/checkLogin', {
    account,
    password
});

//验证token   token：用户令牌
export const istoken = (token) => axios.get('/users/checktoken', { params: { token } });

//添加账号
export const userAdd = (account, password, userGroup) => axios.post('/users/add', { account, password, userGroup });

//获取账号
export const accList = (currentPage, pageSize) => axios.get('/users/list', { params: { currentPage, pageSize } });

//删除账号
export const delAcc = (id) => axios.get('/users/del', { params: { id } });

//批量删除
export const delAll = (ids) => axios.get('/users/batchdel', { params: { ids } });

//修改账号
export const changeAcc = (params) => axios.post('/users/edit', params);

// 验证旧密码
export const oldPwd = (id, oldPwd) => axios.get('/users/checkoldpwd', { params: { id, oldPwd } });

//修改密码
export const newPwd = (id, newPwd) => axios.post('/users/editpwd', { id, newPwd });

//获取个人账号信息
export const per = (id, ) => axios.get('/users/accountinfo', { params: { id } });

//获取分类
export const goodList = (currentPage, pageSize) => axios.get('/goods/catelist', { params: { currentPage, pageSize } });

//添加分类
export const addGood = (cateName, state) => axios.post('/goods/addcate', { cateName, state });

//删除分类
export const delGood = (id) => axios.get('/goods/delcate', { params: { id } });

//修改分类
export const newType = (id, cateName, state) => axios.post('/goods/editcate', { id, cateName, state });

//获取商品列表
export const proList = (currentPage, pageSize) => axios.get('/goods/list', { params: { currentPage, pageSize } });

//删除商品
export const delPro = (id) => axios.get('/goods/del', { params: { id } });

//添加商品
export const addPro = (name, category, price, imgUrl, goodsDesc) => axios.post('/goods/add', { name, category, price, imgUrl, goodsDesc });

//获取所有分类
export const styleList = () => axios.get('/goods/categories');

//修改商品
export const modPro = (params) => axios.post('/goods/edit', params);

//获取订单列表
// export const ordList = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/list', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } });
export const ordList = (params) => axios.get('/order/list', { params });

//查询订单
export const ordOne = (currentPage, pageSize, orderNo, consignee, phone, orderState) => axios.get('/order/search', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState } });

//查看订单详情
export const ordMsg = (id) => axios.get('/order/detail', { params: { id } });

//编辑订单
export const ordMod = (params) => axios.post('/order/edit', params);

//获取店铺
export const storeList = () => axios.get('/shop/info');


// 修改店铺
export const modStore = (params) => axios.post('/shop/edit', params);




//首页echarts
export const index = () => axios.get('/order/totaldata');

//订单echarts
export const orderEcharts = (date) => axios.get('/order/ordertotal', { params: { date } });