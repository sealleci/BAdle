import { useState } from 'react'
import { Card, Container, Flex, ScrollArea, TextField } from '@radix-ui/themes'
import type { StudentDataItem, StudentDataType } from '../../types/student.ts'
import SearchStudentItem from '../SearchStudentItem'
import { LanguageType } from '../../types/language.ts'

export default function SearchStudentList({ studentData }: { studentData: StudentDataType }) {
    const [searchText, setSearchText] = useState<string>('')
    const [isFocus, setIsFocus] = useState<boolean>(false)

    return <Container
        height='100%'
        width='320px'
        flexGrow='0'
        flexShrink='0'
        style={{
            padding: '.25rem'
        }}
    >
        <Card style={{
            height: '100%',
            width: '100%'
        }}>
            <Flex
                direction='column'
                justify='between'
                align='center'
                height='100%'
                width='100%'
            >
                <TextField.Root
                    onInput={event => { setSearchText(event.currentTarget.value) }}
                    onFocus={() => { setIsFocus(true) }}
                    onBlur={() => { setIsFocus(false) }}
                    // value={searchText}
                    radius='full'
                    placeholder='搜索学生'
                    style={{
                        width: '100%'
                    }}
                >
                    <TextField.Slot>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </TextField.Slot>
                </TextField.Root>
                <ScrollArea
                    type='auto'
                    scrollbars='vertical'
                    size='2'
                    style={{
                        height: 'calc(100% - 3rem)',
                        width: '100%'
                    }}>
                    {
                        Object.entries((studentData as StudentDataType)["students"]).filter(([, value]: [string, StudentDataItem]) => {
                            if (searchText.trim() === '') {
                                return !isFocus
                            }

                            for (const key of Object.keys(value["displayName"]["full"])) {
                                if (value["displayName"]["full"][key as LanguageType].toLowerCase().includes(searchText.trim().toLowerCase())) {
                                    return true
                                }
                            }

                            for (const key of Object.keys(value["variant"])) {
                                if (value["variant"][key as LanguageType].toLowerCase().includes(searchText.trim().toLowerCase())) {
                                    return true
                                }
                            }

                            return false
                        }).map(([key, value]: [string, StudentDataItem]) => {
                            return <SearchStudentItem
                                key={key}
                                studentId={key}
                                abbrevName={value['displayName']['abbrev']['zh_cn'] + ('zh_cn' in value['variant'] ? `（${value['variant']['zh_cn']}）` : '')}
                                avatarUrl={value['avatarUrl']}
                            />
                        })
                    }
                </ScrollArea>
            </Flex>
        </Card>
    </Container>
}
