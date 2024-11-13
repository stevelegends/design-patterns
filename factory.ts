
interface IPayload {
  amount: number;
  address: string;
  signature: string;
}

interface IETHPayload extends IPayload {
  publicKey: string;
  estimatedFee: number;
}

interface IBitcoinPayload extends IPayload {
  fee: number;
}

interface IChainFactory {
  sendETHToken: (payload: IETHPayload) => void;
  sendBitcoinToken: (payload: IBitcoinPayload) => void;
}

// Factory
const ChainFactory = (): IChainFactory => ({
  sendETHToken: (payload: IPayload) => {},
  sendBitcoinToken: (payload: IPayload) => {},
});

interface IChain {
  create: () => IChainFactory;
}
// Concrete Factory
const Chain: IChain = {
  create: () => {
    return ChainFactory();
  },
};

const chain = Chain.create();

chain.sendETHToken({
  publicKey: '---public-key---',
  signature: 'RSA encrypted',
  address: '0xA...',
  amount: 0.01,
  estimatedFee: 0.001,
});

chain.sendBitcoinToken({
  signature: 'RSA encrypted',
  address: '1BaX...',
  amount: 0.01,
  fee: 0.005,
});
