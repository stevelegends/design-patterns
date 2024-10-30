interface Chain {
    sendTransaction: (address: string, amount: number) => void
}

const EHT: Chain = {
    sendTransaction: (address, amount) => {
        console.log('send eth tx');
    }
}

const BTC: Chain = {
    sendTransaction(address, amount) {
        console.log('send btc tx');
    },
}

const ChainStrategy = (chain: Chain) => {
    return {
        executeSendTransaction: chain.sendTransaction,
    }
}

const eth = ChainStrategy(EHT);
eth.executeSendTransaction('0x11..', 100);

const btc = ChainStrategy(BTC);
btc.executeSendTransaction('i8Aa..', 0.001);
