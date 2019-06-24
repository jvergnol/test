import {apiDomain} from '../../../config'
import axios from 'axios';
//
let axiosConfig = {
  headers: {
     'Accept': 'application/json',
    'app':'APP_BCK',

  }
}
export default {
  logout () {
    this.clearStorage()
  },
  clearStorage () {
    localStorage.removeItem('token')
  },
  isLoguedIn () {
    return !!localStorage.getItem('token')
  },
  login (user, password) {
      axiosConfig.headers['password'] = password
    return new Promise((resolve, reject) => {
      axios.put(apiDomain + 'user/'+user,{email: user, password: password}, axiosConfig)
        .then((response) => {
          localStorage.setItem('token',response.data.sessionTokenBck);
          localStorage.setItem('email',response.data.email);
          // localStorage.setItem('token', response.data.session.token)
          // localStorage.setItem('date', response.data.session.date)
          // localStorage.setItem('account_type', response.data.session.role)
          // localStorage.setItem('account_id', response.data.session.role_id)
          // localStorage.setItem('user_id', response.data.session.user_id)
          // localStorage.setItem('username', response.data.session.username)
          // let token = localStorage.getItem('token')
          resolve(response)
        })
        .catch((error) => {
          // reject(new Error(error.response))
          reject(error.response)
        })
    })
  },
}
