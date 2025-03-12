import { Button } from "@chakra-ui/react";
import { useAppKit } from "@reown/appkit/react";

export default function WalletConnectButton({ text }: { text: string }) {
    const { open } = useAppKit();

    return (
        <Button
            padding={{
                base: '25px 25px 30px',
                md: '25px 35px 30px',
                lg: '25px 35px 30px',
                xl: '25px 35px 30px'
            }}
            fontFamily={'Cherry Bomb One, serif'}
            className={'text-shadow'}
            borderRadius={'5px'}
            color={'white'}
            background={'#19C605'}
            fontSize={{
                base: '18px',
                md: '25px',
                lg: '25px',
                xl: '25px'
            }}
            border={'4px solid #9E4812'}
            animation={'wobble 1s ease-in-out infinite'}
            _hover={{
                background: '#13b500'
            }}
            _active={{
                background: '#0f9600'
            }}
            onClick={() => open()}
        >
            {text}
        </Button >
    )
}