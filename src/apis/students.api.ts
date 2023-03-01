import { Students } from 'types/students.type'
import http from 'utils/https'

export const getStudents = (page: number, limit: number | string) =>
  // axios trả về data có kiểu là Students
  http.get<Students>('students', {
    params: {
      _page: page,
      _limit: limit
    }
  })
