import Vue from 'vue'
import moment from 'moment'

Vue.filter('time', (value, type) => {
  return moment(value).format(type)
})