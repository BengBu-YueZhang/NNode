<template>
  <mu-list textline="two-line">
    <mu-list-item avatar button :ripple="false" v-for="(item, index) in data" :key="index">
      <mu-list-item-action>
        <mu-avatar>
          <img :src="item.author.avatar_url">
        </mu-avatar>
      </mu-list-item-action>
      <mu-list-item-content>
        <mu-list-item-title>{{item.title}}</mu-list-item-title>
        <mu-list-item-sub-title></mu-list-item-sub-title>
      </mu-list-item-content>
    </mu-list-item>
  </mu-list>
</template>

<script>
import api from '~/api'

export default {
  async asyncData (context) {
    try {
      const { data } = await api.getTopics({
        page: 1,
        tab: 'ask',
        limit: 10,
        mdrender: false
      })
      return data
    } catch (error) {
      context.error()
    }
  }
}
</script>

<style scoped>
</style>
