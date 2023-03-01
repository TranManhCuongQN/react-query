import axios, { AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4000/',

      // Xét thời gian timeout nếu quá thời gian này thì cái gọi request nó sẽ bị hủy
      timeout: 10000,

      // Mong muốn nhận kiểu dữ liệu là JSON server
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const http = new Http().instance

export default http
