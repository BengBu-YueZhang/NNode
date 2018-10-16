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
    <nuxt/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: '/ask'
    }
  },

  created () {
    console.log(this.$route)
  }
}
</script>

<style>
</style>
