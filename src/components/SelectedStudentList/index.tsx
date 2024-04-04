import { memo, useEffect, useRef } from 'react'
import { Avatar, Box, Card, Flex, ScrollArea, Text } from '@radix-ui/themes'
import languageStore from '../../stores/language.ts'
import { getDamageText, getDamageColor, getArmorText, getArmorColor, getRoleIconUrl, getSchoolIconUrl } from '../../utils/icon.ts'
import type { ArmorType, DamageType, PositionType, StudentRole, StudentSchool, StudentItem } from '../../types/student.ts'
import FlipCard from '../FlipCard/index.tsx'
import './style.scss'

interface SelectedStudentItemProps {
    avatarUrl: string
    fullName: string
    sameArmorType: [ArmorType, boolean]
    sameDamageType: [DamageType, boolean]
    sameRole: [StudentRole, boolean]
    sameSchool: [StudentSchool, boolean]
    // sameWeaponType: [WeaponType, boolean]
    samePositionType: [PositionType, boolean]
    variant: string
}

interface SelectedStudentListProps {
    selectedStudentItemList: StudentItem[]
    answerStudent: StudentItem
}

const SelectedStudentItem = memo(({
    avatarUrl,
    fullName,
    sameArmorType,
    sameDamageType,
    sameRole,
    sameSchool,
    samePositionType,
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
                    size='5'
                    src={avatarUrl}
                    fallback=''
                    draggable={false}
                ></Avatar>
                <Text>
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
                    size={4}
                    isSame={sameSchool[1]}
                    sequence={1}
                >
                    <img
                        src={getSchoolIconUrl(sameSchool[0])}
                        alt=""
                        draggable={false}
                    />
                </FlipCard>
                <FlipCard
                    size={4}
                    isSame={sameDamageType[1]}
                    sequence={2}
                    dotColor={getDamageColor(sameDamageType[0])}
                >
                    <Text
                        className='prop-text damage-text'
                    >{getDamageText(sameDamageType[0], languageStore.language)}</Text>
                    <Box
                        className='type-dots'
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </Box>
                </FlipCard>
                <FlipCard
                    size={4}
                    isSame={sameArmorType[1]}
                    sequence={3}
                    dotColor={getArmorColor(sameArmorType[0])}
                >
                    <Text
                        className='prop-text armor-text'
                    >{getArmorText(sameArmorType[0], languageStore.language)}</Text>
                    <Box
                        className='type-dots'
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </Box>
                </FlipCard>
                <FlipCard
                    size={4}
                    isSame={samePositionType[1]}
                    sequence={4}
                >
                    <Text
                        className='prop-text position-text'
                    >{samePositionType[0].toLocaleUpperCase()}</Text>
                </FlipCard>
                <FlipCard
                    size={4}
                    isSame={sameRole[1]}
                    sequence={5}
                >
                    <img
                        src={getRoleIconUrl(sameRole[0])}
                        alt=""
                        draggable={false}
                    />
                </FlipCard>
            </Flex>
        </Flex>
    </Card>
})

function SelectedStudentList({ selectedStudentItemList, answerStudent }: SelectedStudentListProps) {
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' })
        }
    })

    return <ScrollArea
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
                    sameArmorType={[student['armorType'], answerStudent['armorType'] === student['armorType']]}
                    sameDamageType={[student['damageType'], answerStudent['damageType'] === student['damageType']]}
                    sameRole={[student['role'], answerStudent['role'] === student['role']]}
                    sameSchool={[student['school'], answerStudent['school'] === student['school']]}
                    samePositionType={[student['positionType'], answerStudent['positionType'] === student['positionType']]}
                />
            })
        }
    </ScrollArea>
}

export default SelectedStudentList
