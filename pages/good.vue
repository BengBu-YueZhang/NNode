<template>
  <div>
    <mu-load-more
      :loaded-all="loadAll"
      :loading="loading"
      @load="get">
      <mu-list textline="two-line">
        <mu-list-item
          avatar
          button
          :ripple="false"
          v-for="(item, index) in list"
          :key="index"
          @click="handleDetail(item.id)">
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
    </mu-load-more>
  </div>
</template>

<script>
import api from '~/api'

export default {
  head () {
    return {
      title: '精华'
    }
  },

  async asyncData (context) {
    try {
      const { data: { data } } = await api.getTopics({
        page: 1,
        tab: 'good',
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
      loadAll: false,
      loading: false,
      filter: {
        page: 1,
        tab: 'good',
        limit: 10
      }
    }
  },

  methods: {
    async get (filter) {
      if (this.loadAll) return
      if (this.loading) return
      this.filter.page += 1
      this.loading = true
      const { data: { data } } = await api.getTopics(this.filter)
      this.list = [...this.list, ...data]
      if (data.length === 0) this.loadAll = true
      setTimeout(() => {
        this.loading = false
      }, 50)
    },

    handleDetail(id) {
      this.$store.dispatch('SET_DETAIL_ID', id)
      this.$router.push({ path: '/detail' })
    }
  }
}
</script>
