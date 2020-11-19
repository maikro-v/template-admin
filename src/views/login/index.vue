<template>
  <div class="login">
    <Form :model="forms" :rules="rules" class="container">
      <div class="title">
        登录
      </div>
      <FormItem prop="username">
        <Input v-model="forms.username" size="large" placeholder="输入用户名" />
      </FormItem>
      <FormItem prop="password">
        <Input v-model="forms.password" size="large" type="password" placeholder="输入密码" />
      </FormItem>
      <FormItem>
        <Button type="primary" size="large" long>登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forms: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "index";
</style>
