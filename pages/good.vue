<template>
</template>

<script>
export default {
  async asyncData (context) {
    try {
      const { data } = await api.getTopics({
        page: 1,
        tab: 'good',
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
