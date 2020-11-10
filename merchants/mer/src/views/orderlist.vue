<template>
  <div>
    <van-nav-bar title="未完成订单" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <!-- <div v-for="(item,index) in longlist" :key="index" @click="changeplanshow(index)"> -->
        <van-card
          v-for="(item,index) in list"
          :key="index"
          :price="item.price"
          :desc="item.desc"
          thumb="https://i.loli.net/2020/11/03/XJT4tZRFS7iuEVb.jpg"
        >
          <!-- thumb="https://img.yzcdn.cn/vant/ipad.jpeg" -->
          <template #title>订单{{item.id}}</template>
          <template #tags>
            手机号:{{item.phone}}
            地址:{{item.address}}
            时间：{{item.time}}
          </template>
          <template #footer>
            <!-- @click="MR_changeplanshow(index)" -->
            <van-button round type="info" size="large" @click="orderfinsh(index)">已完成</van-button>
          </template>
        </van-card>
      </van-list>
    </van-pull-refresh>

    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/orderlist" icon="comment-o">订单</van-tabbar-item>
      <van-tabbar-item replace to="/menu" icon="shop-collect-o">菜品</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<style>
</style>
<script>
import storage from "../store/listfucton.js";
export default {
  data() {
    return {
      detail_list:[],
      detail:"菜:",
      all_list:[
        {
          id:5,
          name:"米饭"
        }
      ],
      listnum: 0,
      test:[],
      list: [
        // {
        //   id:1,
        //   phone: "18758564461",
        //   address: "钱江湾29幢309",
        //   desc: "饭二两 炒青菜 糖醋里脊",
        //   price: "7.5",
        //   time:"123"
        // },
        // {
        //   id:2,
        //   phone: "18758564461",
        //   address: "钱江湾29幢309",
        //   desc: "饭二两 炒青菜 糖醋里脊",
        //   price: "21.5",
        //   time:"123"
        // },
        // {
        //   id:3,
        //   phone: "18758564461",
        //   address: "钱江湾29幢309",
        //   desc: "饭二两 炒青菜 糖醋里脊",
        //   price: "12.5",
        //   time:"124"
        // },
        // { 
        //   id:4,
        //   phone: "18758564461",
        //   address: "钱江湾29幢309",
        //   desc: "饭二两 炒青菜 糖醋里脊",
        //   price: "22.5",
        //   time:"123"
        // }
      ],
      loading: false,
      finished: false,
      refreshing: false,
      listdata: [
        {
          phone: "18958923280",
          address: "钱江湾29幢309",
          desc: "饭二两 炒青菜 糖醋里脊",
          price: "7.5"
        },
        {
          phone: "18958923280",
          address: "钱江湾29幢309",
          desc: "饭二两 炒青菜 糖醋里脊",
          price: "21.5"
        },
        {
          phone: "18958923280",
          address: "钱江湾29幢309",
          desc: "饭二两 炒青菜 糖醋里脊",
          price: "12.5"
        },
        {
          phone: "18958923280",
          address: "钱江湾29幢309",
          desc: "饭二两 炒青菜 糖醋里脊",
          price: "22.5"
        }
      ]
    };
  },

  mounted() {
    this.getorder();
    this.alllist();
    this.onRefresh();
  },
  methods: {


 //获取订单待连接后端
    getorder(){
      const that=this;
    
      this.$axios
        .get("http://121.89.164.154:8989/Canteen/OrderUnfinished")
        .then(function(response) {
          console.log(response);
          // console.log(response.data.length)
          if(response.data.length>1){
            for(let i=0;i<response.data.length;i++){
              that.detail_list=response.data[i].dishes_list;
              console.log("detail_list")
              console.log(that.detail_list)
              that.get_detial();
              that.test.push({
                phone: response.data[i].number,
                address: response.data[i].address,
                desc: that.detail,
                price: response.data[i].price,
                time:response.data[i].time,
                id:response.data[i].id,
              })
              that.detail="菜:";
            }
          }
          console.log(that.test)
          // if(response.data.data)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //遍历获取菜名
    get_detial(){
      for(let i=0;i<this.detail_list.length;i++){
        for(let j=0;j<this.all_list.length;j++){
          if(this.detail_list[i].dishes_id==this.all_list[j].id){
            this.detail=this.detail+this.all_list[j].name+this.detail_list[i].dishes_count+","
          }
        }
      }
      console.log("de"+this.detail);
    },

    alllist(){
      var HC=storage.get("HClist");
      console.log(HC)
      for(let i=0;i<HC.length;i++){
        this.all_list.push({
          id:HC[i].id,
          name:HC[i].name,
        })
      }
      var SC=storage.get("SClist");
      console.log(SC)
      for(let i=0;i<SC.length;i++){
        this.all_list.push({
          id:SC[i].id,
          name:SC[i].name,
        })
      }
      var T=storage.get("Tlist");
      console.log(T)
      for(let i=0;i<T.length;i++){
        this.all_list.push({
          id:T[i].id,
          name:T[i].name,
        })
      }
      console.log("all")
      console.log(this.all_list)
    },
    //刷新订单表
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          // this.b =  JSON.parse(JSON.stringify(this.a))
          //防止双向绑定
          // this.list = JSON.parse(JSON.stringify(this.listdata));
          this.list = JSON.parse(JSON.stringify(this.test));
          this.listnum=this.test.length;
          console.log("cd"+this.listnum)
          this.refreshing = false;
        }
        //  i < this.everylistnum && this.everylist.length < this.everylistnum;
        for (
          let i = 0;
          i < this.listnum && this.list.length < this.listnum;
          i++
        ) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= this.listnum) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.list=[];
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    //完成计划待连接后端
    orderfinsh(index){
      const that=this;
      // this.list[index].price="100";
      // http://121.89.164.154:8989/Canteen/UpdateOrderState?id=7
      this.$axios
        .get("http://121.89.164.154:8989/Canteen/UpdateOrderState", {
          params: {
            id:that.list[index].id,
          }
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
        this.list=[];
        location. reload();
        // this.onRefresh();
    }
  }
};
</script>