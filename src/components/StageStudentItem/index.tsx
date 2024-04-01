import { memo } from 'react'
import { Avatar, Card, Flex, Text } from '@radix-ui/themes'
import { getAttackTextAndColor, getDefenseTextAndColor, getRoleIconUrl, getSchoolIconUrl } from '../../utils/icon.ts'
import type { DamageType, ArmorType, StudentRole, StudentSchool, WeaponType, StudentDataItem } from '../../types/student.ts'

interface StageStudentItemProps {
    fullName: string
    avatarUrl: string
    damageType: DamageType
    armorType: ArmorType
    role: StudentRole
    school: StudentSchool
    weaponType: WeaponType
    answerStudent: StudentDataItem
}

const StageStudentItem = memo(({ fullName, avatarUrl, damageType, armorType, role, school, weaponType, answerStudent }: StageStudentItemProps) => {
    const BLUE_COLOR: string = '#d2eef7'
    const PINK_COLOR: string = '#fec5e4'

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
                <Text>{fullName}</Text>
            </Flex>
            <Flex
                direction='row'
                justify='between'
            >
                <Card
                    size='1'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backgroundColor: (answerStudent.school === school) ? BLUE_COLOR : PINK_COLOR
                    }}
                >
                    <img
                        src={getSchoolIconUrl(school)}
                        alt=""
                        draggable={false}
                        style={{
                            filter: 'brightness(0)',
                            width: '2rem'
                        }}

                    />
                </Card>
                <Card
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '4rem',
                        backgroundColor: (answerStudent.damageType === damageType) ? BLUE_COLOR : PINK_COLOR
                    }}
                >
                    <Text as='div'>{getAttackTextAndColor(damageType, 'zh_cn')[0]}</Text>
                </Card>
                <Card
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '6rem',
                        backgroundColor: (answerStudent.armorType === armorType) ? BLUE_COLOR : PINK_COLOR
                    }}
                >
                    <Text>{getDefenseTextAndColor(armorType, 'zh_cn')[0]}</Text>
                </Card>
                <Card
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '4rem',
                        backgroundColor: (answerStudent.weaponType === weaponType) ? BLUE_COLOR : PINK_COLOR
                    }}
                >
                    <Text>{weaponType.toLocaleUpperCase()}</Text>
                </Card>
                <Card
                    size='1'
                    style={{
                        backgroundColor: (answerStudent.role === role) ? BLUE_COLOR : PINK_COLOR
                    }}
                >
                    <img
                        src={getRoleIconUrl(role)}
                        alt="" draggable={false}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            filter: 'brightness(0)',
                            width: '2rem'
                        }}
                    />
                </Card>
            </Flex>
        </Flex>
    </Card>
})

export default StageStudentItem
