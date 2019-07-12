<template>
    <div class="login-container">
        <el-card class="login_box">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-form ref="form" :model="form">
                <el-form-item>
                    <el-input placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入验证码" style="width:260px"></el-input>
                    <el-button style="float:right">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked"></el-checkbox>
                    我已阅读并同意
                    <el-link :underline="false" type="primary">用户协议</el-link>
                    和
                    <el-link :underline="false" type="primary">隐私条款</el-link>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true
    }
  }
}
</script>

<style lang="less">
.login-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url(../../assets/images/login_bg.jpg)
     no-repeat center / cover;
    .login_box {
        width: 450px;
        height: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        img {
            display: block;
            width: 200px;
            margin: 0 auto 15px;
        }
    }
}
.el-checkbox {
    margin-right: 0px;
}
.el-link {
    vertical-align: bottom;
}
</style>
