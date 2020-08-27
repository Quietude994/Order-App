<template>
  <div id="app">
    <!-- 头部 -->
    <div class="Top">
      <div class="content">
        <img :src="shopList.avatar" v-if="shopList.avatar" />
        <div class="right">
          <h3>
            <span class="brand">品牌</span>
            <span>{{shopList.name}}</span>
          </h3>
          <p>{{shopList.description}}/{{shopList.deliveryTime}}分钟送达</p>
          <p class="supports">
            <span class="classify" v-if="shopList.supports">
              <i>减</i>
              {{shopList.supports.join('')}}
            </span>
            <button v-if="shopList.supports" @click="show = true">{{shopList.supports.length}}个 ></button>
            <!-- 店铺详情 -->
            <van-overlay :show="show" @click="show = false">
              <div class="block" @click="show = false">
                <div class="title">
                  <h2>{{shopList.name}}</h2>
                  <van-rate
                    v-model="rate"
                    :size="25"
                    color="#FF9A02"
                    void-icon="star"
                    void-color="#eee"
                    readonly
                  />
                </div>
                <van-divider>优惠信息</van-divider>
                <div class="discounts">
                  <p v-for="(item) in shopList.supports" :key="item">
                    <van-tag plain type="primary">折</van-tag>
                    {{item}}
                  </p>
                </div>
                <van-divider>商家公告</van-divider>
                <div>
                  <p>{{shopList.bulletin}}</p>
                </div>
              </div>
            </van-overlay>
          </p>
        </div>
      </div>
      <van-notice-bar
        left-icon="volume-o"
        :text="shopList.bulletin"
        background="rgba(0,0,0,.8)"
        color="#fff"
      />
    </div>
    <van-tabs v-model="active">
      <van-tab title="商品" name="/Home" to="/Home"></van-tab>
      <van-tab title="评价" name="/Appraise" to="/Appraise"></van-tab>
      <van-tab title="商家" name="/Shops" to="/Shops"></van-tab>
    </van-tabs>
    <!-- 主体 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 尾部 -->
    <div class="footer">
      <div class="shoppingCar" @click="isShow = totalPrice.sum > 0 ? !isShow :false" :style="{background:totalPrice.sum > 0 ?'#ffd161' :'#ccc'}">
        <van-icon name="shopping-cart" :badge="totalPrice.sum > 0 ? totalPrice.sum : null " />
      </div>
      <div class="price-box">
        <p class="price">
          ¥ <span>{{totalPrice.totalPrice}}</span>
        </p>
        <p class="delivery">另需配送费¥{{shopList.deliveryPrice}}</p>
      </div>
      <button>去结算</button>
    </div>
    <van-popup v-model="isShow" round position="bottom">
        <shoppingCar />
    </van-popup>
  </div>
</template>

<script>
import { $seller } from "@/api/apis";
import shoppingCar from "@/views/index/shoppingCart";

export default {
  components: {
    shoppingCar,
  },
  data() {
    return {
      shopList: "",
      show: false,
      rate: 5,
      active: "/Home",
      isShow: false,
    };
  },
  created() {
    $seller().then((res) => {
      this.shopList = res.data.data;
    });
    this.active = this.$route.name;
  },
  computed:{
    totalPrice(){
        let sum = 0;
        let totalPrice = 0;
        for(let item of this.$store.getters.cartList){
            totalPrice += item.num*item.price;
            sum +=  item.num;
        }
        return {sum,totalPrice:totalPrice.toFixed(2)};
    }
  },
  watch:{
    $route(to) {
      this.active = to.path;
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f4f5f7;
}
.Top {
  height: 186px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px 0 15px;
    margin: 20px 0;
  }
  img {
    width: 100px;
    margin-right: 10px;
  }
  .right {
    h3,
    p {
      margin-bottom: 5px;
    }
    .brand {
      display: inline-block;
      background-color: #f01414;
      font-size: 14px;
      padding: 1px 4px;
      margin-right: 10px;
    }
    .supports {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .classify {
        width: 150px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        i {
          font-style: normal;
          color: #f47b7c;
          background-color: #fff;
          padding: 2px;
          margin-right: 10px;
        }
      }
      button {
        background-color: rgba(0, 0, 0, 0.6);
        width: 70px;
        height: 45px;
        border-radius: 30px;
        margin-left: 10px;
        outline: none;
        border: 0;
      }
    }
  }
}
.block {
  padding: 20px;
  .title {
    width: 230px;
    margin: 50px auto;
    h2 {
      font-weight: normal;
      margin-bottom: 10px;
    }
    /deep/.van-rate__item:not(:last-child) {
      padding-right: 20px;
    }
  }
  .van-divider {
    color: #fff;
    font-size: 20px;
  }
  .discounts {
    padding: 20px 0;
    p {
      margin-bottom: 20px;
    }
  }
}
.main {
  flex: 1;
  overflow: hidden;
}
.footer {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: #3b3b3c;
  z-index: 3000;
  .shoppingCar {
    width: 30px;
    height: 30px;
    padding: 10px;
    border-radius: 50%;
    position: relative;
    top: -10px;
    margin: 0 10px;
    text-align: center;
    .van-icon {
      font-size: 30px;
    }
  }
  .price-box {
    flex: 1;
    .price {
      color: #fff;
      span {
        font-size: 24px;
        margin-left: 5px;
      }
    }
    .delivery {
      font-size: 12px;
      color: #999;
    }
  }
  button {
    height: 50px;
    padding: 0 30px;
    background-color: #f8c74e;
    border: 0;
    outline: 0;
  }
}
.van-popup--bottom{
  bottom: 50px;
}
</style>