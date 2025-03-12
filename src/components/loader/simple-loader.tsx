import { Heading } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";


export default function SimpleLoader({ text }: { text: string }) {
    return (
        <Stack
            w={'100vw'}
            height={'100vh'}
            justifyContent={'center'}
            alignItems={'center'}
            backgroundColor={'rgba(0,0,0,0.6)'}
            backgroundSize={'cover'}
            backgroundPosition={'center'}
            backgroundAttachment={'fixed'}
            backgroundRepeat={'no-repeat'}
            backgroundBlendMode={'darken'}
            position={'absolute'}
            left={0}
            top={0}
            right={0}
            bottom={0}
        >
            <Heading color={'white'} fontSize={'30px'} fontFamily={'Cherry Bomb One, serif'} className={"text-shadow"}>{text}</Heading>
        </Stack>
    )
} 