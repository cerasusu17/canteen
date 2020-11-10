<template>
   <div id="all">
    <div id="nav"></div>
    <van-image round width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 30px;">
        <van-button round block type="info" native-type="submit">登陆</van-button>
      </div>
    </van-form>
    <div id="tab">
      <!-- <router-link to="/forget">忘记密码</router-link>| -->
      <router-link to="/registered">注册</router-link>
    </div>
  </div>
</template>
<style>
#all {
  text-align: center;
}
</style>
<script>
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

export default {
  data() {
    return {
      tel: "",
      text: "",
      digit: "",
      number: "",
      password: ""
    };
  }
};
</script>