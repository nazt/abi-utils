import { BigNumber, constants, utils } from 'ethers'
import numeral from 'numeral'

// Constants
export const ONE_ETHER: BigNumber = utils.parseEther('1')

export const ONE_WEI: BigNumber = constants.One

export const ZERO: BigNumber = constants.Zero

export const HASH_ZERO: string = constants.HashZero

export const MAX_UINT_256: BigNumber = constants.MaxUint256

export const ADDRESS_ZERO: string = constants.AddressZero

export function fromWei(input: BigNumber): string {
    return utils.formatEther(input)
}

export function toWei(input: string): BigNumber {
    return utils.parseEther(input)
}

export function mul(a: BigNumber, b: BigNumber): BigNumber {
    return a.mul(b).div(ONE_ETHER)
}

export function div(a: BigNumber, b: BigNumber): BigNumber {
    try {
        return a.mul(ONE_ETHER).div(b)
    } catch (err) {
        return BigNumber.from(0)
    }
}

export function add(a: BigNumber, b: BigNumber): BigNumber {
    return a.add(b)
}

export function sub(a: BigNumber, b: BigNumber): BigNumber {
    return a.sub(b)
}

export function formatWithComma(a: BigNumber, decimal: number): string {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimal,
    }).format(parseFloat(utils.formatEther(a)))
}

export function formatWithDecimal(a: BigNumber, decimal: number): string {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimal,
        useGrouping: false,
    }).format(parseFloat(utils.formatEther(a)))
}

export function formatWithAbbr(a: BigNumber, decimal: number): string {
    const format = '0.' + ''.padEnd(decimal, '0') + 'a'
    return numeral(parseFloat(utils.formatEther(a))).format(format)
}
