<template>
  <div id="all">
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" />

    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="输入手机号"
        :rules="[{ required: true, message: '请填写手机号' },
        { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！'}]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' },
        { pattern: /^[a-zA-Z0-9]{8,16}$/, message: '至少输入8位密码！'}]"
      />
      <van-field
        v-model="address"
        name="地址"
        label="地址"
        placeholder="地址"
        :rules="[{ required: true, message: '请填写地址' }]"
      />

      <div style="margin: 15px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      phone: "",
      password: "",
      address: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit(values) {
      const that = this;
      this.$axios.get('http://121.89.164.154:8989/Canteen/DishesList?type=0')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
      // this.$axios
      //   .get("http://121.89.164.154:8989/Canteen/DishesList?type=0", {
      //   })
      //   .then(function(response) {
      //     console.log(response);
      //     console.log(response.data.msg);
      //     if (response.data.msg == "OK") {
      //       that.$router.push({ path: "/test" });
      //     } else {
      //       Dialog.alert({
      //         message: "该手机号已经注册请直接登录"
      //       }).then(() => {
      //         // on close
      //       });
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    }
  }
};
</script>