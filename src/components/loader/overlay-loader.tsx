import { Heading, Progress } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import backgroundImage from '../../assets/start-screen.png'
import { useEffect, useState } from "react";


export default function OverlayLoader() {
    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + Math.random() * 7;
            });
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Stack
            w={'100vw'}
            height={'100vh'}
            justifyContent={'center'}
            alignItems={'center'}
            backgroundColor={'rgba(0,0,0,0.6)'}
            backgroundImage={`url(${backgroundImage})`}
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
            <Progress.Root striped animated value={progress > 100 ? 100 : progress} zIndex={999} width={{
                base: '80%',
                md: '600px',
                lg: '600px',
                xl: '600px'
            }}>
                <Progress.Track height={'100%'} borderRadius={'5px'} padding={'4px'} backgroundImage={'linear-gradient(60deg, #9E4303,rgb(99, 41, 0))'}>
                    <Heading color={'white'} fontSize={'25px'} fontFamily={'Cherry Bomb One, serif'} position={'fixed'} top={'0'} bottom={'1'} left={'0'} right={'0'} display={'flex'} alignItems={'center'} justifyContent={'center'} className={"text-shadow"}>Loading {(progress > 99 ? 99 : progress).toFixed(0)}%</Heading>
                    <Progress.Range
                        height={'55px'}
                        paddingBottom={'4'}
                        paddingTop={'2'}
                        backgroundImage={'repeating-linear-gradient(-45deg,transparent,transparent 15px,rgba(255, 255, 255, 0.2) 15px,rgba(255, 255, 255, 0.2) 25px), linear-gradient(54deg, #1ECA04, #14BC01)'}
                        backgroundRepeat={'no-repeat'}
                        backgroundSize={'cover'}
                        backgroundAttachment={'fixed'}
                        borderRadius={'5px'}
                        animation={'moveStripes 0.5s linear infinite'}
                        boxShadow={'0px 4px 16px 0px rgba(165, 56, 30, 1)'}
                    >
                    </Progress.Range>
                </Progress.Track>
            </Progress.Root>
        </Stack>
    )
} 