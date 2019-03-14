/**vue 扩展指令 */
import config from '@/api/config'
export default {
  install(Vue, options) {
    Vue.directive('updowncolor', (el, binding, vnode, oldVnode) => {
      var flag = binding.value;
      if (flag > 0) {
        el.style.color = config.upColor
      } else if (flag < 0) {
        el.style.color = config.downColor
      } else {
        el.style.color = config.flatColor
      }
    })

    Vue.directive('updowncolor-bg', (el, binding, vnode, oldVnode) => {
      var flag = binding.value;
      if (flag > 0) {
        el.style.backgroundColor = config.upColor
      } else if (flag < 0) {
        el.style.backgroundColor = config.downColor
      } else {
        el.style.backgroundColor = config.flatColor
      }
    })
    // 注册一个全局自定义指令 `v-focus`
    Vue.directive('focus', {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function (el) {
        // 聚焦元素
        el.focus()
      }
    })
    Vue.filter('money', function (value) {
      let val = Number(value);
      if (isNaN(val) || value === null || value === '') {
        return 0.00
      } else {
        return Number(val.toFixed(2));
      }
    });

    Vue.filter('isNull', function (value) {
      if (value === null || value === '') {
        return '--'
      } else {
        return value
      }
    })
    Vue.filter('chngPct', function (value) {
      if (value !== undefined) {
        if (value === null || value === '') {
          return '--';
        } else {
          if (value > 0) {
            return '+' + value.toFixed(2) + '%';
          } else {
            return value.toFixed(2) + '%';
          }
        }
      }
    });
    Vue.filter('formatVolume', function (value) {
      if (value >= 100000000 || value <= -10000000) {
        value = (value / 100000000).toFixed(8)
        value = value.substring(0, value.lastIndexOf('.') + 3) + '亿'
      } else if (value >= 10000 && value < 100000000) {
        value = (value / 10000).toFixed(5)
        value = value.substring(0, value.lastIndexOf('.') + 3) + '万'
      } else {
        value = value.toFixed(2)
      }
      return value
    })
    Vue.filter('timestamp', function (value) {
      var date = new Date(value); // 获取一个时间对象
      date.getFullYear(); // 获取完整的年份(4位,1970)
      // var mon = String(date.getMonth()).length === 1 ? '0' + date.getMonth() : date.getMonth(); // 获取月份(0-11,0代表1月,用的时候记得加上1)
      // var day = String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate(); // 获取日(1-31)
      var hour = String(date.getHours()).length === 1 ? '0' + date.getHours() : date.getHours(); // 获取小时数(0-23)
      var min = String(date.getMinutes()).length === 1 ? '0' + date.getMinutes() : date.getMinutes(); // 获取分钟数(0-59)
      var second = String(date.getSeconds()).length === 1 ? '0' + date.getSeconds() : date.getSeconds(); // 获取秒数(0-59)

      return hour + ':' + min + ':' + second
    })

    Vue.filter('dayTime', function (value) {
      var date = new Date(value); // 获取一个时间对象
      var year = date.getFullYear(); // 获取完整的年份(4位,1970)
      var mon = String(date.getMonth()).length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth(); // 获取月份(0-11,0代表1月,用的时候记得加上1)
      var day = String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate(); // 获取日(1-31)
      var hour = String(date.getHours()).length === 1 ? '0' + date.getHours() : date.getHours(); // 获取小时数(0-23)
      var min = String(date.getMinutes()).length === 1 ? '0' + date.getMinutes() : date.getMinutes(); // 获取分钟数(0-59)
      // var second = String(date.getSeconds()).length === 1 ? '0' + date.getSeconds() : date.getSeconds(); // 获取秒数(0-59)

      return year + '.' + mon + '.' + day + ' ' + hour + ':' + min
    })
  }
}