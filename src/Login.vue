<template>
  <div class="login">
    <div class="login-con">
      <el-card>
        <el-tabs class="login-tab" v-model="activeName">
          <el-tab-pane label="账号密码登录" name="first">
            <div class="login-view-box form-con">
              <el-form @submit.native.prevent="submitHandler" ref="loginForm" :rules="rules" :model="form">
                <el-form-item prop="userName">
                  <el-input v-model.trim="form.userName" autofocus>
                    <i slot="prefix" class="el-input__icon ion-person"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model.trim="form.password">
                    <i slot="prefix" class="el-input__icon ion-locked"></i>
                  </el-input>
                </el-form-item>
                <el-form-item v-if="needCaptcha" prop="captcha">
                  <div style="clear:both;">
                    <el-input type="text" v-model="form.captcha" style="float:left;width:145px;margin-right:10px;">
                      <template slot="prepend">
                        <i class="ion-android-textsms"></i>
                      </template>
                    </el-input>
                    <div style="display:inline-block;">
                      <img @click="changeCaptcha" :src="captchaUrl" width="100" height="40" alt="captcha" style="float:left;">
                    </div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button :loading="submitting" native-type="submit" type="primary" size="large" :style="{width: '100%'}">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from '@/configs/axios'
import CODE_SUCCESS from '@/constants/response-code'
import { Notification } from 'element-ui'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        userName: '',
        password: '',
        captcha: ''
      },
      // 是否需要验证码
      needCaptcha: false,
      // 验证码路径
      imgUrl: '/images/kaptcha.jpg',
      // 随机数
      random: '',
      rules: {
        userName: [
          { required: true, message: '账号不能为空哦', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        captcha: [
          { required: false, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      activeName: 'first',
      submitting: false
    }
  },
  methods: {
    // 修改随机数
    changeCaptcha() {
      this.random = Math.random()
    },
    submitHandler() {
      if(this.submitting) {
        return false
      }
      this.submitting = true
      this.$refs.loginForm.validate((valid) => {
        if(valid) {
          let data = {
            ...this.form,
            username: this.form.userName
          }
          axios.post('/api/adm/account/login', data).then((res) => {
            if(res.data.code === CODE_SUCCESS) {
              window.location = `index.html?_=${new Date().getTime()}/#/dashboard`
            }else if(res.data.code === '2') {
              Notification({
                type: 'error',
                title: '错误',
                message: res.data.message
              })
              this.needCaptcha = true
              this.rules.captcha[0].required = true
            }
          }).finally(() => {
            this.submitting = false
          })
        }
      })
    }
  },
  computed: {
    // 拼接验证码图片地址
    captchaUrl() {
      return `${this.imgUrl}?${this.random}`
    }
  }
}
</script>
