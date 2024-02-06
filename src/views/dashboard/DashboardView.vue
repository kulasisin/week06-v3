<template>
<h2>這是後台</h2>
  <nav>
      <RouterLink to="/admin/products">後台產品列表</RouterLink> |
      <RouterLink to="/admin/order">訂單列表</RouterLink> |
      <RouterLink to="/">回到前台</RouterLink> |
  </nav>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios';

const { VITE_URL } = import.meta.env;
export default {
  methods: {
    checkLogin() {
      const url = `${VITE_URL}/api/user/check`;
      axios.post(url)
        .then(() => {
          alert('驗證成功 歡迎光臨 ~');
        })
        .catch((err) => {
          alert(err.response.data.message);
          // 登入失敗就踢回去 login 頁面
          this.$router.push('/login');
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common.Authorization = token;
    this.checkLogin();
  },
};
</script>
