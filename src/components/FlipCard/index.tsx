import { memo, ReactNode } from 'react'
import { Box, Card } from '@radix-ui/themes'
import './style.scss'

interface FlipCardProps {
    size: number
    isSame: boolean
    sequence: number
    children?: ReactNode
}

const FlipCard = memo(({ size, isSame, sequence, children }: FlipCardProps) => {
    return <Box
        className='flip-card-wrapper'
    >
        <Card
            className={`flip-card flip-card--w${size} flip-card--s${sequence}${isSame ? ' flip-card--same' : ''}`}
            size='1'
        >
            {children}
        </Card>
        <Card
            className={`flip-card-back flip-card-back--w${size} flip-card-back--s${sequence}`}
            size='1'
        ></Card>
    </Box>
})

export default FlipCard
