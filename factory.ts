interface IPayload {
  amount: number;
  address: string;
  signature: string;
}

interface IChainFactory<Payload> {
  sendToken: (payload: Payload) => void;
}

// ETH Factory
interface IETHPayload extends IPayload {
  publicKey: string;
  estimatedFee: number;
}
interface IETHFactory extends IChainFactory<IETHPayload> {}
const ETHFactory = (): IETHFactory => ({
  sendToken(payload) {
    console.log('Send ETH with payload ', payload);
  },
});

// BTC Factory
interface IBTCPayload extends IPayload {
  fee: number;
}
interface IBTCFactory extends IChainFactory<IBTCPayload> {}
const BTCFactory = (): IBTCFactory => ({
  sendToken(payload) {
    console.log('Send ETH with payload ', payload);
  },
});

// Concrete Factory
interface IFactory {
  create: <Factory>(
    factory: () => IChainFactory<Factory>,
  ) => IChainFactory<Factory>;
}
const ChainFactory: IFactory = {
  create: Factory => {
    return Factory();
  },
};

// Create Factory
const eth = ChainFactory.create(ETHFactory);
const btc = ChainFactory.create(BTCFactory);

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
interface IBSCPayload extends IPayload {
  gasFee: number;
}
interface IBSCFactory extends IChainFactory<IBSCPayload> {}
const BSCFactory = (): IBSCFactory => ({
  sendToken(payload) {
    console.log('Send BSC with payload ', payload);
  },
});

const bsc = ChainFactory.create(BSCFactory);
bsc.sendToken({
  amount: 10,
  signature: '---signarure---',
  gasFee: 0.001,
  address: '0x8a8a...',
});
