<template>
  <div>
    <van-nav-bar title="菜单" @click-right="showPo()">
      <template #right>
        <van-icon name="add-o" size="25" />
      </template>
    </van-nav-bar>
    <!-- 树形选择 -->
    <van-tree-select height="200vw" :items="items" :main-active-index.sync="active">
      <template #content>
        <!-- 主食菜单 -->
        <div v-if="active===0">
          <van-card
            price="0.2"
            num="1000000"
            desc="一份二两"
            title="米饭"
            :thumb=rice
          >
            <!-- <template #footer>
              <van-button round type="info" size="mini">修改价格</van-button>
              <van-button round type="info" size="mini">修改数量</van-button>
            </template>-->
          </van-card>
        </div>
        <!-- 荤菜列表 -->
        <div v-if="active === 1">
          <van-list
            v-model="HCloading"
            :finished="HCfinished"
            finished-text="没有更多了"
            @load="HConLoad"
          >
            <van-card
              v-for="(item,index) in HClist"
              :key="index"
              :title="item.name"
              :price="item.price"
              :num="item.number"
              :thumb="item.thumb"
            >
              <template #footer>
                <!-- <van-button round type="info" size="mini" @click="ShowPrice(index)">修改价格</van-button> -->
                <van-button round type="info" size="mini" @click="ShowNumber(index)">修改数量</van-button>
                <van-button round type="info" size="mini" @click="DeleteC(index)">删除菜品</van-button>
              </template>
            </van-card>
          </van-list>
        </div>
        <!-- 素菜列表 -->
        <div v-if="active === 2">
          <van-list
            v-model="SCloading"
            :finished="SCfinished"
            finished-text="没有更多了"
            @load="SConLoad"
          >
            <!-- <van-cell v-for="item in HClist" :key="item" :title="item" /> -->
            <van-card
              v-for="(item,index) in SClist"
              :key="index"
              :title="item.name"
              :price="item.price"
              :num="item.number"
              :thumb="item.thumb"
            >
              <template #footer>
                <!-- <van-button round type="info" size="mini" @click="ShowPrice(index)">修改价格</van-button> -->
                <van-button round type="info" size="mini" @click="ShowNumber(index)">修改数量</van-button>
                <van-button round type="info" size="mini" @click="DeleteC(index)">删除菜品</van-button>
              </template>
            </van-card>
          </van-list>
        </div>
        <div v-if="active === 3">
          <van-list v-model="Tloading" :finished="Tfinished" finished-text="没有更多了" @load="TonLoad">
            <!-- <van-cell v-for="item in HClist" :key="item" :title="item" /> -->
            <van-card
              v-for="(item,index) in Tlist"
              :key="index"
              :title="item.name"
              :price="item.price"
              :num="item.number"
              :thumb="item.thumb"
            >
              <template #footer>
                <!-- <van-button round type="info" size="mini" @click="ShowPrice(index)">修改价格</van-button> -->
                <van-button round type="info" size="mini" @click="ShowNumber(index)">修改数量</van-button>
                <van-button round type="info" size="mini" @click="DeleteC(index)">删除菜品</van-button>
              </template>
            </van-card>
          </van-list>
        </div>
      </template>
    </van-tree-select>
    <!-- 底部导航 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/orderlist" icon="comment-o">订单</van-tabbar-item>
      <van-tabbar-item replace to="/menu" icon="shop-collect-o">菜品</van-tabbar-item>
    </van-tabbar>
    <!-- 弹出价格修改 -->
    <van-dialog v-model="showP" title="请输入价格" show-cancel-button @confirm="ChangePrice()">
      <!-- <img src="https://img.yzcdn.cn/vant/apple-3.jpg" /> -->
      <van-cell-group>
        <van-field v-model="valuePrice" placeholder="请输入价格" />
      </van-cell-group>
    </van-dialog>
    <!-- 弹出数量修改 -->
    <van-dialog v-model="ShowNum" title="请输入数量" show-cancel-button @confirm="ChangeNum()">
      <!-- <img src="https://img.yzcdn.cn/vant/apple-3.jpg" /> -->
      <van-cell-group>
        <van-field v-model="valueNum" placeholder="请输入价格" />
      </van-cell-group>
    </van-dialog>
    <!-- 增加菜品弹出层 -->

    <van-popup v-model="showPop" round position="right" :style="{ height: '100%',width:'70%',}">
      <van-row>
        <van-col span="8"></van-col>
        <van-col span="8">
          <van-uploader v-model="fileList" multiple :max-count="1" preview-size="100" />
        </van-col>
        <van-col span="8"></van-col>
      </van-row>

      <!-- <van-uploader v-model="fileList" multiple :max-count="1" /> -->
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
      <van-field v-model="setPrice" placeholder="请输入价格" input-align="center" />
      <van-field v-model="setNum" placeholder="请输入数量" input-align="center" />
      <van-field v-model="setName" placeholder="请输入菜名" input-align="center" />

      <van-button round type="info" size="large" @click="addDishes()">增加菜品</van-button>
    </van-popup>
  </div>
</template>
<style>
</style>
<script>
import storage from "../store/listfucton.js";
import Vue from "vue";
import rice from '../assets/rice2.png';
import pg from '../assets/pg.png';
import cai from '../assets/cai.jpg';
import tang from '../assets/timg.jpg';
import { Dialog } from "vant";
Vue.use(Dialog);
export default {
  data() {
    return {
      cai:cai,
      tang:tang,
      gp:pg,
      rice:rice,
      change_id:0,
      delete_id:0,
      dishes_id:16,
      showPop: false,
      value1: 0,
      option1: [
        { text: "荤菜", value: 0 },
        { text: "素菜", value: 1 },
        { text: "汤粥", value: 2 }
      ],
      setPrice: "",
      setNum: "",
      setName: "",
      setDesc: "",
      //图片
      fileList: [
        // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
        // // Uploader 根据文件后缀来判断是否为图片文件
        // // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: 'https://cloud-image', isImage: true },
      ],
      //index 标记
      index_mark: 0,
      //数量弹出框显示
      ShowNum: false,
      valueNum: 0,

      //价格弹出框显示
      showP: false,
      valuePrice: 0,

      active: 1,
      items: [
        { text: "主食1" },
        { text: "荤菜2" },
        { text: "素菜3" },
        { text: "汤粥面食4" }
      ],
      //荤菜列表
      HCloading: false,
      HCfinished: false,
      HClistnum: 1,
      HClist: [
        {
          name: "糖醋排骨",
          number: 95,
          // desc: "你懂得里脊肉",
          price: "5.0",
          id: 1,
          thumb:pg
        },
        // {
        //   name: "油焖虾",
        //   number: 10,
        //   // desc: "你懂得红烧排骨",
        //   price: "7.0",
        //   id: 3
        // }
      ],
      //素菜列表
      SCloading: false,
      SCfinished: false,
      SClistnum: 1,
      SClist: [
        {
          name: "小青菜",
          number: 8,
          // desc: "你懂得炒青菜",
          price: "2.0",
          id: 2,
          thumb:"https://i.loli.net/2020/11/10/LPzcZ9j2bmukBWD.jpg"
        }
        // {
        //   name: "炒西蓝花",
        //   number: 1000,
        //   desc: "你懂得炒西蓝花",
        //   price: "2.5"
        // }
      ],
      //汤粥列表
      Tloading: false,
      Tfinished: false,
      Tlistnum: 1,
      Tlist: [
        {
          name: "西红柿蛋汤",
          number: 50,
          // desc: "你懂得西红柿蛋汤",
          price: "2.0",
          id:15,
          thumb:tang
        },
        // {
        //   name: "皮蛋瘦肉粥",
        //   number: 1000,
        //   desc: "你懂得皮蛋瘦肉粥",
        //   price: "2.5"
        // }
      ]
    };
  },
  mounted() {
    var list1 = storage.get("HClist");
    if (list1) {
      this.HClist = list1;
      this.HClistnum = storage.get("HClistnum");
    }
    var list2 = storage.get("SClist");
    if (list2) {
      this.SClist = list2;
      this.SClistnum = storage.get("SClistnum");
    }
    var list3 = storage.get("Tlist");
    if (list3) {
      this.Tlist = list3;
      this.Tlistnum = storage.get("Tlistnum");
    }
    var id=storage.get("disher_id");
    if(id){
    this.dishes_id=storage.get("disher_id");
    }
  },
  methods: {
    //荤菜刷新
    HConLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (
          let i = 0;
          i < this.HClistnum && this.HClist.length < this.HClistnum;
          i++
        ) {
          this.HClist.push(this.HClist.length + 1);
        }

        // 加载状态结束
        this.HCloading = false;

        // 数据全部加载完成
        if (this.HClist.length >= this.HClistnum) {
          this.HCfinished = true;
        }
      }, 1000);
    },
    //素菜刷新
    SConLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (
          let i = 0;
          i < this.SClistnum && this.SClist.length < this.SClistnum;
          i++
        ) {
          this.SClist.push(this.SClist.length + 1);
        }

        // 加载状态结束
        this.SCloading = false;

        // 数据全部加载完成
        if (this.SClist.length >= this.SClistnum) {
          this.SCfinished = true;
        }
      }, 1000);
    },
    //汤粥刷新
    TonLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (
          let i = 0;
          i < this.Tlistnum && this.Tlist.length < this.Tlistnum;
          i++
        ) {
          this.Tlist.push(this.Tist.length + 1);
        }

        // 加载状态结束
        this.Tloading = false;

        // 数据全部加载完成
        if (this.Tlist.length >= this.Tlistnum) {
          this.Tfinished = true;
        }
      }, 1000);
    },
    //显示价格修改
    ShowPrice(index) {
      console.log(index);
      this.index_mark = index;
      if (this.active == 1) {
        this.valuePrice = this.HClist[index].price;
      } else if (this.active == 2) {
        this.valuePrice = this.SClist[index].price;
      } else if (this.active == 3) {
        this.valuePrice = this.Tlist[index].price;
      }
      this.showP = true;
    },
    //修改价格
    ChangePrice() {
      if (this.active == 1) {
        this.HClist[this.index_mark].price = this.valuePrice;
        storage.set("HClist", this.HClist);
        this.change_id=this.HClist[this.index_mark].id;
      } else if (this.active == 2) {
        this.SClist[this.index_mark].price = this.valuePrice;
        storage.set("SClist", this.SClist);
        this.change_id=this.SClist[this.index_mark].id;
      } else if (this.active == 3) {
        this.Tlist[this.index_mark].price = this.valuePrice;
        storage.set("Tlist", this.Tlist);
        this.change_id=this.Tlist[this.index_mark].id;    
      }
      this.index_mark = 0;
       this.$axios
        .get("http://121.89.164.154:8989/Canteen/UpdateDishes", {
          params: {
            id:this.change_id,
            number:this.valueNum
          }
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //显示数量修改
    ShowNumber(index) {
      console.log(index);

      this.index_mark = index;
      if (this.active == 1) {
        this.valueNum = this.HClist[index].number;
      } else if (this.active == 2) {
        this.valueNum = this.SClist[index].number;
      } else if (this.active == 3) {
        this.valueNum = this.Tlist[index].number;
      }
      this.ShowNum = true;
    },
    // http://121.89.164.154:8989/Canteen/UpdateDishes?id=1&number=100
    //修改数量
    ChangeNum() {
      if (this.active == 1) {
        this.HClist[this.index_mark].number = this.valueNum;
        storage.set("HClist", this.HClist);
        this.change_id=this.HClist[this.index_mark].id;
      } else if (this.active == 2) {
        this.SClist[this.index_mark].number = this.valueNum;
        storage.set("SClist", this.SClist);
        this.change_id=this.SClist[this.index_mark].id;
      } else if (this.active == 3) {
        this.Tlist[this.index_mark].number = this.valueNum;
        storage.set("Tlist", this.Tlist);
        this.change_id=this.Tlist[this.index_mark].id;
      }
      this.index_mark = 0;
      this.$axios
        .get("http://121.89.164.154:8989/Canteen/UpdateDishes", {
          params: {
            id:this.change_id,
            number:this.valueNum
          }
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    DeleteC(index) {
      if (this.active == 1) {
        this.delete_id=this.HClist[index].id;
        console.log("delete_id"+this.delete_id);
        this.HClist.splice(index, 1);
        this.HClistnum--;
        storage.set("HClist", this.HClist);
        storage.set("HClistnum", this.HClistnum);
        

      } else if (this.active == 2) {
        this.delete_id=this.SClist[index].id;
        console.log("delete_id"+this.delete_id);
        this.SClist.splice(index, 1);
        this.SClistnum--;
        storage.set("SClist", this.SClist);
        storage.set("SClistnum", this.SClistnum);
        
 
      } else if (this.active == 3) {
        this.delete_id=this.Tlist[index].id;
        console.log("delete_id"+this.delete_id);
        this.Tlist.splice(index, 1);
        this.Tlistnum--;
        storage.set("Tlist", this.Tlist);
        storage.set("Tlistnum", this.Tlistnum);
       
      }
      this.$axios
        .get("http://121.89.164.154:8989/Canteen/DeleteDishes", {
          params: {
            id:this.delete_id
          }
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //显示增加弹出层
    showPo() {
      this.showPop = true;
    },
    addDishes() { 
      this.dishes_id++;
      storage.set("disher_id",this.dishes_id);
      this.showPop = false;
      if (this.value1 == 0) {
        this.HClist.push({
          name: this.setName,
          number: this.setNum,
          desc: this.setDesc,
          price: this.setPrice,
          id:this.dishes_id,
          thumb:cai
        });
        this.HClistnum++;
        storage.set("HClist", this.HClist);
        storage.set("HClistnum", this.HClistnum);
      } else if (this.value1 == 1) {
        this.SClist.push({
          name: this.setName,
          number: this.setNum,
          desc: this.setDesc,
          price: this.setPrice,
          id:this.dishes_id,
          thumb:cai
        });
        this.SClistnum++;
        storage.set("SClist", this.SClist);
        storage.set("SClistnum", this.SClistnum);
      } else if (this.value1 == 2) {
        this.Tlist.push({
          name: this.setName,
          number: this.setNum,
          desc: this.setDesc,
          price: this.setPrice,
          id:this.dishes_id,
          thumb:cai
        });
        this.Tlistnum++;
        storage.set("Tlist", this.Tlist);
        storage.set("Tlistnum", this.Tlistnum);
      }
      //     axios.get('/user', {
      //   params: {
      //     ID: 12345
      //   }
      // })
      this.value1++;
      this.$axios
        .get("http://121.89.164.154:8989/Canteen/InsertDishes", {
          params: {
            name: this.setName,
            number: this.setNum,
            price: this.setPrice,
            type: this.value1
          }
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });

      this.setPrice = "";
      this.setNum = "";
      this.setName = "";
      this.setDesc = "";
      this.value1=0;
    }
  }
};
</script>