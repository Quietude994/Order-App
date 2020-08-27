import axios from 'axios';

axios.defaults.baseURL='http://127.0.0.1:5000';

// 商家接口
export const $seller = () => axios.get('/shop/seller');

// 商品数据
export const $goods = () => axios.get('/goods/goods_list');

// 评价
export const $ratings = () => axios.get('/shop/ratings');