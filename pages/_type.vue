<template>
  <div>
    <mu-list textline="two-line">
      <mu-list-item
        avatar
        button
        :ripple="false"
        v-for="(item, index) in list" :key="index"
        @click="handleShowDetail(item.id)">
        <mu-list-item-action>
          <mu-avatar>
            <img :src="item.author.avatar_url">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{item.title}}</mu-list-item-title>
          <mu-list-item-sub-title>
            {{item.last_reply_at | time('YYYY-MM-DD HH:mm:ss')}}
          </mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import api from '~/api'

// const types = {
//   '/ask': '问题',
//   '/share': '分享',
//   '/good': '精华'
// }

export default {
  head () {
    return {
      title: `NCNode`
    }
  },

  async asyncData (context) {
    try {
      const { data: { data } } = await api.getTopics({
        page: 1,
        tab: 'ask',
        limit: 10,
        mdrender: false
      })
      return {
        list: data
      }
    } catch (error) {
      context.error()
    }
  },

  data () {
    return {
      list: [],
      filter: {
        page: 1,
        tab: 'ask',
        limit: 10
      }
    }
  },

  methods: {
    async get (filter) {
      const { data: { data } } = await api.getTopics(this.filter)
      this.list = [...this.list, ...data]
    },

    handleShowDetail (id) {
      this.$store.dispatch('SET_DETAIL_ID', id)
      this.$router.push({ path: '/detail' })
    }
  }
}
</script>
