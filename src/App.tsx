import { useCallback, useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import DataContext from './contexts/data.ts'
import languageStore from './stores/language.ts'
import sizeStore from './stores/size.ts'
import type { StudentDataType } from './types/student.ts'
import LeftAside from './components/LeftAside'
import Stage from './components/Stage'
import RightAside from './components/RightAside'
import '@radix-ui/themes/styles.css'
import './sass/App.scss'
import studentData from './assets/data/students.json'

function App() {
  const SMALL_SCREEN_THRESHOLD: number = 640
  const [prevWindowHeight, setPrevWindowHeight] = useState<number>(window.innerHeight)

  const handleResize = useCallback(() => {
    sizeStore.setIsSmallScreen(window.innerWidth <= SMALL_SCREEN_THRESHOLD)

    if (window.innerHeight !== prevWindowHeight) {
      sizeStore.setIsHeightChanged(true)
      setPrevWindowHeight(window.innerHeight)
    }
  }, [prevWindowHeight])

  useEffect(() => {
    languageStore.setLanguage('zh_cn')
  }, [])

  useEffect(() => {
    sizeStore.setIsSmallScreen(window.innerWidth <= SMALL_SCREEN_THRESHOLD)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

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
