<template>
  <div class="login-bg">
    <div class="login__box">
      <div class="login__box--left">
        <el-avatar :src="logo" :size="80" />
      </div>
      <div class="login__box--right">
        <div class="title">
          <span>N-Admin</span>
        </div>
        <el-form
          ref="formRef"
          label-position="top"
          label-width="100px"
          :model="form"
          :rules="rules"
          :show-message="false"
          hide-required-asterisk
          @keyup.enter="login"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" autocomplete="off" show-password />
          </el-form-item>
        </el-form>
        <el-button class="login__btn" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import logo from '@/assets/logo.png'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const form = reactive({
  username: '',
  password: ''
})

const login = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    console.log(valid, fields)
    if (valid) {
      console.log('submit!')
      router.push('/')
    } else {
      ElNotification.warning({
        message: Object.values(fields!)[0][0].message
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.login-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/loginBg.jpeg') no-repeat center/cover fixed;

  .login__box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 600px;
    height: 350px;
    overflow: hidden;
    border-radius: 20px;

    * {
      z-index: 1;
    }

    .login__box--left {
      display: flex;
      flex: 2;
      align-items: center;
      justify-content: center;
      height: 100%;
      background: #fff;
    }

    .login__box--right {
      position: relative;
      display: flex;
      flex: 5;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0 10%;

      &::before {
        position: absolute;
        z-index: 0;
        display: block;
        width: 100%;
        height: 100%;
        content: '';
        filter: blur(5px);
        box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 30%);
      }

      .title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 30px;
        color: #fff;
      }

      &:deep {
        * {
          color: #fff !important;
        }

        .el-form {
          width: 100%;
        }

        .el-form-item {
          margin-bottom: 20px;
        }

        .el-form-item__label {
          margin-bottom: 0;
        }

        .el-form-item__content {
          &::after {
            width: 100%;
            height: 2px;
            content: '';
            background-color: #fff;
            transition: 0.3s ease;
            transform: scale(0, 1);
          }

          &:has(.is-focus)::after {
            transform: scale(1, 1) !important;
          }
        }

        .el-input__wrapper {
          position: relative;
          display: flex;
          height: 40px;
          padding: 0;
          background-color: transparent;
          border-radius: 0;
          box-shadow: none;

          // 底部生成一个阴影
          box-shadow: inset 0 -1px 0 0 rgba(255, 255, 255, 10%);
        }
      }
    }

    .login__btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      background-color: #015099;
      border: none;
    }
  }
}
</style>
