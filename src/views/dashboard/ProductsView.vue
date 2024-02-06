<template>
    <h2>後台產品列表</h2>
    <div class="container">
            <div class="text-end mt-4">
              <button type="button" class="btn btn-primary" @click="openModal('new')">
                建立新的產品
              </button>
            </div>
            <table class="table mt-4">
              <thead>
                <tr>
                  <th width="120">
                    分類
                  </th>
                  <th>產品名稱</th>
                  <th width="120">
                    原價
                  </th>
                  <th width="120">
                    售價
                  </th>
                  <th width="100">
                    是否啟用
                  </th>
                  <th width="120">
                    編輯
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item) in products" :key="item.id">
                  <td width="150">{{ item.category }}</td>
                  <td width="120">{{ item.title }}</td>
                  <td class="text-end">{{ item.origin_price }}</td>
                  <td class="text-end">{{item.price}}</td>
                  <td>
                    <span v-if="item.is_enabled" class="text-success">啟用</span>
                    <span v-else>未啟用</span>
                  </td>
                  <td>
                    <div class="btn-group">
                      <button type="button" class="btn btn-outline-primary btn-sm"
                       @click="openModal('edit', item)">
                        編輯
                      </button>
                      <button type="button" class="btn btn-outline-danger btn-sm"
                        @click="openModal('delete', item)">
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          <!-- 分頁元件 ( Pagination ) -->
          <!--  props => 使用 v-bind 動態綁定 pagination 變數及 getProducts 方法-->
          <PaginationComponent :pagination="pagination" :get-Products="getProducts">
          </PaginationComponent>
          <!-- 分頁元件(Pagination) -->
        </div>
        <!-- Modal -->
        <MyModal :temp-Product="tempProduct"
        :update-Product="updateProduct" :is-new="isNew" ref="pModal">
        </MyModal>
        <!-- Modal -->
        <!-- 刪除 Modal -->
        <deleteModal :temp-Product="tempProduct"
         :del-Product="delProduct" ref="dModal">
        </deleteModal>
        <!-- 刪除 Modal -->
</template>

<script>
import axios from 'axios';
import PaginationComponent from '../../components/PaginationComponent.vue';
import MyModal from '../../components/MyModal.vue';
import deleteModal from '../../components/deleteModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      pagination: {},
      // isNew 用於判斷當前 Modal 是新增或編輯 Modal
      isNew: false,
      myModal: null,
      deleteModal: null,
      /* tempProduct: {} 裡面還有 imagesUrl: [] 只是預先定義，避免取值出錯，
            如果確定不會出錯，不寫也可以 */
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    // 驗證登入狀態
    checkLogin() {
      const checkLoginUrl = `${VITE_URL}/api/user/check`;
      axios.post(checkLoginUrl)
        .then(() => {
          alert('驗證成功 歡迎光臨 ~');
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.$router.push('/login');
        });
    },
    // 取得產品資料
    // 參數 page = 1 代表的是預設當前頁碼為 1，
    getProducts(page = 1) {
      // products?page=${page} 是用網址參數寫法，將 page 參數帶入，取得當前頁碼
      // https://support.google.com/google-ads/answer/6277564?hl=zh-Hant
      const getProductsUrl = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;
      axios.get(getProductsUrl)
        .then((res) => {
          const { products, pagination } = res.data;
          this.pagination = pagination;
          this.products = products;
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'login.html';
        });
    },
    /* status 用於判斷當前點擊的是 新增/編輯/刪除 btn
          item 代表的是當前點擊的產品資料 */
    openModal(status, item) {
      /* 用 if 判斷，若 status 為 ‘new’
        表示點擊的是新增按鈕，所以清空當前的 tempProduct 內容
        並將 isNew 的值改為 true，最後再開啟 myModal */
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.pModal.showModal();
      } else if (status === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.pModal.showModal();
        /* 若 status 為 ‘edit’，表示點擊到編輯按鈕，
        所以使用展開運算子 `…item` 將當前產品資料傳入 tempProduct，
        再將 isNew 的值改為 false，最後開啟 myModal */
      } else if (status === 'delete') {
        this.tempProduct = item;
        // this.deleteModal.show();
        this.$refs.dModal.showModal();
        /* 若 status 為 ‘delete’，表示點擊到刪除按鈕，
            同樣使用展開運算子將產品資料傳入 tempProduct，
            用意是後續串接刪除 API 時，需要取得該產品的 id，
            最後開啟 deleteModel */
      }
    },
    updateProduct() {
      // 編輯產品
      let updateProductUrl = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
      let http = 'put';
      // 新增產品
      if (this.isNew) {
        updateProductUrl = `${VITE_URL}/api/${VITE_PATH}/admin/product`;
        http = 'post';
      }
      axios[http](updateProductUrl, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          this.getProducts(); // 取得所有產品的函式，重新取得所有產品資料，完成產品更新
          // this.myModal.hide(); // 套用 modal.hide() 方法關閉 model
          this.$refs.pModal.closeModal();
          this.tempProduct = {};
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    delProduct() {
      const delProductUrl = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
      axios.delete(delProductUrl)
        .then((res) => {
          alert(res.data.message);
          // this.deleteModel.hide();
          this.$refs.dModal.closeModal();
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  // 生命週期，在畫面完全生成之後，再來重新擷取動元素
  mounted() {
    // mounted 將 token 取出，並直接設定到 axios 的預設內容中，
    // 這種寫法可以不用在每次發送請求時重複帶入 token 這段
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // 夾帶 token 在 header 中，只要加入一次就可以重複使用
    // https://axios-http.com/zh/docs/config_defaults
    axios.defaults.headers.common.Authorization = token;
    // 觸發確認是否登入
    this.checkLogin();
  },
  components: {
    // 分頁元件
    PaginationComponent,
    // 產品新增 or 編輯元件
    MyModal,
    // // 產品刪除元件
    deleteModal,
  },
};
</script>
