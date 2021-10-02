import { ChainId } from './network'

export enum EToken {
    DOPX = 'DOPX',
    TWX = 'TWX',
    KUSD = 'KUSD',
}

export interface IToken {
    symbol: string
    name: string
    icon: string
    chainId?: number
    address?: string
    oracle?: string
}

export const Token: { [key in EToken]: IToken } = {
    [EToken.DOPX]: {
        symbol: EToken.DOPX,
        name: 'DOP Exchange',
        icon: '/images/tokens/dopx.svg',
    },
    [EToken.TWX]: {
        symbol: EToken.TWX,
        name: 'Twindex Exchange',
        icon: '/images/tokens/twx.svg',
    },
    [EToken.KUSD]: {
        symbol: EToken.KUSD,
        name: 'Kelly USD',
        icon: '/images/tokens/kusd.svg',
    },
}

export const NetworkTokens: { [key: number]: IToken[] } = {
    [ChainId.BSC_MAINNET]: [
        {
            ...Token.DOPX,
            chainId: ChainId.BSC_MAINNET,
            address: '0x802A183ac9F6b082716DFeE55432ed0C04ACB49a',
            oracle: '0x3c0Bba9a0b4D920e2d1809D5952b883ABEEa6B5b',
        },
        {
            ...Token.TWX,
            chainId: ChainId.BSC_MAINNET,
            address: '0x41171D5770C4c68686d1aF042Ada88a45B02f82b',
            oracle: '0xefa90C080c6457c0A3B304BeF24f0CEb710C8426',
        },
        {
            ...Token.KUSD,
            chainId: ChainId.BSC_MAINNET,
            address: '0x940Ff63e82d15fb47371BFE5a4ed7D7D183dE1A5',
            oracle: '0x43d2A5589ee42a65D2fBf99c1Cb4Df976010a025',
        },
    ],
    [ChainId.BSC_TESTNET]: [
        {
            ...Token.TWX,
            chainId: ChainId.BSC_TESTNET,
            address: '0x722C794513eE04891518fAC0fAa457a0609c7F2A',
            oracle: '0xA45a7F6610905a014B1f67518aC8b195C460627c',
        },
        {
            ...Token.KUSD,
            chainId: ChainId.BSC_TESTNET,
            address: '0x28e52b30d00EB5185c8E7fAc5811E5B4417927A1',
            oracle: '0x4B50FE601742bC7d8aDa8F31de0F9164e57D3034',
        },
    ],
}
