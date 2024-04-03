import { Container, Flex } from '@radix-ui/themes'
import './style.scss'

export default function LeftAside() {
    return <Container
        height='100%'
        width='320px'
        flexGrow='0'
        flexShrink='0'
        className='left-aside'
    >
        <Flex
            direction='column'
            justify='between'
            as='div'
            gap='0'
            height='100%'
            width='100%'
        >
            <Flex
                direction='row'
                justify='center'
                as='div'
                width='100%'
                className='left-banner'
            >
                <img
                    src='https://webcnstatic.yostar.net/ba_cn_web/prod/web/assets/logo_2.e1693a80.png'
                    alt='logo'
                    draggable={false}
                />
            </Flex>
        </Flex>
    </Container>
}