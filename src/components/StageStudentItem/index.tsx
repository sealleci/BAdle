import { memo } from 'react'
import { Avatar, Card, Flex, Text } from '@radix-ui/themes'

const StageStudentItem = memo(() => {
    return <Card>
        <Flex
            direction='column'
            justify='between'
        >
            <Flex
                direction='row'
                justify='start'
                align='center'
            >
                <Avatar src='https://schale.gg/images/student/collection/10064.webp' fallback=''></Avatar>
                <Text>新春夹袋子</Text>
            </Flex>
            <Flex
                direction='row'
                justify='between'
            >
                <Card>
                    <Text>学院</Text>
                </Card>
                <Card>
                    <Text>特种</Text>
                </Card>
                <Card>
                    <Text>攻击</Text>
                </Card>
                <Card>
                    <Text>防御</Text>
                </Card>
                <Card>
                    <Text>武器</Text>
                </Card>
            </Flex>
        </Flex>
    </Card>
})

export default StageStudentItem