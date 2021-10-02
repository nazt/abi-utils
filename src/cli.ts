import Web3 from 'web3';
import { NetworkInt } from './consts/network';
import { HttpProviderOptions } from 'web3-core-helpers'
import { AbiItem } from 'web3-utils'
import { Interface } from '@ethersproject/abi'
import { NetworkTokens } from './consts/token';
import { div, fromWei, toWei } from './utils/math';
const abiUniswapPairOracle = [
    {
        "inputs": [
            { "internalType": "address", "name": "factory", "type": "address" },
            { "internalType": "address", "name": "tokenA", "type": "address" },
            { "internalType": "address", "name": "tokenB", "type": "address" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "PERIOD",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "blockTimestampLast",
        "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "token", "type": "address" },
            { "internalType": "uint256", "name": "amountIn", "type": "uint256" }
        ],
        "name": "consult",
        "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "price0Average",
        "outputs": [{ "internalType": "uint224", "name": "_x", "type": "uint224" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "price0CumulativeLast",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "price1Average",
        "outputs": [{ "internalType": "uint224", "name": "_x", "type": "uint224" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "price1CumulativeLast",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token0",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token1",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    { "inputs": [], "name": "update", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
]

const abiMulticall = [
    {
        "constant": true,
        "inputs": [],
        "name": "getCurrentBlockTimestamp",
        "outputs": [{ "name": "timestamp", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "components": [
                    { "name": "target", "type": "address" },
                    { "name": "callData", "type": "bytes" }
                ],
                "name": "calls",
                "type": "tuple[]"
            }
        ],
        "name": "aggregate",
        "outputs": [
            { "name": "blockNumber", "type": "uint256" },
            { "name": "returnData", "type": "bytes[]" }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getLastBlockHash",
        "outputs": [{ "name": "blockHash", "type": "bytes32" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{ "name": "addr", "type": "address" }],
        "name": "getEthBalance",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCurrentBlockDifficulty",
        "outputs": [{ "name": "difficulty", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCurrentBlockGasLimit",
        "outputs": [{ "name": "gaslimit", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCurrentBlockCoinbase",
        "outputs": [{ "name": "coinbase", "type": "address" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{ "name": "blockNumber", "type": "uint256" }],
        "name": "getBlockHash",
        "outputs": [{ "name": "blockHash", "type": "bytes32" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]

const chainId = 56
const network = NetworkInt[chainId]
const token = NetworkTokens[chainId][0]
// token
const httpProvider = new Web3.providers.HttpProvider(network.rpcUrls[0], {
    timeout: 10000,
} as HttpProviderOptions)

// console.log(abiUniswapPairOracle)
const web3 = new Web3(httpProvider)
// console.log(token.oracle)

// ; (async function () {
//     const client = new web3.eth.Contract(
//         [{
//             "inputs": [
//                 { "internalType": "address", "name": "token", "type": "address" },
//                 { "internalType": "uint256", "name": "amountIn", "type": "uint256" }
//             ],
//             "name": "consult",
//             "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }],
//             "stateMutability": "view",
//             "type": "function"
//         }] as any as AbiItem,
//         '0x3c0Bba9a0b4D920e2d1809D5952b883ABEEa6B5b'
//     )
//     await client.methods.consult(token.address, toWei("1").toString()).call()
// })()

// ; (async function () {
//     const client = new web3.eth.Contract(
//         abiMulticall as unknown as AbiItem,
//         '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c'
//     )
//     console.log(client)

//     const itf = new Interface(abiUniswapPairOracle)
//     console.log(itf)

//     const call = {
//         address: token.oracle,
//         name: 'consult',
//         params: [token.address, toWei('1').toString()],
//     }

//     console.log(token.oracle)

//     const addr = call?.address?.toLowerCase()
//     const calldata = [
//         [addr, itf.encodeFunctionData(call.name, call.params)]
//     ]

//     console.log(calldata)
//     console.log(call)

//     !(async function () {
//         const { returnData } = await client.methods.aggregate(calldata).call()
//         const res = returnData.map((call: any, i: number) => itf.decodeFunctionResult('consult', call))
//         console.log(res[0].toString())
//     })()
// })();


// ; (async function () {
//     setInterval(async function () {
//         const client = new web3.eth.Contract(
//             dopxKusdPair as any as AbiItem,
//             '0x08422f6Cc26cCDa692a36a73A520Da6b0E6d3DE3'
//         )
//         // console.log(client.methods)
//         // console.log(await client.methods.token0().call())
//         // console.log(await client.methods.token1().call())
//         // console.log( output._reserve0))
//         const output = await client.methods.getReserves().call()
//         console.log(fromWei(div(toWei(output._reserve1), toWei(output._reserve0))))

//     }, 500);
// })()

import { Contract, ContractOptions } from 'web3-eth-contract';
const client = new web3.eth.Contract(
    [{
        "inputs": [
            { "internalType": "address", "name": "token", "type": "address" },
            { "internalType": "uint256", "name": "amountIn", "type": "uint256" }
        ],
        "name": "consult",
        "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }] as any as AbiItem,
    '0x3c0Bba9a0b4D920e2d1809D5952b883ABEEa6B5b'
)

// function zip(...args: any[]) {
//     return args.reduce((acc, val) => {
//         return acc.map((x: any, i: any) => [x, val[i]])
//     }, [[]]) as any
// }

async function callMethods(contract: Contract, methods: any[]) {
    const promisses: any = []
    // const called = []
    // console.log(contract)
    // const answer: any = {}
    for (const [idx, method] of Object.entries(methods)) {
        const fn = contract.methods[`${method.name}`]
        if (!method.name) return
        if (!fn) throw new Error(`method ${method.name} not found`)

        try {
            promisses[idx] = fn
                .apply(contract.methods, method.params || [])
                .call()
        }
        catch (e) {
            promisses[idx] = new Promise((resolve, reject) => reject(e))
            throw e
        }

    }
    let results: any = await Promise.allSettled(promisses)
    return results.map((result: any, idx: number) => {
        if (result.status === 'fulfilled') {
            return result.value
        }
        else {
            return result.reason
        }
    })
    // return results
}
// const zeroParamsMethods = Object.values(abiTableData.indexedFuncs)
// .filter((it) => it.inputs.length == 0 && it.stateMutability == 'view')
// .map((it) => Object.assign({ name: it.name })

!(async function () {
    let results = await callMethods(client, [
        {
            name: 'consultx',
            params: [token.address, toWei('1').toString()]
        },
        {
            name: 'consult',
            params: [token.address, toWei('1').toString()]
        }
    ])
    console.log(results)
})();


    // callMethods(contract, zeroParamsMethods)