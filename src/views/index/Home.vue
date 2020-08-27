<template>
  <div class="home">
    <van-sidebar v-model="activeKey" class="left">
      <div>
        <van-sidebar-item v-for="(item) in goodsList" :key="item.name" :title="item.name" @click="clickSidbar"/>
      </div>
    </van-sidebar>
    <div class="right" id="right">
      <div>
        <div v-for="(item,index) in goodsList" :key="item.name" :id="index">
          <h5>{{item.name}}</h5>
          <van-card
            v-for="(items) in item.foods" :key="items.id"
            :price="items.price.toFixed(2)"
            :title="items.goodsDesc"
            :thumb="items.imgUrl"
            origin-price="60.00"
            @click-thumb="clickIMg(items)"
          >
          <template #desc>
            <p class="praise"><span>月销{{items.sellCount}}份</span><span>好评度{{items.rating}}%</span></p>
          </template>
            <template #footer>
              <van-button size="mini" round v-show="items.num >0" @click="changeNum(items.id,-1)">-</van-button>
              <span v-show="items.num > 0">{{items.num}}</span>
              <van-button size="mini" round color="#FEC300" @click="changeNum(items.id,1)">+</van-button>
            </template>
          </van-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { $goods } from "@/api/apis";
  import BScroll from 'better-scroll';

  export default {
    data(){
      return{
        activeKey:'0',
      }
    },
    methods:{
      changeNum(id,num){
        this.$store.commit('changeNum',{id,num});
      },
      clickSidbar(index){
        this.rightScroll.scrollToElement(document.getElementById(index),600)
      },
      clickIMg(items){
        this.$router.push({path:'/detail',query:{msg:JSON.stringify(items)}});
      }
    },
    computed:{
      getArr(){
        let length = this.goodsList.length;
        let arr = [];
        let totle = 0;
        for (let i = 0; i < length; i++) {
          let Height = document.getElementById(i).offsetHeight;
          arr.push({startY:totle, endY:totle+Height, index:i});
          totle = totle+Height;
        }
        return arr;
      },
      goodsList(){
        return this.$store.state.goodsList;
      },
    },
    created(){
        $goods().then( res =>{
         let goodsList = res.data.goodsList.map(item =>{
            for(let obj of item.foods){
              obj.num = 0;
            }
            return item;
          })
          this.$store.commit('initList',goodsList);
        })
    },
    mounted(){
      new BScroll(document.querySelector('.left'),{
        click: true,
      });
      this.rightScroll = new BScroll(document.querySelector('#right'),{
        click: true,
        probeType:3,
      });
      this.rightScroll.on('scroll',obj =>{
        let _y = Math.abs(obj.y);
        
        for(let item of this.getArr){
          if(_y >= item.startY && _y < item.endY){
            this.activeKey = item.index;
            break;
          }
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .home{
    height: 100%;
    display: flex;
    flex: 1;
    .left{
      overflow: auto;
    }
    .right{
      flex: 1;
      overflow: auto;
      h5{
        text-indent: 10px;
        color: #8B8B8B;
        padding: 10px 0;
        margin: 0;
      }
      .van-card{
        background-color: #fff;
      }
      .van-card__title{
        color: #000;
        font-weight: bold;
      }
      .van-card__price{
        color: #F93706;
      }
      .praise{
        span{
          margin-right: 10px;
        }
      }
      .van-card__footer{
        .van-button--mini{
            height: 28px;
            padding: 10px 10px;
            font-size: 20px;
        }
        span{
          font-size: 18px;
          margin: 0 5px;
        }
      }
      
    }
  }
</style>
