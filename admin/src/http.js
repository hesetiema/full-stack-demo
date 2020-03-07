import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config;
}, err => {
  return Promise.reject(err);
})

http.interceptors.response.use(res => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  return res;
}, err => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: "error",
      message: err.response.data.message
    })
  }

  if (err.response.status === 401) {
    router.push('/login')
  }

  return Promise.reject(err);
});

export default http