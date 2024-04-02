import { Flex } from '@radix-ui/themes'
import DataContext from './contexts/data.ts'
import type { StudentDataType } from './types/student.ts'
import LeftAside from './components/LeftAside'
import Stage from './components/Stage'
import RightAside from './components/RightAside'
import '@radix-ui/themes/styles.css'
import './sass/App.scss'
import studentData from './assets/data/students.json'

function App() {
  return <DataContext.Provider value={studentData as StudentDataType}>
    <Flex
      direction={'row'}
      as='div'
      gap='0'
      justify={'between'}
      height={'100%'}
      width={'100%'}
    >
      <LeftAside />
      <Stage />
      <RightAside />
    </Flex>
  </DataContext.Provider>
}

export default App
