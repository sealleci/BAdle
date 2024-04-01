import { Container, Flex } from '@radix-ui/themes'

export default function LeftAside() {
    return <Container
        height='100%'
        width='320px'
        flexGrow='0'
        flexShrink='0'
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
            >
                <img
                    src="https://webcnstatic.yostar.net/ba_cn_web/prod/web/assets/logo_2.e1693a80.png"
                    alt="logo"
                    draggable={false}
                    width='120px'

                />
            </Flex>
        </Flex>
    </Container>
}