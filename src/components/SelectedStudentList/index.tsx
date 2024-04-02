import { memo, useEffect, useRef } from 'react'
import { Avatar, Card, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { getDamageTextAndColor, getArmorTextAndColor, getRoleIconUrl, getSchoolIconUrl } from '../../utils/icon.ts'
import type { DamageType, ArmorType, StudentRole, StudentSchool, WeaponType, StudentItem } from '../../types/student.ts'
import FlipCard from '../FlipCard/index.tsx'
import './style.scss'

interface SelectedStudentItemProps {
    avatarUrl: string
    fullName: string
    sameArmorType: [ArmorType, boolean]
    sameDamageType: [DamageType, boolean]
    sameRole: [StudentRole, boolean]
    sameSchool: [StudentSchool, boolean]
    sameWeaponType: [WeaponType, boolean]
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
    sameWeaponType,
    variant
}: SelectedStudentItemProps) => {
    return <Card
        size='1'
        style={{
            marginRight: '1rem'
        }}
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
                >
                    <Text as='div'>{getDamageTextAndColor(sameDamageType[0], 'zh_cn')[0]}</Text>
                </FlipCard>
                <FlipCard
                    size={4}
                    isSame={sameArmorType[1]}
                    sequence={3}
                >
                    <Text>{getArmorTextAndColor(sameArmorType[0], 'zh_cn')[0]}</Text>
                </FlipCard>
                <FlipCard
                    size={4}
                    isSame={sameWeaponType[1]}
                    sequence={4}
                >
                    <Text>{sameWeaponType[0].toLocaleUpperCase()}</Text>
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
        style={{
            height: 'calc(100% - 8.5rem)',
            width: '420px'
        }}
    >
        {
            selectedStudentItemList.map((student: StudentItem, index: number) => {
                return <SelectedStudentItem
                    key={index}
                    avatarUrl={student['avatarUrl']}
                    fullName={student['displayName']['full']['zh_cn']}
                    variant={'zh_cn' in student['variant'] ? student['variant']['zh_cn'] : ''}
                    sameArmorType={[student['armorType'], answerStudent['armorType'] === student['armorType']]}
                    sameDamageType={[student['damageType'], answerStudent['damageType'] === student['damageType']]}
                    sameRole={[student['role'], answerStudent['role'] === student['role']]}
                    sameSchool={[student['school'], answerStudent['school'] === student['school']]}
                    sameWeaponType={[student['weaponType'], answerStudent['weaponType'] === student['weaponType']]}
                />
            })
        }
    </ScrollArea>
}

export default SelectedStudentList
