<template>

    <div id="orderform">  
        <van-nav-bar title="确认订单" left-arrow @click-left="$router.go(-1)"/>
        
        <div v-for="mesg in order" :key="mesg" style="margin:2%; padding:2%; text-align:left; line-height:25px; border:1px solid rgb(187,187,187); border-radius:10px">
            <div style="margin:0 0 3% 0; font-size:20px; width:50%; text-align:center">外卖配送</div>
            <div v-if="mesg.address"><van-icon name="location-o" />&nbsp;{{mesg.address}}</div>
            <div v-if="mesg.name,mesg.phone"><van-icon name="contact" />&nbsp;{{mesg.name}}&nbsp;{{mesg.phone}}</div>

            <van-cell is-link title="预计送达时间" :value="methtime" @click="showtime = true"/>
            <van-action-sheet v-model="showtime" :actions="actiontime" @select="onSelecttime" /> 

            <van-cell is-link title="支付方式" :value="methways" @click="showways = true"/>
            <van-action-sheet v-model="showways" :actions="actionways" @select="onSelectways" />
               
        </div>
        <van-button round is-link type="info" style="margin-top:10%; width:66%; font-size: 18px;" @click="Topay">支付 {{this.prices/100}} 元</van-button>
        <van-popup v-model="showpay" position="bottom" :style="{ height: '45%' }">
            <div style="margin-top:5%; font-size:24px; line-height:26px">支付</div>
            <div @click="sucepay" style="margin:3% 25% 8% 25%; border: solid 1px black;height:50%;" >表示指纹支付成功</div>
            <van-button @click="cancelpay" plain round type="warning" style="width:35%; font-size:17px; font-weight:600;">取消付款</van-button>
        </van-popup>

    </div>
</template>

<script type="text/ecmascript-6">
    import storage from "../store/listfucton.js";
    export default {
        data() {
            return {
                prices:0,
                showpay:false,
                activeName:'c',
                methtime:'30min',
                showtime:false,
                actiontime: [{ name: '30min' },{ name: '45min' }, { name: '60min' }],

                methways:'支付宝',
                showways:false,
                actionways: [{ name: '支付宝' }, { name: '花呗' }, { name: '微信' }],

                order:[
                    {
                        address:"浙江工商大学生活区",
                        name:"点餐名",
                        phone:"18758157878",
                    },
                ],
            };
        },
    mounted(){
        this.prices=storage.get("price");
        console.log(this.prices);
    },
    methods: {
        onSelectways(item, value) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.showways = false;
            this.methways = this.actionways[value].name;
        },
        onSelecttime(item, value) {
            this.showtime = false;
            this.methtime = this.actiontime[value].name;
        },

        Topay(){
            this.showpay = true;
        },
        sucepay(){
            this.$router.go(-1);
            this.$store.commit('setactiveName', this.activeName);
            storage.set("activeName",this.activeName);
            this.showpay = false;
            console.log(this.activeName);
            //this.$router.push('/homepage');
            
        },
        cancelpay(){
            this.showpay = false;
        },
  },
    };
</script>