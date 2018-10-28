<template>
  <div>
    <mu-card style="width: 100%; margin: 0 auto; box-shadow: none; margin-bottom: 20px;" v-if="detail.id" :raised="false">
      <mu-card-header
        :title="detail.author.loginname"
        :sub-title="moment(detail.last_reply_at).format('YYYY-MM-DD HH:mm:ss')">
        <mu-avatar slot="avatar">
          <img :src="detail.author.avatar_url">
        </mu-avatar>
      </mu-card-header>
      <mu-card-title
        :title="detail.title">
      </mu-card-title>
      <mu-card-text>
        <div v-html="detail.content"></div>
      </mu-card-text>
    </mu-card>
    <div
      v-for="(item, index) in detail.replies"
      :key="index">
      <mu-card style="width: 100%; margin: 0 auto; box-shadow: none; margin-bottom: 20px;" :raised="false">
        <mu-card-header
          :title="item.author.loginname"
          :sub-title="moment(item.create_at).format('YYYY-MM-DD HH:mm:ss')"
        >
          <mu-avatar slot="avatar">
            <img :src="item.author.avatar_url">
          </mu-avatar>
        </mu-card-header>
        <mu-card-text>
          <div v-html="item.content"></div>
        </mu-card-text>
      </mu-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import api from '~/api'

export default {
  async asyncData (context) {
    const { id } = context.params
    try {
      const { data: { data } } = await api.getTopicDetail(id)
      return {
        detail: data
      }
    } catch (error) {
      context.error()
    }
  },

  created () {
    this.moment = moment
  },

  data () {
    return {
      detail: {}
    }
  }
}
</script>
