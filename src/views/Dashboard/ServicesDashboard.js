import {apiDomain} from '../../config'
import axios from 'axios';
//
let axiosConfig = {
  headers: {
     'Accept': 'application/json',
    'app':'APP_BCK',
    'token':localStorage.getItem('token'),
    'adminemail':localStorage.getItem('email')

  }
}
export default {
  getData () {
    let  user = 'contacto@tuten.cl'
      console.log(axiosConfig.headers['token'])
    return new Promise((resolve, reject) => {
      axios.get(apiDomain + 'user/'+user+'/bookings?current=true', axiosConfig)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          // reject(new Error(error.response))
          reject(error.response)
        })
    })
  },
}
