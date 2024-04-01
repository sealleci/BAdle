import { Card, Container, Flex, ScrollArea, TextArea } from '@radix-ui/themes'
import SearchStudentItem from '../SearchStudentItem'

export default function SearchStudentList() {
    return <Container
        height='100%'
        width='320px'
        flexGrow='0'
        flexShrink='0'
    >
        <Card>
            <Flex
                direction='column'
                justify='start'
            >
                <TextArea radius="full" placeholder="搜索学生" />
                <ScrollArea type='auto' scrollbars="vertical" style={{ height: '300px' }}>
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                    <SearchStudentItem />
                </ScrollArea>
            </Flex>
        </Card>
    </Container>
}