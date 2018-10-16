<template>
  <div>
    <mu-tabs
      :value.sync="active"
      class="tabs">
      <mu-tab value="/ask" href="/ask">
        问题
      </mu-tab>
      <mu-tab value="/share" href="/share">
        分享
      </mu-tab>
      <mu-tab value="/good" href="/good">
        精华
      </mu-tab>
    </mu-tabs>
    <section class="container">
      <nuxt/>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 默认
      active: '/ask'
    }
  },

  created () {
    const { fullPath } = this.$route
    switch (fullPath) {
      case '/ask':
        this.active = '/ask'
        break
      case '/share':
        this.active = '/share'
        break
      case '/good':
        this.active = '/good'
        break
    }
  }
}
</script>

<style>
</style>
