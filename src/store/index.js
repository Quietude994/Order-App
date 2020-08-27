import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        goodsList:[],
    },
    mutations:{
        initList(state,obj){
            state.goodsList = obj;
        },
        changeNum(state,obj){
            for(let item of state.goodsList){
                for(let child of item.foods){
                    if(child.id == obj.id){
                        child.num += obj.num;
                        return;
                    }
                }
            }
        },
        removeNum(state){
            for(let item of state.goodsList){
                for(let child of item.foods){
                    child.num = 0;
                }
            }
        }
    },
    getters:{
        cartList(state){
            let arr =[];
            for(let item of state.goodsList){
                for(let child of item.foods){
                    if(child.num > 0){
                        arr.push(child);
                    }
                }
            }
            return arr;
        },
    }
})