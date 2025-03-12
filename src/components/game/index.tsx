import { useEffect, useRef } from 'react';
import { Unity, UnityConfig, useUnityContext } from 'react-unity-webgl';

interface GameProps {
    onGameLoaded?: () => void;
    onLoadingProgression?: (progression: number) => void;
    onGameUnloaded?: () => void;
    onMessage?: (event: string, message: string) => void;
    onUnityReady?: (sendMessage: (objectName: string, methodName: string, parameter?: any) => void) => void;
    unityConfig: UnityConfig;
}
function Game(props: GameProps) {
    const unityRef = useRef<HTMLCanvasElement>(null);
    const { unityProvider, sendMessage, unload, loadingProgression, isLoaded, UNSAFE__unityInstance } = useUnityContext(props.unityConfig);

    useEffect(() => {
        return () => {
            props.onGameUnloaded && props.onGameUnloaded();
            unityRef.current?.removeEventListener('click', minimizeFullScreen);
            unload();
        };
    }, [unload]);

    useEffect(() => {
        console.log("Unity component mounted");

        const handleUnityEvent = (e: Event) => {
            const cEvt = e as CustomEvent<{ event: string, data: any }>;
            props.onMessage?.(cEvt.detail.event, cEvt.detail.data);
        };

        window.addEventListener('UnityEvent', handleUnityEvent);

        return () => {
            window.removeEventListener('UnityEvent', handleUnityEvent);
        };
    }, [props.onMessage]);

    useEffect(() => {
        if (isLoaded) {
            props.onGameLoaded && props.onGameLoaded();
            props.onUnityReady && props.onUnityReady(sendMessage);
            unityRef.current?.addEventListener('click', minimizeFullScreen);
        }

        props.onLoadingProgression && props.onLoadingProgression(loadingProgression);
    }, [isLoaded]);

    function minimizeFullScreen() {
        UNSAFE__unityInstance?.SetFullscreen(false);
    }

    return (
        <Unity
            unityProvider={unityProvider}
            ref={unityRef}
            style={{
                width: '100%',
                height: '100%',
            }}
        />
    );
}

export default Game;