<template>
  <div>
    <mu-card style="width: 100%; margin: 0 auto; box-shadow: none" v-if="detail.id" :raised="false">
      <mu-card-header :title="detail.author.loginname">
        <mu-avatar slot="avatar">
          <img :src="detail.author.avatar_url">
        </mu-avatar>
      </mu-card-header>
      <mu-card-title
        :title="detail.title"
        :sub-title="moment(detail.last_reply_at).format('YYYY-MM-DD HH:mm:ss')">
      </mu-card-title>
      <mu-card-text>
        <div v-html="detail.content"></div>
      </mu-card-text>
    </mu-card>
    <mu-list>
      <mu-list-item avatar button :ripple="false" v-for="(item, index) in detail.replies" :key="index">
        <mu-list-item-action>
          <mu-avatar>
            <img :src="item.author.avatar_url">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-sub-title>
          <div v-html="item.content">
          </div>
        </mu-list-item-sub-title>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  async fetch ({ store }) {
    const { state: { detailId } } = store
    if (detailId) await store.dispatch('GET_TOPICS_DETAIL')
  },

  created () {
    this.moment = moment
  },

  computed: {
    ...mapState([
      'detail'
    ])
  }
}
</script>
