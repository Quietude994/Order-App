<template>
    <div class="cart">
        <h5>新用户下单立减五元</h5>
        <div class="goodsList">
            <p>
                <span>购物车</span>
                <van-button size="mini" icon="delete" @click="removeCart">清空购物车</van-button>
            </p>
            <div class="lists-box" v-for="item in shoppingCarlist" :key="item.id">
                <p>{{item.name}}</p>
                <span>￥{{(item.price).toFixed(2)}}</span>
                <div class="btn-box"><button @click="changeNum(item.id,-1)">-</button><i>{{item.num}}</i><button style="background-color:#FEC300" @click="changeNum(item.id,1)">+</button></div>
            </div>
        </div>
    </div>
</template>

<script>
     export default {
        methods:{
            changeNum(id,num){
                this.$store.commit('changeNum',{id,num});
            },
            removeCart(){
                this.$store.commit('removeNum');
            }
        },
        computed:{
            shoppingCarlist(){
                return this.$store.getters.cartList;
            },
        }
    }
</script>

<style lang="less" scoped>
    .cart{
        h5{
            height: 40px;
            color: #EA6136;
            text-align: center;
            line-height: 40px;
            background-color: #FEE7C8;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            overflow: hidden;
        }
        .goodsList{
            background-color: #fff;
            min-height: 140px;
            padding: 10px;
            >p{
                display: flex;
                justify-content: space-between;
                .van-button{
                    border: 0;
                }
            }
            .lists-box{
                display: flex;
                margin: 10px 0;
                p{
                    width: 170px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                span{
                    width: 75px;
                    font-size: 20px;
                    margin: 0 10px;
                    color: #FA3402;
                }
                .btn-box{
                    margin: auto;
                    i{
                        font-style: normal;
                        margin: 0 5px;
                        font-size: 16px;
                    }
                    button{
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        border: 0;
                        font-size: 16px;
                        outline: none;
                    }
                }
            }
        }
    }
    
</style>