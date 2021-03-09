<template>
  <router-view v-if="isLoginRoute" />
  <MenuSideBar v-else>
    <router-view />
  </MenuSideBar>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import MenuSideBar from "./components/MenuSideBar.vue";
export default {
  components:{
    MenuSideBar
  },
  setup() {
    const route = useRoute()
    console.log('🎈🎈',route.path)
    const isLoginRoute = computed(()=> route.path === '/login')
    return {
      isLoginRoute
    }
  }
}
</script>