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
          @click="handleDetail">
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
    <!-- <mu-flex
      justify-content="center"
      style="margin: 32px 0;">
      <mu-pagination @change="onPageChange" raised :total="1000" :current.sync="current"></mu-pagination>
    </mu-flex> -->
  </div>
</template>

<script>
import api from '~/api'

export default {
  async asyncData (context) {
    try {
      const { data: { data } } = await api.getTopics({
        page: 1,
        tab: 'good',
        limit: 30,
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
        limit: 30
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
    }
  }
}
</script>
