<template>
  <div id="app">
    <transition :name="transitionName">
      <navigation>
        <router-view class="Router"/>
      </navigation>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: 'demo',
      transitionName: '',
      screenWidth: document.body.clientWidth
    }
  },
  created() {
    this.$navigation.on('forward', (to, from) => {
      this.transitionName = 'slide-left'
      console.log('前进')
    })
    this.$navigation.on('back', (to, from) => {
      this.transitionName = 'slide-right'
      console.log('后退')
    })
    this.$navigation.on('replace', (to, from) => {
      console.log('替换url')
    })
    this.$navigation.on('refresh', (to, from) => {
      console.log('刷新')
    })
    this.$navigation.on('reset', (to, from) => {
      console.log('重置')
    })
    this.remInit()
  },
  methods: {
    remInit() {
      document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.getBoundingClientRect().width / 750 * 625 + '%'
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
      })()
    }
  },
  watch: {
    screenWidth() {
      this.remInit()
    }
  }
}
</script>

<style>
.Router {
  position: absolute;
  width: 100%;
  transition: all 0.3s ease;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-right-enter,
.slide-left-leave-active {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
</style>
