<template>
    <h2>登入頁面</h2>
            <div class="container">
          <div class="row justify-content-center">
            <h1 class="h3 mb-3 font-weight-normal">
              請先登入
            </h1>
            <div class="col-8">
              <form id="form" class="form-signin" @submit.prevent="login">
                <div class="form-floating mb-3">
                  <input type="email" class="form-control" id="username"
                    placeholder="name@example.com" v-model="user.username" required autofocus>
                  <label for="username">Email address</label>
                </div>
                <div class="form-floating">
                  <input type="password" class="form-control" id="password"
                    placeholder="Password" v-model="user.password" required>
                  <label for="password">Password</label>
                </div>
                <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
                  登入
                </button>
              </form>
            </div>
          </div>
        </div>
</template>

<style>
    html,
    body {
    height: 100%;
    text-align: center;
    }

    body {
    display: flex;
    align-items: center;
    justify-content: center;
    }

    .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    }
</style>

<script>
import axios from 'axios';

const { VITE_URL } = import.meta.env;
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const apiUrl = `${VITE_URL}/admin/signin`;
      axios.post(apiUrl, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `myToken=${token}; expires=${new Date(expired)}; path=/`;
          // 登入完之後就可以做轉址、切換到 admin 的產品列表頁面
          this.$router.push('/admin/products');
        })
        .catch(() => {
          alert('登入失敗');
        });
    },
  },
};
</script>
