import { Stack } from "@chakra-ui/react";
import Game from "../components/game";
import { useEffect, useState } from "react";
import OverlayLoader from "../components/loader/overlay-loader";
import { useAppKit } from "@reown/appkit/react";
import { toaster } from '../components/ui/toaster';
import { useAccount, useWriteContract } from "wagmi";
import axios from "axios";
import SimpleLoader from "../components/loader/simple-loader";
import abi from '../abis/abi.json';

export default function GameScreen() {
    const { open } = useAppKit();
    const bCaller = useWriteContract();
    const { address } = useAccount();

    const [loading, setLoading] = useState(false);
    const [loaderText, setLoaderText] = useState("Loading...");

    const [gameLoaded, setGameLoaded] = useState(false);

    const [message, setMessage] = useState<{ event: string, data: any }>({ event: "NONE", data: null });
    const [event, triggerEvent] = useState<{ trigger: 'BUY_DIAMONDS' | 'FREE_CASH' | 'MAGNET_BOOSTER' | '2X_CASH' | 'SPEED_BOOSTER' | 'NONE', data: any | undefined }>({ trigger: "NONE", data: null });
    const [sendUnityMessage, setSendUnityMessage] = useState<((objectName: string, methodName: string, parameter?: any) => void) | null>(null);

    useEffect(() => {
        if (bCaller.isPending === true) {
            setLoading(true);
            setLoaderText("Transaction in progress...");
        }
    }, [bCaller.isPending]);

    useEffect(() => {
        if (bCaller.isError === true) {
            setLoading(false);
            toaster.create({
                title: 'Something went wrong :(',
                description: bCaller.error.message || 'An error occurred while proceeding your request, Please try again later.',
                duration: 6000,
                type: 'error'
            });
            console.log(bCaller.error);
            triggerEvent({ trigger: "NONE", data: null });
        }
    }, [bCaller.isError]);

    useEffect(() => {
        if (bCaller.isSuccess === true) {
            setLoading(false);
            toaster.create({
                title: 'Transaction Successful!',
                description: 'Your transaction has been successfully processed.',
                action: {
                    label: 'View on Explorer',
                    onClick: () => {
                        window.open(`https://scan.coredao.org/tx/${bCaller.data}`, '_blank');
                    }
                },
                duration: 6000,
                type: 'success'
            });
            TakeEventAction({ trigger: event.trigger, data: event.data });
        }
    }, [bCaller.isSuccess]);

    useEffect(() => {
        if (message.event === "ShowWeb3Modal") {
            open();
        }
        else if (message.event === "FaucetAPI") {
            RedeemDailyReward();
        }
        else if (message.event === "FREE_CASH") {
            handleFreeCash();
        }
        else if (message.event === "SPEED_BOOSTER") {
            handleSpeedBooster();
        }
    }, [message]);

    useEffect(() => {
        if (gameLoaded === true && address) {
            CheckDailyRewardEligibility(address);
        }
    }, [gameLoaded, address]);

    async function CheckDailyRewardEligibility(address: `0x${string}`) {
        try {
            const { data: request } = await axios.get(`https://0bx8mf3vz4.execute-api.us-east-1.amazonaws.com/production/faucet/check/${address}`);
            if (request.status === "success") {
                if (request?.data?.eligible === false) {
                    sendUnityMessage?.("MainMenu_Manager", "HideFaucetBtn");
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    function TakeEventAction({ trigger }: { trigger: 'BUY_DIAMONDS' | 'FREE_CASH' | 'MAGNET_BOOSTER' | '2X_CASH' | 'SPEED_BOOSTER' | 'NONE', data: any | undefined }) {
        if (trigger === "NONE") return;

        if (trigger === "FREE_CASH") {
            const [gameObject, methodName] = message.data.split(',');
            sendUnityMessage?.(gameObject, methodName);
        }

        if (trigger === "SPEED_BOOSTER") {
            const [gameObject, methodName] = message.data.split(',');
            sendUnityMessage?.(gameObject, methodName);
        }
    }

    async function handleFreeCash() {
        try {
            await bCaller.writeContract({
                address: "0x20B218a94DC84f780474E701231a3f34Fe12307f",
                abi,
                functionName: 'moneyBox'
            });
            triggerEvent({ trigger: "FREE_CASH", data: null });
        } catch (error: any) {
            console.error('Transaction error:', error);
            toaster.create({
                title: 'Transaction Failed',
                description: error?.message || 'Failed to process your purchase. Please try again.',
                duration: 6000,
                type: 'error'
            });
            triggerEvent({ trigger: "NONE", data: null });
            setLoading(false);
        }
    }

    async function handleSpeedBooster() {
        try {
            await bCaller.writeContract({
                address: "0x20B218a94DC84f780474E701231a3f34Fe12307f",
                abi,
                functionName: 'unlock'
            });
            triggerEvent({ trigger: "SPEED_BOOSTER", data: null });
        } catch (error: any) {
            console.error('Transaction error:', error);
            toaster.create({
                title: 'Transaction Failed',
                description: error?.message || 'Failed to process your purchase. Please try again.',
                duration: 6000,
                type: 'error'
            });
            triggerEvent({ trigger: "NONE", data: null });
            setLoading(false);
        }
    }

    async function RedeemDailyReward() {
        try {
            if (!address) {
                open();
                return;
            }

            setLoading(true);
            setLoaderText("Redeeming Daily Reward...");
            const axiosRequest = await axios.post('https://0bx8mf3vz4.execute-api.us-east-1.amazonaws.com/production/faucet', {
                address: address
            });

            const request = axiosRequest.data;

            if (request.status === "success") {
                toaster.create({
                    title: 'Daily Reward Redeemed',
                    description: 'You have redeemed your daily reward of 0.01TCORE',
                    action: {
                        label: 'View on Explorer',
                        onClick: () => {
                            window.open(`https://scan.coredao.org/tx/${request.data?.txHash}`, '_blank');
                        }
                    },
                    duration: 6000,
                    type: 'success'
                });
                await CheckDailyRewardEligibility(address);
            }
            else {
                toaster.create({
                    title: 'You\'ve already claimed your daily reward today.',
                    description: `Come back tomorrow to claim your daily reward.`,
                    duration: 6000,
                    type: 'error'
                });
            }
        }
        catch (error) {
            console.log(error);
            toaster.create({
                title: 'Something went wrong :(',
                description: 'An error occurred while proceeding your request, Please try again later.',
                duration: 6000,
                type: 'error'
            });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Stack
            width={'100%'}
            height={'100%'}
        >

            {
                !gameLoaded && (
                    <OverlayLoader />
                )
            }
            {
                loading && (
                    <SimpleLoader text={loaderText} />
                )
            }
            <Game
                onGameLoaded={() => {
                    setGameLoaded(true);
                }}
                onGameUnloaded={() => {
                    setGameLoaded(false);
                }}
                onMessage={(event, data) => {
                    setMessage({ event, data });
                }}
                onUnityReady={(sendMessage) => {
                    setSendUnityMessage(() => sendMessage);
                }}
                unityConfig={{
                    loaderUrl: '/farming-saga/Build/farming-saga.loader.js',
                    dataUrl: '/farming-saga/Build/farming-saga.data.br',
                    frameworkUrl: '/farming-saga/Build/farming-saga.framework.js.br',
                    codeUrl: '/farming-saga/Build/farming-saga.wasm.br',
                    companyName: 'Farming Saga Developers',
                    productName: 'Farming Saga',
                    productVersion: '0'
                }}
            />
        </Stack>
    )
}
