import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import DataContext from './contexts/data.ts'
import languageStore from './stores/language.ts'
import type { StudentDataType } from './types/student.ts'
import LeftAside from './components/LeftAside'
import Stage from './components/Stage'
import RightAside from './components/RightAside'
import MobileRightAside from './components/MobileRightAside'
import '@radix-ui/themes/styles.css'
import './sass/App.scss'
import studentData from './assets/data/students.json'

function App() {
  useEffect(() => {
    languageStore.setLanguage('zh_cn')
  }, [])

  return <DataContext.Provider value={studentData as StudentDataType}>
    <Flex
      direction={'row'}
      as='div'
      gap='0'
      justify={'between'}
      height={'100%'}
      width={'100%'}
    >
      <MobileRightAside />
      <LeftAside />
      <Stage />
      <RightAside />
    </Flex>
  </DataContext.Provider>
}

export default App
