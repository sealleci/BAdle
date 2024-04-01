import { Flex } from '@radix-ui/themes'
import LeftAside from './components/LeftAside'
import Stage from './components/Stage'
import SearchStudentList from './components/SearchStudentList'
import '@radix-ui/themes/styles.css'
import './sass/App.scss'

function App() {

  return (
    <Flex
      direction={'row'}
      as='div'
      gap='0'
      justify={'between'}
      height={'100%'}
      width={'100%'}>
      <LeftAside />
      <Stage />
      <SearchStudentList />
    </Flex>
  )
}

export default App
