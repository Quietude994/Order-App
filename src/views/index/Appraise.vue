<template>
    <div class="appraise">
        <div>
            <div class="title">
                <div class="left">
                    <h1>5.0</h1>
                    <p>综合评分</p>
                    <p class="gray">高于周边商家96%</p>
                </div>
                <div class="right">
                    <p>服务态度<van-rate v-model="manner" :size="15"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                    allow-half
                    readonly
                    />
                    <span class="score">{{manner}}</span>
                    </p>
                    <p>菜品质量<van-rate
                    v-model="mass"
                    :size="15"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                    allow-half
                    readonly
                    />
                    <span class="score">{{mass}}</span>
                    </p>
                    <p>送达时间&emsp;<span class="gray">20分钟</span></p>
                </div>
            </div>     
            <div class="main">
                    <van-tabs type="card" color="#FFC300" title-active-color="#000" swipeable v-model="index" @change="changeTab">
                        <van-tab title="全部" name="0" ></van-tab>
                        <van-tab title="满意" name="5"></van-tab>
                        <van-tab title="不满意" name="3.5"></van-tab>
                    </van-tabs>
                <div>
                    <div class="all" v-for="(item) in newList" :key="item.rateTime">
                        <van-image
                        round
                        width="50px"
                        height="50px"
                        :src="item.avatar"
                        />
                        <div class="content">
                            <p class="username"><span>{{item.username}}</span><span>{{item.rateTime}}</span></p>
                            <p>
                                <van-rate v-model="item.score" :size="15"
                                color="#ffd21e"
                                void-icon="star"
                                void-color="#eee"
                                allow-half
                                readonly
                                />
                                <span v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
                            </p>
                            <p>{{item.text}}</p>
                            <div>
                                <van-icon name="good-job-o" color="#FFC300" v-if="item.recommend[0]" />
                                <div>
                                    <van-tag plain color="#D3D3D3" v-for="(items) in item.recommend" :key="items.recommend">{{items}}</van-tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {$ratings} from"@/api/apis";
    import BScroll from 'better-scroll';

    export default {
        data(){
            return{
                manner:4.5,
                mass:4.5,
                scoreList:[],
                newList:[],
                index:'0',
            }
        },
        methods:{
            getDate(val){
                let date = new Date(val);
                date.getHours() <10 ? '0'+date.getHours() :date.getHours();
                date.getMinutes() <10 ? '0'+date.getMinutes() :date.getMinutes();
                date.getSeconds() <10 ? '0'+date.getSeconds() :date.getSeconds();
                return date.getFullYear() +'-'+ (date.getMonth() + 1) +'-'+ date.getDate() + ' '+ date.getHours()+':' +date.getMinutes()+ ':' +date.getSeconds()
            },
            changeTab(){
                switch(this.index){
                    case '5':
                        this.newList = this.scoreList.filter(item =>{
                            if(item.rateType ==0)
                                return item;
                        }) 
                    break;
                    case '3.5':
                        this.newList = this.scoreList.filter(item =>{
                            if(item.rateType == 1)
                                return item;
                        }) 
                    break;
                    case '0':
                        this.newList = [...this.scoreList];
                    break;
                }
                
            }
        },
        created(){
            $ratings().then(res =>{
                res.data.data.forEach(item => {
                    item.rateTime = this.getDate(item.rateTime)
                });
                this.scoreList = res.data.data;
                this.newList = res.data.data;
            })
        },
        mounted(){
            new BScroll(document.querySelector('.appraise'),{
                click: true,
            });
        }
    }
</script>

<style lang="less" scoped>
    .appraise{
        height: 100%;
        overflow: scroll;
        .title{
            display: flex;
            padding: 20px;
            background-color: #fff;
            .gray{
                    color: #E4E4E4;
                    font-size: 12px;
                }
            .left{
                width: 150px;
                text-align: center;
                border-right: 1px solid #ccc;
                h1{
                    color: #F7CC35;
                }
                p{
                    font-size: 14px;
                    margin-top: 5px;
                }
            }
            .right{
                margin-left: 20px;
                p{
                    margin-top: 10px;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    .van-rate{
                        margin: 0 7px;
                    }
                    span{
                        margin-left: 5px;
                    }
                    .score{
                        color: #ffd21e;
                    }
                }
            }
        }
        .main{
            margin-top: 20px;
            padding-top: 10px;
            background-color: #fff;
            .all{
                display: flex;
                margin: 30px 10px 0 10px;
                padding-bottom: 20px;
                border-bottom: 1px solid #ccc;
                overflow: auto;
                .content{
                    flex: 1;
                    margin-left: 5px;
                    >div{
                        display: flex;
                        .van-icon{
                            margin-right: 10px;
                        }
                        .van-tag{
                            margin-right: 5px;
                        }
                    }
                    .username{
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;
                    }
                    .van-rate{
                        margin-right: 10px;
                    }
                    p{
                        margin-bottom: 10px;
                    }
                    
                } 
            }
        }
    }
    
    
</style>