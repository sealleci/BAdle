import { createContext } from 'react'
import type { StudentDataType } from '../types/student'

const DataContext = createContext<StudentDataType>({ 'students': {} } satisfies StudentDataType)

export default DataContext
