import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://homestead.test/api'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance