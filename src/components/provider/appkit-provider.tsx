import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { coreDao } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

const queryClient = new QueryClient()

const projectId = '6827be901e79821cf778380597d2c710'

const metadata = {
    name: 'Farming Saga',
    description: 'Farming Saga is a game designed by Snarklabs, This game is a simulator where you are given a farm and you have to upgrade and expand your farm empire',
    url: 'https://farmingsaga.com',
    icons: ['https://assets.reown.com/reown-profile-pic.png']
}

const networks = [coreDao]

const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true,
});

createAppKit({
    adapters: [wagmiAdapter],
    networks: [coreDao],
    projectId,
    metadata,
    features: {
        analytics: true,
        socials: []
    },
    defaultNetwork: coreDao,
    themeMode: 'light'
})

export function AppKitProvider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}
