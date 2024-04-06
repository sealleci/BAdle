import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { autorun } from 'mobx'
import { Card, Container, Dialog, Flex, TextField } from '@radix-ui/themes'
import dialogStore from '../../stores/dialog'
import widthStore from '../../stores/width'
import SearchStudentList from '../SearchStudentList'
import './style.scss'

function RightAsideMain() {
    const PLACE_HOLDER = '搜索学生'
    const [searchPrompt, setSearchPrompt] = useState<string>('')

    const handleInput = useCallback((event: FormEvent<HTMLInputElement>) => {
        setSearchPrompt(event.currentTarget.value)
    }, [])

    return <Container
        flexGrow='0'
        flexShrink='0'
        className='right-aside'
    >
        <Card
            className='right-aside__main'
        >
            <Flex
                direction='column'
                justify='between'
                align='center'
                height='100%'
                width='100%'
            >
                <TextField.Root
                    className='right-aside__search-bar'
                    onInput={handleInput}
                    radius='full'
                    placeholder={PLACE_HOLDER}
                    autoFocus={false}
                    tabIndex={-1}
                >
                    <TextField.Slot>
                        <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z' fill='currentColor' fillRule='evenodd' clipRule='evenodd'></path></svg>
                    </TextField.Slot>
                </TextField.Root>
                <SearchStudentList
                    searchPrompt={searchPrompt}
                />
            </Flex>
        </Card>
    </Container>
}

export default function RightAside() {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

    const onDialogOpenChange = useCallback((isOpen: boolean) => {
        setIsDialogOpen(isOpen)
        dialogStore.setIsOpen(isOpen)
    }, [])

    useEffect(() => autorun(() => {
        setIsSmallScreen(widthStore.isSmallScreen)
    }), [])

    useEffect(() => autorun(() => {
        setIsDialogOpen(dialogStore.isOpen)
    }), [])


    if (isSmallScreen) {
        return <Dialog.Root open={isDialogOpen} onOpenChange={onDialogOpenChange}>
            <Dialog.Content>
                <RightAsideMain />
            </Dialog.Content>
        </Dialog.Root>
    }

    return <RightAsideMain />
}
