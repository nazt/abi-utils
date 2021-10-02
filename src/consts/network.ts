export enum ENetwork {
    BSC_MAINNET = 'BSC_MAINNET',
    BSC_TESTNET = 'BSC_TESTNET',
    POLYGON_MAINNET = 'POLYGON_MAINNET',
    POLYGON_TESTNET = 'POLYGON_TESTNET',
    HARMONY_MAINNET = 'HARMONY_MAINNET',
    HARMONY_TESTNET = 'HARMONY_TESTNET',
}

// AddEthereumChainParameter
export interface INetwork {
    chainName: string
    chainId: number
    chainIdHex: string // A 0x-prefixed hexadecimal string
    nativeCurrency: {
        name: string
        symbol: string
        decimals: number
    }
    rpcUrls: string[]
    blockExplorerUrls: string[]
    iconUrls: string[]
}

export const Network: { [key in ENetwork]: INetwork } = {
    BSC_MAINNET: {
        chainName: 'BSC',
        chainId: 56,
        chainIdHex: '0x38',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed1.defibit.io/'],
        blockExplorerUrls: ['https://www.bscscan.com/tx/'],
        iconUrls: ['/images/icons/bsc-icon-no-text-dark.svg'],
    },
    BSC_TESTNET: {
        chainName: 'BSC Testnet',
        chainId: 97,
        chainIdHex: '0x61',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockExplorerUrls: ['https://testnet.bscscan.com/tx/'],
        iconUrls: ['/images/icons/bsc-icon-no-text.svg'],
    },
    POLYGON_MAINNET: {
        chainName: 'Polygon',
        chainId: 137,
        chainIdHex: '0x89',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: ['https://rpc-mainnet.matic.network/'],
        blockExplorerUrls: ['https://polygonscan.com/'],
        iconUrls: [''],
    },
    POLYGON_TESTNET: {
        chainName: 'Polygon Testnet',
        chainId: 80001,
        chainIdHex: '0x13881',
        nativeCurrency: {
            name: 'tMATIC',
            symbol: 'tMATIC',
            decimals: 18,
        },
        rpcUrls: ['https://rpc.maticvigil.com/'],
        blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com/'],
        iconUrls: [''],
    },
    HARMONY_MAINNET: {
        chainName: 'Harmony',
        chainId: 1666600000,
        chainIdHex: '0x63564c40',
        nativeCurrency: {
            name: 'ONE',
            symbol: 'ONE',
            decimals: 18,
        },
        rpcUrls: ['https://api.harmony.one/'],
        blockExplorerUrls: ['https://explorer.harmony.one/'],
        iconUrls: [''],
    },
    HARMONY_TESTNET: {
        chainName: 'Harmony Testnet',
        chainId: 1666700000,
        chainIdHex: '0x6357d2e0',
        nativeCurrency: {
            name: 'ONE',
            symbol: 'ONE',
            decimals: 18,
        },
        rpcUrls: ['https://api.s0.b.hmny.io/'],
        blockExplorerUrls: ['https://explorer.pops.one/'],
        iconUrls: [''],
    },
}

export const NetworkInt: { [key in number]: INetwork } = Object.values(Network)
    .map((n) => ({ [n.chainId]: { ...n } }))
    .reduce((a, v) => ({ ...a, ...v }))

export enum ChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GÖRLI = 5,
    KOVAN = 42,

    BSC_MAINNET = Network.BSC_MAINNET.chainId,
    BSC_TESTNET = Network.BSC_TESTNET.chainId,
    POLYGON_MAINNET = Network.POLYGON_MAINNET.chainId,
    POLYGON_TESTNET = Network.POLYGON_TESTNET.chainId,
    HARMONY_MAINNET = Network.HARMONY_MAINNET.chainId,
    HARMONY_TESTNET = Network.HARMONY_TESTNET.chainId,
}
