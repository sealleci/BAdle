import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Container, Flex } from '@radix-ui/themes'
import DataContext from '../../contexts/data.ts'
import languageStore from '../../stores/language.ts'
import selectStore from '../../stores/select.ts'
import { getRangeRandom } from '../../utils/random.ts'
import type { StudentItem } from '../../types/student'
import StageBanner from '../StageBanner'
import SelectedStudentList from '../SelectedStudentList'
import './style.scss'

const Stage = observer(() => {
    const totalRounds: number = 6
    const [curRound, setCurRound] = useState<number>(0)
    const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
    const [selectedStudentItemList, setSelectedStudentItemList] = useState<StudentItem[]>([])
    const answerStudentItem = useRef<StudentItem | null>(null)
    const studentData = useContext(DataContext)

    const rollStudentId = useCallback(() => {
        answerStudentItem.current = studentData['students'][getRangeRandom(0, studentData['students'].length - 1)]
    }, [studentData])

    useEffect(() => {
        rollStudentId()
    }, [rollStudentId])

    useEffect(() => autorun(() => {
        if (isGameFinished
            || answerStudentItem.current === null
            || selectStore.studentId === ''
            || selectedStudentItemList.find(student => student['id'] === selectStore.studentId) !== undefined) {
            return
        }

        const newStudentItem = studentData['students'].find(student => student['id'] === selectStore.studentId)

        if (newStudentItem !== undefined) {
            setSelectedStudentItemList(prev => [...prev, newStudentItem])
        }

        setCurRound(prev => prev + 1)

        if (selectStore.studentId === answerStudentItem.current['id']) {
            setIsGameFinished(true)
        }
    }), [studentData, isGameFinished, selectedStudentItemList])

    useEffect(() => {
        if (curRound >= totalRounds) {
            setIsGameFinished(true)
        }
    }, [curRound])

    useEffect(() => autorun(() => {
        if (!(selectStore.isClear)) {
            return
        }

        setCurRound(0)
        setSelectedStudentItemList([])
        setIsGameFinished(false)
        rollStudentId()
        selectStore.setStudentId('')
        selectStore.setIsClear(false)
    }), [rollStudentId])

    return <Container
        height='100%'
        flexGrow='1'
        className='stage'
    >
        <Flex
            direction='column'
            justify='between'
            align='center'
            as='div'
            gap='0'
            height='100%'
        >
            <StageBanner
                curRound={curRound}
                totalRounds={totalRounds}
                answerStudentAvatarUrl={isGameFinished && answerStudentItem.current !== null
                    ? answerStudentItem.current['avatarUrl']
                    : ''}
                answerStudentFullName={isGameFinished && answerStudentItem.current !== null
                    ? (languageStore.language in answerStudentItem.current['displayName']['full']
                        ? answerStudentItem.current['displayName']['full'][languageStore.language]
                        : '')
                    : ''}
                answerStudentVariant={isGameFinished && answerStudentItem.current !== null
                    ? (languageStore.language in answerStudentItem.current['variant']
                        ? answerStudentItem.current['variant'][languageStore.language]
                        : '')
                    : ''}
            />
            <SelectedStudentList
                selectedStudentItemList={selectedStudentItemList}
                answerStudent={answerStudentItem.current}
                isGameFinished={isGameFinished}
            />
        </Flex>
    </Container>
})

export default Stage
