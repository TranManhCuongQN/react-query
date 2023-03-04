import { getStudents } from 'apis/students.api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Students as StudentsType } from 'types/students.type'
import { useQuery } from '@tanstack/react-query'
import { useQueyString } from 'utils/utils'
import classNames from 'classnames'

const LIMIT = 10
export default function Students() {
  // const [students, setStudents] = useState<StudentsType>([])
  // const [isLoading, setIsLoading] = useState<boolean>(false)

  // useEffect(() => {
  //   setIsLoading(true)
  //   getStudents(1, 10)
  //     .then((res) => {
  //       setStudents(res.data)
  //     })
  //     .finally(() => {
  //       // khi gọi xong hay gọi lỗi nó đều nhảy vào finally
  //       setIsLoading(false)
  //     })
  // }, [])

  const queryString: { page?: string } = useQueyString()

  // nếu page undefined thì lấy là 1
  const page = Number(queryString.page) || 1
  const { data, isLoading, status, error, fetchStatus, isFetching } = useQuery({
    // phải đặt params vào trong queryKey. Khi đặt vào trong queryKey khi cái params (cụ thể page) thay đổi thì nó sẽ tự động gọi lại function
    queryKey: ['students', page],

    // queryFn nhận vào 1 function, nếu truyền như getStudents(page,10) thì truyền giá trị return của getStudents như thế ko đúng. queryFn nhận vào là 1 cái function nên ta truyền callback ()=>getStudents(page,10)
    queryFn: () => getStudents(page, LIMIT),

    // giữ lại data trước đó ko đc xét undefined (khi mà nó fetch thành công thì nó cập nhật lại data cho chúng ta)
    keepPreviousData: true
  })

  const totalStudentCount = Number(data?.headers['x-total-count'] || 0)
  const totalPage = Math.ceil(totalStudentCount / LIMIT)

  // loading về cái status (status nó đại diện data có hay không). Data có rồi nên loading nó ko load nữa, mà isFetching là true mặc dù data đã có nó vẫn fetch lại API(nó cập nhật dữ liệu mới)
  // console.log('isLoading', isLoading, 'isFetching', isFetching)

  return (
    <div>
      <h1 className='text-lg'>Students</h1>
      <div className='mt-6'>
        {' '}
        <Link
          to='/students/add'
          className=' rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 '
        >
          Add Student
        </Link>
      </div>

      {/* //* sử dụng useEffect() */}
      {/* {isLoading && (
        <>
          <div role='status' className='mt-6 animate-pulse'>
            <div className='mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <span className='sr-only'>Loading...</span>
          </div>
        </>
      )} */}

      {/* {!isLoading && (
        <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='py-3 px-6'>
                  #
                </th>
                <th scope='col' className='py-3 px-6'>
                  Avatar
                </th>
                <th scope='col' className='py-3 px-6'>
                  Name
                </th>
                <th scope='col' className='py-3 px-6'>
                  Email
                </th>
                <th scope='col' className='py-3 px-6'>
                  <span className='sr-only'>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                  key={student.id}
                >
                  <td className='py-4 px-6'>{student.id}</td>
                  <td className='py-4 px-6'>
                    <img src={student.avatar} alt='student' className='h-5 w-5' />
                  </td>
                  <th scope='row' className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
                    {student.last_name}
                  </th>
                  <td className='py-4 px-6'>{student.email}</td>
                  <td className='py-4 px-6 text-right'>
                    <Link
                      to='/students/1'
                      className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'
                    >
                      Edit
                    </Link>
                    <button className='font-medium text-red-600 dark:text-red-500'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}

      {/* //* Sử dụng reactQuery */}
      {isLoading && (
        <>
          <div role='status' className='mt-6 animate-pulse'>
            <div className='mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <span className='sr-only'>Loading...</span>
          </div>
        </>
      )}

      {!isLoading && (
        <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='py-3 px-6'>
                  #
                </th>
                <th scope='col' className='py-3 px-6'>
                  Avatar
                </th>
                <th scope='col' className='py-3 px-6'>
                  Name
                </th>
                <th scope='col' className='py-3 px-6'>
                  Email
                </th>
                <th scope='col' className='py-3 px-6'>
                  <span className='sr-only'>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((student) => (
                <tr
                  className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                  key={student.id}
                >
                  <td className='py-4 px-6'>{student.id}</td>
                  <td className='py-4 px-6'>
                    <img src={student.avatar} alt='student' className='h-5 w-5' />
                  </td>
                  <th scope='row' className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
                    {student.last_name}
                  </th>
                  <td className='py-4 px-6'>{student.email}</td>
                  <td className='py-4 px-6 text-right'>
                    <Link
                      to='/students/1'
                      className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'
                    >
                      Edit
                    </Link>
                    <button className='font-medium text-red-600 dark:text-red-500'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className='mt-6 flex justify-center'>
        <nav aria-label='Page navigation example'>
          <ul className='inline-flex -space-x-px'>
            <li>
              {page === 1 ? (
                // Thẻ span ko thể click đc
                <span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                  Previous
                </span>
              ) : (
                <Link
                  to={`/students?page=${page - 1}`}
                  className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  Previous
                </Link>
              )}
            </li>

            {Array(totalPage)
              .fill(0)
              .map((_, index) => {
                const pageNumber = index + 1
                const isActive = page === pageNumber
                return (
                  <li key={pageNumber}>
                    <Link
                      className={classNames('border border-gray-300   py-2 px-3 leading-tight  hover:text-gray-700', {
                        // Khi có active thì 'bg-gray-100 text-gray-700'
                        'bg-gray-100 text-gray-700': isActive,
                        // Khi không có active thì 'bg-white text-gray-500'
                        'bg-white text-gray-500': !isActive
                      })}
                      to={`/students?page=${pageNumber}`}
                    >
                      {pageNumber}
                    </Link>
                  </li>
                )
              })}

            <li>
              {page === totalPage ? (
                <span className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                  Next
                </span>
              ) : (
                <Link
                  to={`/students?page=${page + 1}`}
                  className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  Next
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
