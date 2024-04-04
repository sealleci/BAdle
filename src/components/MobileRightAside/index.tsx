import { useEffect, useState } from 'react'
import { autorun } from 'mobx'
import { Dialog, IconButton } from '@radix-ui/themes'
import dialogStore from '../../stores/dialog'
import RightAside from '../RightAside'
import './style.scss'

export default function MobileRightAside() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => autorun(() => {
        setIsOpen(dialogStore.isOpen)
    }), [])

    return <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger>
            <IconButton
                size='3'
                radius='full'
                color='blue'
                className='mobile-add-student-btn'
                onClick={() => { dialogStore.setIsOpen(true) }}
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </IconButton>
        </Dialog.Trigger>
        <Dialog.Content>
            <Dialog.Close>
                <RightAside />
            </Dialog.Close>
        </Dialog.Content>
    </Dialog.Root>
}