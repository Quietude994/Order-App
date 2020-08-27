<template>
  <div class="Shops">
    <div>
      <div class="title-box">
        <div class="title">
          <h3>{{shops.name}}</h3>
          <div>
            <van-rate v-model="shops.score" color="#FF9A02" readonly />
            <span>(661)</span>
            <span>月销1000单</span>
          </div>
        </div>
        <div class="collect">
          <van-rate v-model="likeVal" icon="like" void-icon="like-o" count="1" />
          <span>已收藏</span>
        </div>
      </div>
      <div class="message">
        <div>
          <p>起送价</p>
          <p>
            <span>{{shops.minPrice}}</span>元
          </p>
        </div>
        <div>
          <p>商家配送</p>
          <p>
            <span>{{shops.deliveryPrice}}</span>元
          </p>
        </div>
        <div>
          <p>平均配送时间</p>
          <p>
            <span>{{shops.deliveryTime}}</span>分钟
          </p>
        </div>
      </div>
      <div class="activity">
        <h3>活动与公告</h3>
        <p>{{shops.bulletin}}</p>
      </div>
      <div class="discounts">
        <h3>优惠信息</h3>
        <p v-for="(item) in shops.supports" :key="item">
          <van-tag plain type="primary">折</van-tag>
          {{item}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { $seller } from "@/api/apis";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      likeVal: 0,
      shops: {},
    };
  },
  methods: {},
  created() {
    $seller().then((res) => {
      this.shops = res.data.data;
    });
  },
  mounted() {
    new BScroll(document.querySelector(".Shops"),{
      click: true,
    });
  },
};
</script>

<style lang="less" scoped>
.Shops {
  height: 100%;
  overflow: scroll;
  .title-box {
    display: flex;
    justify-content: space-between;
    padding: 40px 20px 20px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    .title {
      h3 {
        color: #111111;
        font-weight: normal;
        font-size: 16px;
        margin-bottom: 10px;
      }
      > div {
        display: flex;
        align-items: center;
        span {
          color: #777777;
          margin-left: 10px;
          font-size: 12px;
        }
      }
    }
    .collect {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        color: #777;
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }
  .message {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    background-color: #fff;
    div {
      width: 30%;
      text-align: center;
      p {
        color: #c9c9c9;
        font-size: 14px;
        margin-bottom: 10px;
        span {
          color: #000;
          font-size: 24px;
        }
      }
    }
  }
  .activity {
    background-color: #fff;
    margin-top: 30px;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    h3 {
      font-weight: normal;
      margin-bottom: 10px;
    }
    p {
      color: #e56947;
      font-size: 14px;
      line-height: 26px;
    }
  }
  .discounts {
    background-color: #fff;
    padding: 20px;
    h3 {
      font-weight: normal;
      margin-bottom: 10px;
    }
    p {
      line-height: 30px;
      .van-tag {
        padding: 2px 5px;
      }
    }
  }
}
</style>