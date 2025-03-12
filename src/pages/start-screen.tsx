import { Stack, Image } from "@chakra-ui/react";
import backgroundImage from '../assets/start-screen.png'
import logo from '../assets/farming-saga-logo.png';
import WalletConnectButton from "../components/button/wallet-connect-button";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

export default function StartScreen() {
    const navigate = useNavigate();
    const { address, isConnected } = useAccount();

    useEffect(() => {
        if (isConnected && address) {
            navigate('/game');
            console.log("Navigating to game");
        }
    }, [isConnected, address, navigate]);
    return (
        <Stack
            width={'100%'}
            height={'100%'}
            backgroundImage={`url(${backgroundImage})`}
            backgroundSize={'cover'}
            backgroundPosition={'center'}
            backgroundAttachment={'fixed'}
            backgroundRepeat={'no-repeat'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Image src={logo} alt="logo" width={'700px'} />

            <WalletConnectButton text="Connect  Wallet  and  start  playing" />
        </Stack>
    )
}
