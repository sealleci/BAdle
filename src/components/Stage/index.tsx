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
    const answerStudentId = useRef<string>('')
    const [selectedStudentItemList, setSelectedStudentItemList] = useState<StudentItem[]>([])
    const selectedStudentIdList = useRef<string[]>([])
    const studentData = useContext(DataContext)

    const rollStudentId = useCallback(() => {
        const studentsIdList = Object.keys(studentData['students'])
        answerStudentId.current = studentsIdList[getRangeRandom(0, studentsIdList.length - 1)]
    }, [studentData])

    useEffect(() => {
        rollStudentId()
    }, [rollStudentId])

    useEffect(() => autorun(() => {
        if (isGameFinished
            || answerStudentId.current === ''
            || selectStore.studentId === ''
            || !(selectStore.studentId in studentData['students'])
            || selectedStudentIdList.current.includes(selectStore.studentId)) {
            return
        }

        setSelectedStudentItemList(prev => [...prev, studentData['students'][selectStore.studentId]])
        selectedStudentIdList.current.push(selectStore.studentId)
        setCurRound(prev => prev + 1)

        if (selectStore.studentId === answerStudentId.current) {
            setIsGameFinished(true)
        }
    }), [studentData, isGameFinished])

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
        selectedStudentIdList.current = []
        setIsGameFinished(false)
        rollStudentId()
        selectStore.setStudentId('')
        selectStore.setIsClear(false)
    }), [rollStudentId])

    return <Container
        height='100%'
        // minWidth='420px'
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
                answerStudentAvatarUrl={isGameFinished && answerStudentId.current !== ''
                    ? studentData['students'][answerStudentId.current]['avatarUrl']
                    : ''}
                answerStudentFullName={isGameFinished && answerStudentId.current !== ''
                    ? (languageStore.language in studentData['students'][answerStudentId.current]['displayName']['full']
                        ? studentData['students'][answerStudentId.current]['displayName']['full'][languageStore.language]
                        : '')
                    : ''}
                answerStudentVariant={isGameFinished && answerStudentId.current !== ''
                    ? (languageStore.language in studentData['students'][answerStudentId.current]['variant']
                        ? studentData['students'][answerStudentId.current]['variant'][languageStore.language]
                        : '')
                    : ''}
            />
            <SelectedStudentList
                selectedStudentItemList={selectedStudentItemList}
                answerStudent={studentData['students'][answerStudentId.current]}
                isGameFinished={isGameFinished}
            />
        </Flex>
    </Container>
})

export default Stage
