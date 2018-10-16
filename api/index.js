import axios from 'axios'

export default {
  async getTopics(params) {
    try {
      return axios.get('https://cnodejs.org/api/v1/topics', {
        params
      })
    } catch (error) {
      throw error
    }
  }
}