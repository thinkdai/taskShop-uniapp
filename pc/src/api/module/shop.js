// 商铺列表
const shopList = params => $Http.get('shop/list', params);
// 创建商铺
const createShop = params => $Http.post('shop/create', params);
// 创建商铺
const updateShop = params => $Http.post('shop/update', params);
// 删除店铺
const deleteShop = id => $Http.get('shop/delete', {id});

module.exports = {
    shopList,
    createShop,
    deleteShop,
    updateShop
};