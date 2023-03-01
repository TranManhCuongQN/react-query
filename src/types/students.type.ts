export interface Student {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: string
  country: string
  avatar: string
  btc_address: string
}

// Để tái sử dụng Student ko cần khai báo những key này sử dụng method Pick typeScript (sẽ lấy ra những key id, email, avatar, last_name)
export type Students = Pick<Student, 'id' | 'email' | 'avatar' | 'last_name'>[]
