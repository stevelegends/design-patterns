
type Payload = {
    address: string,
    amount: number,
    message?: string,
}
interface Blockchain {
    sendTransaction: (payload: Payload) => void
}

const ETH: Blockchain = {
    sendTransaction: (payload: Payload) => {
        console.log('ETH::', payload)
    }
}

const BTC: Blockchain = {
    sendTransaction: (payload: Payload) => {
        console.log('BTC::', payload)
    }
}

const BNB: Blockchain = {
    sendTransaction: (payload: Payload) => {
        console.log('BNB::', payload)
    }
}

type Chain = 'ETH' | 'BTC' | 'BNB'
export const BlockChainFactory = (chain: Chain) => {
    const factory = {
        'ETH': ETH,
        'BTC': BTC,
        'BNB': BNB,
    }
    return factory[chain]
}

const ETHChain = BlockChainFactory('ETH')
ETHChain.sendTransaction({address: '0x123', amount: 0.001})

const BTCChain = BlockChainFactory('BTC');
BTCChain.sendTransaction({address: '0x123', amount: 0.001})

const BNBChain = BlockChainFactory('BNB');
BNBChain.sendTransaction({address: '0x123', amount: 0.001})
