import { Flex } from '@radix-ui/themes'
import LeftAside from './components/LeftAside'
import Stage from './components/Stage'
import SearchStudentList from './components/SearchStudentList'
import { SelectContext, SelectStore } from './stores/select.ts'
import type { StudentDataType } from './types/student.ts'
import '@radix-ui/themes/styles.css'
import './sass/App.scss'
import studentData from './assets/data/students.json'

function App() {

  return (
    <SelectContext.Provider value={new SelectStore()}>
      <Flex
        direction={'row'}
        as='div'
        gap='0'
        justify={'between'}
        height={'100%'}
        width={'100%'}>
        <LeftAside />
        <Stage studentData={studentData as StudentDataType} />
        <SearchStudentList studentData={studentData as StudentDataType} />
      </Flex>
    </SelectContext.Provider>
  )
}

export default App
