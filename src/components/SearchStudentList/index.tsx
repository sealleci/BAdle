import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Avatar, Card, Flex, IconButton, ScrollArea, Text } from '@radix-ui/themes'
import DataContext from '../../contexts/data.ts'
import dialogStore from '../../stores/dialog.ts'
import languageStore from '../../stores/language.ts'
import scrollStore from '../../stores/scroll.ts'
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
    searchPrompt: string
    isFocus: boolean
}

const SearchStudentItem = memo(({ studentId: id, abbrevName, variant, avatarUrl }: SearchStudentItemProps) => {
    const handleClick = useCallback(() => {
        selectStore.setStudentId(id)
        if (window.innerWidth < 640) {
            dialogStore.setIsOpen(false)
        }
    }, [id])

    return <Card
        className='search-student-list__item'
    >
        <Flex
            direction='row'
            justify='between'
            align='center'
        >
            <IconButton
                radius='full'
                className='search-student-list__item__select-btn'
                color='blue'
                onClick={handleClick}
            >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </IconButton>
            <Text className='search-student-list__item__name'>
                {abbrevName}
                {variant !== ''
                    && <Text
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

function BlankItem({ height }: { height: number }) {
    return <div
        style={{
            height: `${height}px`,
            width: '100%'
        }}
    ></div>
}

export default function SearchStudentList({ searchPrompt, isFocus }: SearchStudentListProps) {
    const ITEM_HEIGHT: number = 66;
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(0)
    const [topBlankHeight, setTopBlankHeight] = useState<number>(0)
    const [bottomBlankHeight, setBottomBlankHeight] = useState<number>(0)
    const studentData = useContext(DataContext)
    const filteredStudents = useMemo(() => {
        return Object.entries((studentData satisfies StudentDataType)["students"]).filter(([, value]: [string, StudentItem]) => {
            if (searchPrompt.trim() === '') {
                if (window.innerWidth >= 640) {
                    return !isFocus
                } else {
                    return true
                }
            }

            for (const part of searchPrompt.trim().toLowerCase().split(/\s+/)) {
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
        })
    }, [isFocus, searchPrompt, studentData])

    const handleScroll = useCallback(() => {
        if (scrollAreaRef.current === null) {
            return
        }

        const curStartIndex = Math.floor(scrollAreaRef.current.scrollTop / ITEM_HEIGHT)
        const curEndIndex = Math.floor((scrollAreaRef.current.scrollTop + scrollAreaRef.current.clientHeight) / ITEM_HEIGHT)

        if (searchPrompt.trim() === '') {
            scrollStore.setScrollTop(scrollAreaRef.current.scrollTop)
            scrollStore.setStartIndex(curStartIndex)
            scrollStore.setEndIndex(curEndIndex)
        }

        setStartIndex(curStartIndex)
        setEndIndex(curEndIndex)
        setTopBlankHeight(curStartIndex * ITEM_HEIGHT)
        setBottomBlankHeight((filteredStudents.length - 1 - curEndIndex) * ITEM_HEIGHT)
    }, [searchPrompt, filteredStudents])


    useEffect(() => {
        if (searchPrompt.trim() === '') {
            const minListLength = scrollAreaRef.current === null ? 1 : Math.min(Math.floor(scrollAreaRef.current.clientHeight / ITEM_HEIGHT), filteredStudents.length - 1)
            const curEndIndex = (scrollAreaRef.current === null)
                ? scrollStore.endIndex
                : (scrollStore.endIndex - scrollStore.startIndex + 1) < minListLength
                    ? minListLength
                    : scrollStore.endIndex

            setStartIndex(scrollStore.startIndex)
            setEndIndex(curEndIndex)
            setTopBlankHeight(scrollStore.startIndex * ITEM_HEIGHT)
            setBottomBlankHeight((filteredStudents.length - 1 - scrollStore.endIndex) * ITEM_HEIGHT)
        } else {
            const curEndIndex = scrollAreaRef.current === null
                ? filteredStudents.length - 1
                : Math.min(Math.floor(scrollAreaRef.current.clientHeight / ITEM_HEIGHT), filteredStudents.length - 1)
            setStartIndex(0)
            setEndIndex(curEndIndex)
            setTopBlankHeight(0)
            setBottomBlankHeight((filteredStudents.length - 1 - curEndIndex) * ITEM_HEIGHT)
        }
    }, [searchPrompt, filteredStudents])

    useEffect(() => {
        if (scrollAreaRef.current === null) {
            return
        }

        if (searchPrompt.trim() === '') {
            scrollAreaRef.current.scrollTop = scrollStore.scrollTop
        }
    })

    useEffect(() => {
        if (scrollAreaRef.current === null) {
            return
        }

        if (searchPrompt.trim() !== '') {
            scrollAreaRef.current.scrollTop = 0
        }
    }, [searchPrompt])

    return <ScrollArea
        type='auto'
        scrollbars='vertical'
        size='2'
        className='search-student-list'
        onScroll={handleScroll}
        ref={scrollAreaRef}
    >
        <BlankItem
            height={topBlankHeight}
        />
        {
            filteredStudents.slice(startIndex, endIndex + 1).map(([key, value]: [string, StudentItem]) => {
                return <SearchStudentItem
                    key={key}
                    studentId={key}
                    abbrevName={languageStore.language in value['displayName']['abbrev']
                        ? value['displayName']['abbrev'][languageStore.language]
                        : ''}
                    variant={languageStore.language in value['variant']
                        ? value['variant'][languageStore.language]
                        : ''}
                    avatarUrl={value['avatarUrl']}
                />
            })
        }
        <BlankItem
            height={bottomBlankHeight}
        />
    </ScrollArea>
}
