enum Network {
  MAIN_NET = 'MAINNET',
  TEST_NET = 'TESTNET',
}

interface IPayload {
  amount: number;
  address: string;
  signature: string;
}

interface IChainFactory<Payload> {
  sendToken: (payload: Payload) => void;
}

// ETH Factory
interface ETHPayload extends IPayload {
  publicKey: string;
  estimatedFee: number;
}
interface ETHFactory extends IChainFactory<ETHPayload> {
  getNetwork?: () => Promise<Network>;
}
const ConcreteETHFactory = (): ETHFactory => ({
  sendToken(payload) {
    console.log('Send ETH with payload ', payload);
  },
  getNetwork() {
    return Promise.resolve(__DEV__ ? Network.TEST_NET : Network.MAIN_NET);
  },
});

// BTC Factory
interface BTCPayload extends IPayload {
  fee: number;
}
interface BTCFactory extends IChainFactory<BTCPayload> {}
const ConcreteBTCFactory = (): BTCFactory => ({
  sendToken(payload) {
    console.log('Send ETH with payload ', payload);
  },
});

// Concrete Factory
interface IFactory {
  create: <Factory>(factory: () => Factory) => Factory;
}
const ChainFactory: IFactory = {
  create: Factory => {
    return Factory();
  },
};

// Create Factory
const eth = ChainFactory.create(ConcreteETHFactory);
const btc = ChainFactory.create(ConcreteBTCFactory);

eth.sendToken({
  publicKey: '---public-key---',
  signature: 'RSA encrypted',
  address: '0xA...',
  amount: 0.01,
  estimatedFee: 0.001,
});

btc.sendToken({
  signature: 'RSA encrypted',
  address: '1BaX...',
  amount: 0.01,
  fee: 0.005,
});

// For example: extend a new Chain
interface BSCPayload extends IPayload {
  gasFee: number;
}
interface BSCFactory extends IChainFactory<BSCPayload> {
  getEstimatedFee: () => number;
}
const ConcreteBSCFactory = (): BSCFactory => ({
  sendToken(payload) {
    console.log('Send BSC with payload ', payload);
  },
  getEstimatedFee() {
    return 0.005;
  },
});

const bsc = ChainFactory.create(ConcreteBSCFactory);
bsc.sendToken({
  amount: 10,
  signature: '---signarure---',
  gasFee: 0.001,
  address: '0x8a8a...',
});
