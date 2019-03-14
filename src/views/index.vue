<!--  -->
<template>
<div class='home-page'>
  <component v-bind:is="current[active]"></component>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item icon="search">产品</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {
  components: {
    'home' : () => import('@/views/home/index'),
    'product' : () => import('@/views/product/index')
  },
  data() {
    return {
      active: 0,
      current: ['home', 'product']
    }
  },
  computed: {},
  watch: {},
  methods: {

  },
  created() {},
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
