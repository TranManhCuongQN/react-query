import { Students, Student } from 'types/students.type'
import http from 'utils/https'

export const getStudents = (page: number, limit: number | string) =>
  // axios trả về data có kiểu là Students
  http.get<Students>('students', {
    params: {
      _page: page,
      _limit: limit
    }
  })

// post<Students> quy định kiểu trả về là Student
export const addStudent = (student: Omit<Student, 'id'>) => http.post<Student>('/students', student)
