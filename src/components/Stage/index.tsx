import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, Flex, ScrollArea } from '@radix-ui/themes'
import { SelectContext } from '../../stores/select.ts'
import { getRangeRandom } from '../../utils/random.ts'
import StageBanner from '../StageBanner'
import StageStudentItem from '../StageStudentItem'
import type { StudentDataItem, StudentDataType } from '../../types/student'

interface StageStudentListProps {
    selectedStudentList: StudentDataItem[]
    answerStudent: StudentDataItem
}

function StageStudentList({ selectedStudentList: StudentList, answerStudent }: StageStudentListProps) {
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' })
        }
    })

    return <ScrollArea
        ref={scrollAreaRef}
        style={{
            height: 'calc(100% - 8.5rem)',
            width: '420px'
        }}
    >
        {
            StudentList.map((student: StudentDataItem, index: number) => {
                return <StageStudentItem
                    key={index}
                    fullName={student['displayName']['full']['zh_cn'] + ('zh_cn' in student['variant'] ? `（${student['variant']['zh_cn']}）` : '')}
                    avatarUrl={student['avatarUrl']}
                    damageType={student['damageType']}
                    armorType={student['armorType']}
                    role={student['role']}
                    school={student['school']}
                    weaponType={student['weaponType']}
                    answerStudent={answerStudent}
                />
            })
        }
    </ScrollArea>
}

const Stage = observer(({ studentData }: { studentData: StudentDataType }) => {
    const totalRounds: number = 5
    const [curRound, setCurRound] = useState<number>(0)
    const [answerStudentId, setAnswerStudentId] = useState<string>('')
    const [curStudentIdList, setCurStudentIdList] = useState<string[]>([])
    const [curStudentList, setCurStudentList] = useState<StudentDataItem[]>([])
    const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
    const selectStore = useContext(SelectContext)

    const rollStudentId = useCallback(() => {
        const studentsIdList = Object.keys(studentData['students'])
        setAnswerStudentId(studentsIdList[getRangeRandom(0, studentsIdList.length - 1)])
    }, [studentData])

    useEffect(() => {
        rollStudentId()
    }, [rollStudentId])

    useEffect(() => {
        if (isGameFinished
            || answerStudentId === ''
            || selectStore.studentId === ''
            || !(selectStore.studentId in studentData['students'])
            || curStudentIdList.includes(selectStore.studentId)) {
            return
        }

        setCurStudentList([...curStudentList, studentData['students'][selectStore.studentId]])
        setCurRound(prev => prev + 1)
        setCurStudentIdList([...curStudentIdList, selectStore.studentId])

        if (selectStore.studentId === answerStudentId) {
            setIsGameFinished(true)
        }
    }, [selectStore.studentId, studentData, curStudentList, isGameFinished, curStudentIdList, answerStudentId])

    useEffect(() => {
        if (curRound >= totalRounds) {
            setIsGameFinished(true)
        }
    }, [curRound])

    useEffect(() => {
        if (!(selectStore.isClear)) {
            return
        }

        setCurRound(0)
        setCurStudentList([])
        setCurStudentIdList([])
        setIsGameFinished(false)
        rollStudentId()
        selectStore.setStudentId('')
        selectStore.setIsClear(false)
    }, [selectStore.isClear, selectStore, rollStudentId])

    return <Container
        height='100%'
        minWidth='420px'
        flexGrow='1'
        style={{
            padding: '.25rem'
        }}
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
                answerStudentAvatarUrl={isGameFinished && answerStudentId !== '' ? studentData['students'][answerStudentId]['avatarUrl'] : ''}
                answerStudentName={isGameFinished && answerStudentId !== '' ? studentData['students'][answerStudentId]['displayName']['full']['zh_cn'] : ''}
            />
            <StageStudentList
                selectedStudentList={curStudentList}
                answerStudent={studentData['students'][answerStudentId]}
            />
        </Flex>
    </Container>
})

export default Stage
