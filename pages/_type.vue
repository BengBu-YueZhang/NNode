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
    <mu-flex justify-content="center" align-items="center" style="margin-bottom: 20px;">
      <mu-button
        color="warning"
        @click="handleMoreClick">
        more
      </mu-button>
    </mu-flex>
  </div>
</template>

<script>
import api from '~/api'

export default {
  async asyncData (context) {
    const { type } = context.params
    try {
      const { data: { data } } = await api.getTopics({
        page: 1,
        tab: type,
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
        tab: this.$route.params.type,
        limit: 10
      }
    }
  },

  watch: {
    '$route' () {
      this.filter.page = 1
    }
  },

  methods: {
    async get (filter) {
      const { data: { data } } = await api.getTopics(this.filter)
      this.list = [...this.list, ...data]
    },

    async handleMoreClick () {
      try {
        this.filter.page += 1
        await this.get(this.filter)
      } catch (error) {
        console.log(error)
      }
    },

    handleShowDetail (id) {
      this.$store.dispatch('SET_DETAIL_ID', id)
      this.$router.push({
        path: `/detail/${id}`
      })
    }
  }
}
</script>
