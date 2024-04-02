import { createContext } from 'react'
import type { StudentDataType } from '../types/student'

export default createContext<StudentDataType>({ 'students': {} })
