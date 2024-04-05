import { memo } from 'react'
import type { ReactNode } from 'react'
import { Box, Card } from '@radix-ui/themes'
import './style.scss'

interface FlipCardProps {
    isSame: boolean
    sequence: number
    typeColor?: string
    children?: ReactNode
}

const FlipCard = memo(({ isSame, sequence, typeColor, children }: FlipCardProps) => {
    return <Box
        className='flip-card-wrapper'
    >
        <Card
            className={`flip-card flip-card--s-${sequence}${isSame
                ? ' flip-card--correct'
                : ''}${typeColor !== undefined && typeColor !== ''
                    ? ` flip-card--t-${typeColor}`
                    : ''
                }`}
            size='1'
        >
            {children}
        </Card>
        <Card
            className={`flip-card-back flip-card-back--s-${sequence}`}
            size='1'
        ></Card>
    </Box>
})

export default FlipCard
