import { memo, useEffect, useRef, useState } from 'react'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Avatar, Card, Flex, IconButton, ScrollArea, Text } from '@radix-ui/themes'
import dialogStore from '../../stores/dialog.ts'
import languageStore from '../../stores/language.ts'
import sizeStore from '../../stores/size.ts'
import { getDamageText, getDamageColor, getArmorText, getArmorColor, getRoleIconUrl, getSchoolIconUrl } from '../../utils/icon.ts'
import type { ArmorType, DamageType, PositionType, StudentRole, StudentSchool, StudentItem } from '../../types/student.ts'
import FlipCard from '../FlipCard/index.tsx'
import './style.scss'

interface SelectedStudentItemProps {
    avatarUrl: string
    fullName: string
    isSameArmorType: [ArmorType, boolean]
    isSameDamageType: [DamageType, boolean]
    isSameRole: [StudentRole, boolean]
    isSameSchool: [StudentSchool, boolean]
    // isSameWeaponType: [WeaponType, boolean]
    isSamePositionType: [PositionType, boolean]
    variant: string
}

interface SelectedStudentListProps {
    selectedStudentItemList: StudentItem[]
    answerStudent: StudentItem
    isGameFinished: boolean
}

const AddingStudentItem = memo(() => {
    return <Flex
        width='100%'
        direction='row'
        justify='center'
        align='center'
        className='adding-student-item'
    >
        <IconButton
            size='3'
            radius='full'
            color='blue'
            onClick={() => dialogStore.setIsOpen(true)}
        >
            <svg width='24' height='24' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z' fill='currentColor' fillRule='evenodd' clipRule='evenodd'></path></svg>
        </IconButton>
    </Flex>

})

const SelectedStudentItem = observer(({
    avatarUrl,
    fullName,
    isSameArmorType,
    isSameDamageType,
    isSameRole,
    isSameSchool,
    isSamePositionType,
    variant
}: SelectedStudentItemProps) => {
    return <Card
        size='1'
        className='selected-student-list__item'
    >
        <Flex
            direction='column'
            justify='between'
            gap='2'
        >
            <Flex
                direction='row'
                justify='between'
                align='center'
            >
                <Avatar
                    size={sizeStore.isSmallScreen ? '4' : '5'}
                    src={avatarUrl}
                    fallback=''
                    draggable={false}
                ></Avatar>
                <Text
                    className='selected-student-list__item__name'
                >
                    {fullName}
                    {variant !== '' && <Text
                        className='variant-name'
                    >{variant}</Text>}
                </Text>
            </Flex>
            <Flex
                direction='row'
                justify='between'
                wrap='wrap'
            >
                <FlipCard
                    isSame={isSameSchool[1]}
                    sequence={1}
                >
                    <img
                        src={getSchoolIconUrl(isSameSchool[0])}
                        alt=''
                        draggable={false}
                    />
                </FlipCard>
                <FlipCard
                    isSame={isSameDamageType[1]}
                    sequence={2}
                    typeColor={getDamageColor(isSameDamageType[0])}
                >
                    <Text
                        className='prop-text damage-text'
                    >{getDamageText(isSameDamageType[0], languageStore.language)}</Text>
                    {/* <Box
                        className='type-dots'
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </Box> */}
                </FlipCard>
                <FlipCard
                    isSame={isSameArmorType[1]}
                    sequence={3}
                    typeColor={getArmorColor(isSameArmorType[0])}
                >
                    <Text
                        className='prop-text armor-text'
                    >{getArmorText(isSameArmorType[0], languageStore.language)}</Text>
                    {/* <Box
                        className='type-dots'
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </Box> */}
                </FlipCard>
                <FlipCard
                    isSame={isSamePositionType[1]}
                    sequence={4}
                >
                    <Text
                        className='prop-text position-text'
                    >{isSamePositionType[0].toLocaleUpperCase()}</Text>
                </FlipCard>
                <FlipCard
                    isSame={isSameRole[1]}
                    sequence={5}
                >
                    <img
                        src={getRoleIconUrl(isSameRole[0])}
                        alt=''
                        draggable={false}
                    />
                </FlipCard>
            </Flex>
        </Flex>
    </Card>
})

const SelectedStudentList = observer(({ selectedStudentItemList, answerStudent, isGameFinished }: SelectedStudentListProps) => {
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' })
        }
    }, [selectedStudentItemList])

    useEffect(() => autorun(() => {
        setIsSmallScreen(sizeStore.isSmallScreen)
    }), [])

    return <ScrollArea
        type='auto'
        ref={scrollAreaRef}
        size='2'
        className='selected-student-list'
    >
        {
            selectedStudentItemList.map((student: StudentItem, index: number) => {
                return <SelectedStudentItem
                    key={index}
                    avatarUrl={student['avatarUrl']}
                    fullName={languageStore.language in student['displayName']['full']
                        ? student['displayName']['full'][languageStore.language]
                        : ''}
                    variant={languageStore.language in student['variant']
                        ? student['variant'][languageStore.language]
                        : ''}
                    isSameArmorType={[student['armorType'], answerStudent['armorType'] === student['armorType']]}
                    isSameDamageType={[student['damageType'], answerStudent['damageType'] === student['damageType']]}
                    isSameRole={[student['role'], answerStudent['role'] === student['role']]}
                    isSameSchool={[student['school'], answerStudent['school'] === student['school']]}
                    isSamePositionType={[student['positionType'], answerStudent['positionType'] === student['positionType']]}
                />
            })
        }
        {(!isGameFinished && isSmallScreen) && <AddingStudentItem />}
    </ScrollArea>
})

export default SelectedStudentList
