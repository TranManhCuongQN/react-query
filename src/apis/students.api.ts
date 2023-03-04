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

export const getStudent = (id: number | string) => http.get<Student>(`students/${id}`)

// post<Students> quy định kiểu trả về là Student
export const addStudent = (student: Omit<Student, 'id'>) => http.post<Student>('/students', student)

export const updateStudent = (id: number | string, student: Student) => http.put<Student>(`students/${id}`, student)

export const deleteStudent = (id: number | string) => http.delete<{}>(`students/${id}`)
