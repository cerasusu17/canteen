<template>
    <div id="app">
        <div style="width:100%,">
            <van-image
                width="100%"
                height="10rem"
                fit="fill"
                :src="require('../assets/title.png')"
                />
        </div>

        <div>
            <van-tabs v-model="activeName">
                <van-tab title="点餐" name="a">
                    <van-tree-select height="600px" :items="items" :main-active-index.sync="active">
                        <template #content>

                            <div v-if="active === 0" v-for="(dishes,idx) in meat" :key="dishes" style="overflow:hidden; width: 100%; margin-top:3%">
                                <van-image width="100" height="100" style="float:left;" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                                <div class="txt" style="margin-right:1%; text-align:left; float:right; width:59%; line-height:25px">
                                    <div style="" v-if="dishes.name">{{dishes.name}}</div>
                                    <div style="" v-if="dishes.content">{{dishes.content}}</div>
                                    <div style="float:right; margin-right:4%;" v-if="dishes.residue">剩余数量：{{dishes.residue}}</div>

                                    <div style="margin-top:5%; width:100%; overflow:hidden;" v-if="dishes.count,dishes.price">
                                        <div style="float:left; width:60%; ">
                                            <van-icon style="line-height:18px; " name="gold-coin-o" />
                                            {{dishes.price}}
                                        </div>
                                        <div style="margin-right:5%; text-align:center; ">
                                            <van-button round plain type="info" size="mini" style="float:left; margin-top:3%; line-height:18px; height:16px; width:16px" @click="cuts0(idx)">-</van-button>
                                                <span style="text-align:center; ">{{dishes.count}}</span>
                                            <van-button round type="info" size="mini" style="float:right; margin-top:3%; line-height:18px; height:16px; width:16px"  @click="add0(idx)">+</van-button>
                                        </div>
                                    </div>   
                                </div>
                            </div>
           
                            <div v-if="active === 1"  v-for="dishes,idx in vegetable" :key="dishes" style="overflow:hidden; width: 100%; margin-top:3%">
                                <van-image width="100" height="100" style="float:left;" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                                <div class="txt" style="margin-right:1%; text-align:left; float:right; width:59%; line-height:25px">
                                    <div style="" v-if="dishes.name">{{dishes.name}}</div>
                                    <div style="" v-if="dishes.content">{{dishes.content}}</div>
                                    <div style="float:right; margin-right:4%;" v-if="dishes.residue">剩余数量：{{dishes.residue}}</div>

                                    <div style="margin-top:5%; width:100%; overflow:hidden;" v-if="dishes.count,dishes.price">
                                        <div style="float:left; width:60%; ">
                                            <van-icon style="line-height:18px; " name="gold-coin-o" />
                                            {{dishes.price}}
                                        </div>
                                        <div style="margin-right:5%; text-align:center; ">
                                            <van-button round plain type="info" size="mini" style="float:left; margin-top:3%; line-height:18px; height:16px; width:16px" @click="cuts1(idx)">-</van-button>
                                                <span style="text-align:center; ">{{dishes.count}}</span>
                                            <van-button round type="info" size="mini" style="float:right; margin-top:3%; line-height:18px; height:16px; width:16px;" @click="add1(idx)">+</van-button>
                                        </div>
                                    </div>   
                                </div>
                            </div>

                            <div v-if="active === 2" v-for="dishes,idx in soup" :key="dishes" style="overflow:hidden; width: 100%; margin-top:3%">
                                <van-image width="100" height="100" style="float:left;" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                                <div class="txt" style="margin-right:1%; text-align:left; float:right; width:59%; line-height:25px">
                                    <div style="" v-if="dishes.name">{{dishes.name}}</div>
                                    <div style="" v-if="dishes.content">{{dishes.content}}</div>
                                    <div style="float:right; margin-right:4%;" v-if="dishes.residue">剩余数量：{{dishes.residue}}</div>

                                    <div style="margin-top:5%; width:100%; overflow:hidden;" v-if="dishes.count,dishes.price">
                                        <div style="float:left; width:60%; ">
                                            <van-icon style="line-height:18px; " name="gold-coin-o" />
                                            {{dishes.price}}
                                        </div>
                                        <div style="margin-right:5%; text-align:center; ">
                                            <van-button round plain type="info" size="mini" style="float:left; margin-top:3%; line-height:18px; height:16px; width:16px" @click="cuts2(idx)">-</van-button>
                                                <span style="text-align:center; ">{{dishes.count}}</span>
                                            <van-button round type="info" size="mini" style="float:right; margin-top:3%; line-height:18px; height:16px; width:16px" @click="add2(idx)">+</van-button>
                                        </div>
                                    </div>   
                                </div>
                            </div>

                            <div v-if="active === 3" v-for="dishes,idx in rice" :key="dishes" style="overflow:hidden; width: 100%; margin-top:3%">
                                <div class="txt" style="margin-right:1%; text-align:left; float:right; width:59%; line-height:25px">
                                    <div style="" v-if="dishes.name">{{dishes.name}}</div>
                                    <div style="" v-if="dishes.content">{{dishes.content}}</div>
                                    <div style="float:right; margin-right:4%;" v-if="dishes.residue">剩余数量：{{dishes.residue}}</div>

                                    <div style="margin-top:5%; width:100%; overflow:hidden;" v-if="dishes.count,dishes.price">
                                        <div style="float:left; width:60%; ">
                                            <van-icon style="line-height:18px; " name="gold-coin-o" />
                                            {{dishes.price}}
                                        </div>
                                        <div style="margin-right:5%; text-align:center; ">
                                            <van-button round plain type="info" size="mini" style="float:left; margin-top:3%; line-height:18px; height:16px; width:16px" @click="cuts2(idx)">-</van-button>
                                                <span style="text-align:center; ">{{dishes.count}}</span>
                                            <van-button round type="info" size="mini" style="float:right; margin-top:3%; line-height:18px; height:16px; width:16px" @click="add2(idx)">+</van-button>
                                        </div>
                                    </div>   
                                </div>
                                <van-image width="100" height="100" style="float:left;" :src="require('../assets/rice.png')"/>
                            </div>

                        </template>
                    </van-tree-select>

                </van-tab>

                <van-tab title="食堂详情" name="b" style="text-align:left;margin:5%">
                    <p>食堂：行云苑、流水苑</p>
                    <p>营业时间：6:30-8:30, 10:30-13:30, 16:00-18:00</p>
                </van-tab>

                <van-tab title="我的订单" name="c">
                    <div style="margin:5%; width: 90%;">

                        <div style="overflow:hidden; padding:1% 0 1% 0; background-color: #f7f8fa;" v-for="(bill) in bills" :key="bill">
                            <van-image width="100" height="100" style="float:left;" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                            <div class="txt" style="margin:1.5% 0 0 3%; text-align:left; float:left; width:70%; line-height:25px; overflow:hidden;">
                                <div style="" v-if="bill.name">{{bill.name}}</div>
                                <div style="margin:17% 3% 0 0; line-height:18px;" v-if="bill.count,bill.price">
                                    <div style="float:left;"><van-icon style="" name="gold-coin-o" />{{bill.price}}</div>
                                    <div style="float:right;" v-if="bill.count">X{{bill.count}}</div>
                                </div>  
                            </div>
                        </div>
                        <div style="margin-top:5%; text-align:right;">总计：{{total_price/100}}元</div>
                    </div>
                </van-tab>

            </van-tabs>

            <van-submit-bar :price="total_price" button-text="去结算" @submit="Submitbill"/>

        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import storage from "../store/listfucton.js";
    export default {
        data() {
            return {
                activeName:'a',
                active: 0,
                showpop:false,
                total_price:0,

                meat:[
                    {
                        name:"糖醋里脊",
                        content:"详情介绍",
                        count:"0",
                        price:"5.00",
                        residue:"5",
                    },{
                        name:"两个菜",
                        content:"详情介绍",
                        count:"0",
                        price:"4.50",
                        residue:"45",
                    },
                ],vegetable:[
                    {
                        name:"西红柿",
                        content:"详情介绍",
                        count:"0",
                        price:"2.50",
                        residue:"50",
                    },{
                        name:"豆角",
                        content:"详情介绍",
                        count:"0",
                        price:"3.00",
                        residue:"45",
                    },
                ],soup:[
                    {
                        name:"蛋花汤",
                        content:"详情介绍",
                        count:"0",
                        price:"1.50",
                        residue:"50",
                    },{
                        name:"白菜汤",
                        content:"详情介绍",
                        count:"0",
                        price:"2.50",
                        residue:"45",
                    },
                ],rice:[
                    {
                        name:"米饭",
                        content:"甄选优质大米饭",
                        count:"0",
                        price:"0.2",
                        residue:"1500",
                    },
                ],
                items: [{ text: '荤菜' }, { text: '素菜' }, { text: '汤粥' }, { text: '主食' }],
                bills:[{
                    name:'订单里的菜1',
                    price:'5.00',
                    count:'1'
                },{
                    name:'订单里的菜2',
                    price:'4.5',
                    count:'1'
                },{
                    name:'主食',
                    price:'0.4',
                    count:'1'
                },],
            };
        },

        mounted(){
            this.activeName=storage.get("activeName");
            console.log(this.activeName);

            this.$store.commit('setactiveName', 'a');
            storage.set("activeName", 'a');
            console.log(this.activeName);
        },

        methods:{
            Submitbill(){
                if(this.total_price > 0){
                    this.$store.commit('setprices', this.total_price);
                    storage.set("price",this.total_price);
                    this.$router.push('/orderform');
                    console.log("去支付");
                }
                else{
                    console.log("无商品");
                }
            },


            cuts0(idx){
                if(this.meat[idx].count > 0) {
                    this.total_price = this.total_price - this.meat[idx].price * 100;
                    return this.meat[idx].count--;}
            },
            add0(idx){
                if(this.meat[idx].count < this.meat[idx].residue) {
                    this.meat[idx].count++;
                    this.total_price = this.total_price + this.meat[idx].price * 100;}
            },

            cuts1(idx){
                if(this.vegetable[idx].count > 0) {
                    this.total_price = this.total_price - this.vegetable[idx].price * 100;
                    return this.vegetable[idx].count--;}
            },
            add1(idx){
                if(this.vegetable[idx].count < this.vegetable[idx].residue) {
                    this.vegetable[idx].count++;
                    this.total_price = this.total_price + this.vegetable[idx].price * 100;}
            },

            cuts2(idx){
                if(this.soup[idx].count > 0) {
                    this.total_price = this.total_price - this.soup[idx].price * 100;
                    return this.soup[idx].count--;}
            },
            add2(idx){
                if(this.soup[idx].count < this.soup[idx].residue){
                    this.soup[idx].count++;
                    this.total_price = this.total_price + this.soup[idx].price * 100;}
            },
        },

    };
</script>

<style>

</style>