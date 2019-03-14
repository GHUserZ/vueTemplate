<!-- 主页 -->
<template>
  <div class="index">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in swiperData" :key="index" class="swiperItem">
        <img :src="image.picUrl">
      </van-swipe-item>
    </van-swipe>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryIndexColumns">
      <van-cell v-for="item in list" :key="item.objectId" :title="item.name"/>
    </van-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { queryIndexColumns, queryColumnChildMap } from '@/api/services'
import axios from 'axios'
export default {
  components: {},
  data() {
    return {
      list: [],
      swiperData: [],
      loading: false,
      finished: false
    }
  },
  computed: {
    ...mapState([
      'demo'
    ]),
    ...mapGetters({
      'demo': 'demo'
    })
  },
  watch: {},
  methods: {
    async queryIndexColumns() {
      queryIndexColumns().then(res => {
        this.list = res.data.data
      }).then(() => {
        // 加载状态结束
        this.loading = false;
        this.finished = true;
      })
    },
    async queryColumnChildMap() {
      var parmas = 'kmji5beFAt8z,100!coMU0PQNsbvn,1!q3QrBhqY66fB,1!'
      var fd = new FormData();
      fd.append('params', parmas);
      queryColumnChildMap(fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
        this.swiperData = res.data.data['kmji5beFAt8z'].list
      })
    },
    all() {
      // 执行多个并发请求
      //  axios.all([this.onLoad(),this.onSwiper()]).then((red) =>{
      //    console.log('执行多个并发请求')
      //  })
    }
  },
  created() {
  },
  mounted() {
    this.queryColumnChildMap()
  }
}
</script>

<style lang="scss" scoped>
.index {
  padding-bottom: 50px;
}
</style>
<style scoped>
.index >>> .van-swipe img {
  height: 4rem;
  width: 100%;
}
.index >>> .van-cell {
  font-size: 0.3rem;
  color: #333;
}
.index >>> .van-swipe__indicators {
  bottom: 0.4rem;
}
</style>
