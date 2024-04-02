import { memo, useContext } from 'react'
import { Avatar, Card, Flex, IconButton, ScrollArea, Text } from '@radix-ui/themes'
import DataContext from '../../contexts/data.ts'
import selectStore from '../../stores/select.ts'
import type { LanguageType } from '../../types/language.ts'
import type { StudentItem, StudentDataType } from '../../types/student.ts'
import './style.scss'

interface SearchStudentItemProps {
    studentId: string
    abbrevName: string
    variant: string
    avatarUrl: string
}

interface SearchStudentListProps {
    prompt: string
    isFocus: boolean
}

const SearchStudentItem = memo(({ studentId: id, abbrevName, variant, avatarUrl }: SearchStudentItemProps) => {

    function handleClick(id: string) {
        selectStore.setStudentId(id)
    }

    return <Card
        className='search-student-item'
    >
        <Flex
            direction='row'
            justify='between'
            align='center'
        >
            <IconButton
                radius='full'
                className='select-student-btn'
                onClick={() => handleClick(id)}
            >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </IconButton>
            <Text>
                {abbrevName}
                {variant !== '' && <Text
                    className='variant-name'
                >{variant}</Text>}
            </Text>
            <Avatar
                src={avatarUrl}
                fallback=''
                loading='lazy'
                draggable={false}
            ></Avatar>
        </Flex>
    </Card>
})

export default function SearchStudentList({ prompt, isFocus }: SearchStudentListProps) {
    const studentData = useContext(DataContext)

    return <ScrollArea
        type='auto'
        scrollbars='vertical'
        size='2'
        style={{
            height: 'calc(100% - 3rem)',
            width: '100%'
        }}>
        {
            Object.entries((studentData as StudentDataType)["students"]).filter(([, value]: [string, StudentItem]) => {
                if (prompt.trim() === '') {
                    return !isFocus
                }

                for (const part of prompt.trim().toLowerCase().split(/\s+/)) {
                    for (const key of Object.keys(value["displayName"]["full"])) {
                        if (value["displayName"]["full"][key as LanguageType].toLowerCase().includes(part)) {
                            return true
                        }
                    }

                    for (const key of Object.keys(value["variant"])) {
                        if (value["variant"][key as LanguageType].toLowerCase().includes(part)) {
                            return true
                        }
                    }
                }

                return false
            }).map(([key, value]: [string, StudentItem]) => {
                return <SearchStudentItem
                    key={key}
                    studentId={key}
                    abbrevName={value['displayName']['abbrev']['zh_cn']}
                    variant={'zh_cn' in value['variant'] ? value['variant']['zh_cn'] : ''}
                    avatarUrl={value['avatarUrl']}
                />
            })
        }
    </ScrollArea>
}
