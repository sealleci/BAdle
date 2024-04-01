import { Container, Flex, ScrollArea } from '@radix-ui/themes'
import StageBanner from '../StageBanner'
import StageStudentItem from '../StageStudentItem'

function StageStudentList() {
    return <ScrollArea>
        <StageStudentItem />
        <StageStudentItem />
        <StageStudentItem />
    </ScrollArea>
}

export default function Stage() {
    return <Container
        height='100%'
        minWidth='320px'
        flexGrow='1'
    >
        <Flex
            direction='column'
            justify='start'
            as='div'
            gap='0'
            height='100%'
            width='100%'
        >
            <StageBanner />
            <StageStudentList />
        </Flex>
    </Container>
}