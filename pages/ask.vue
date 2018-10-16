<template>
  <div>
    <mu-list textline="two-line">
      <mu-list-item avatar button :ripple="false" v-for="(item, index) in list" :key="index">
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
    <mu-flex
      justify-content="center"
      style="margin: 32px 0;">
      <mu-pagination @change="onPageChange" raised :total="1000" :current.sync="current"></mu-pagination>
    </mu-flex>
  </div>
</template>

<script>
import api from '~/api'

export default {
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
      current: 1,
      filter: {
        page: 1,
        tab: 'ask',
        limit: 10
      }
    }
  },

  methods: {
    async get (filter) {
      const { data: { data } } = await api.getTopics(filter)
      this.list = [...data]
    },

    async onPageChange () {
      this.filter = { ...this.filter, page: this.current }
      await this.get(this.filter)
    }
  }
}
</script>
