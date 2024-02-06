<template>
    <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li
                class="page-item"
                :class="{'disabled' : pagination.current_page === 1}"
              >
                <a
                  class="page-link"
                  @click.prevent="getProducts(pagination.current_page - 1)"
                  aria-label="Previous"
                >
                   <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                v-for="(item, index) in pagination.total_pages" :key="index"
                class="page-item"
                :class="{'active':item === pagination.current_page}"
               >
                  <a class="page-link"
                    @click.prevent="getProducts(item)"
                  >{{ item }}
                </a>
              </li>
              <li class="page-item"
                  :class="{'disabled' : pagination.current_page === pagination.total_pages}"
               >
                  <a class="page-link" @click.prevent="getProducts(pagination.current_page + 1)"
                    aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
              </li>
            </ul>
          </nav>
</template>

<script>
export default {
  props: ['pagination', 'getProducts'],
};
</script>
