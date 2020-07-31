import axios from '../utils/proxy-axios'
export default{
     /**
     * 右上角查看当前店铺信息
     * @param {*}
     */
    showShopInfo() {
        return axios({ 
                url: `/app/shop/showShopInfo.do`,
                method: 'get',
            })
    }
}