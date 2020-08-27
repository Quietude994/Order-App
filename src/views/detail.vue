<template>
  <div class="detail">
    <div>
      <div class="img-box">
        <van-image width="100%" height="220" :src="dataList.imgUrl" />
        <van-icon name="arrow-left" @click="back" />
      </div>
      <div class="title-box">
        <van-card :price="dataList.price" origin-price="100.00" :title="dataList.name">
          <template #desc>
            <p class="appraise">
              <span>月销{{dataList.sellCount}}份</span>
              <span>好评度{{dataList.rating}}%</span>
            </p>
          </template>
          <template #footer>
            <van-button round icon="shopping-cart">加入购物车</van-button>
          </template>
        </van-card>
      </div>
      <!-- 商品介绍 -->
      <div class="referral-box">
        <h3>商品介绍</h3>
        <p>{{dataList.goodsDesc}}</p>
      </div>
      <!-- 评论 -->
      <div class="discuss-box">
        <van-sticky>
          <van-tabs
            type="card"
            color="#FFC300"
            title-active-color="#000"
            swipeable
            v-model="index"
            @change="changeTab"
          >
            <van-tab title="全部" name="0"></van-tab>
            <van-tab title="满意" name="5"></van-tab>
            <van-tab title="不满意" name="3.5"></van-tab>
          </van-tabs>
          <div>
            <div class="all" v-for="(item) in newList" :key="item.rateTime">
              <van-image round width="50px" height="50px" :src="item.avatar" />
              <div class="content">
                <p class="username">
                  <span>{{item.username}}</span>
                  <span>{{item.rateTime}}</span>
                </p>
                <p>{{item.text}}</p>
              </div>
            </div>
          </div>
        </van-sticky>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  data() {
    return {
      index: "0",
      dataList: {},
      newList: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    changeTab() {
      switch (this.index) {
        case "5":
          this.newList = this.dataList.ratings.filter((item) => {
            if (item.rateType == 0) return item;
          });
          break;
        case "3.5":
          this.newList = this.dataList.ratings.filter((item) => {
            if (item.rateType == 1) return item;
          });
          break;
        case "0":
          this.newList = [...this.dataList.ratings];
          break;
      }
    },
    getDate(val) {
      let date = new Date(val);
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return (
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    },
  },
  created() {
    this.dataList = JSON.parse(this.$route.query.msg);
    this.newList = this.dataList.ratings.map((i) => {
      i.rateTime = this.getDate(i.rateTime);
      return i;
    });
  },
  mounted() {
    new BScroll(document.querySelector(".detail"),{
      click: true,
    });
  },
};
</script>

<style lang="less" scoped>
.detail {
  background-color: #f4f5f7;
  height: 100%;
  .img-box {
    position: relative;
    .van-icon {
      font-size: 22px;
      position: absolute;
      top: 25px;
      left: 20px;
      color: #323233;
    }
  }
  .title-box {
    .van-card {
      background-color: #fff;
      .van-card__title {
        font-weight: bold;
        font-size: 20px;
        line-height: 30px;
      }
      .van-button {
        background-color: #ffc300;
      }
      .appraise {
        color: #a3a3a3;
        margin-top: 15px;
        span {
          margin-right: 10px;
        }
      }
      .van-card__bottom {
        margin-top: 15px;
        .van-card__price {
          color: #f93503;
          font-size: 20px;
          font-weight: bold;
          margin-right: 10px;
          .van-card__price-integer {
            font-size: 20px;
          }
        }
      }
    }
  }
  .referral-box {
    margin-top: 30px;
    padding: 20px;
    background-color: #fff;
    p {
      margin-top: 20px;
      line-height: 30px;
    }
  }
  .discuss-box {
    margin-top: 20px;
    padding-top: 20px;
    background-color: #fff;
  }
  .all {
    display: flex;
    margin: 30px 10px 0 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    overflow: auto;
    .content {
      flex: 1;
      margin-left: 5px;
      > div {
        display: flex;
        .van-icon {
          margin-right: 10px;
        }
        .van-tag {
          margin-right: 5px;
        }
      }
      .username {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .van-rate {
        margin-right: 10px;
      }
      p {
        margin-bottom: 10px;
      }
    }
  }
}
</style>