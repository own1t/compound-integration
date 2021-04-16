const tokens = [
  {
    name: "Basic Attention Token",
    symbol: "BAT",
    decimals: 18,
    address: "0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99",
  },
  {
    name: "Dai",
    symbol: "DAI",
    decimals: 18,
    address: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
  },
  {
    name: "Compound USDT",
    symbol: "USDT",
    decimals: 18,
    address: "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02",
  },
  {
    name: "Wrapped BTC",
    symbol: "WBTC",
    decimals: 8,
    address: "0x577D296678535e4903D59A4C929B718e1D575e0A",
  },
  {
    name: "0x",
    symbol: "ZRX",
    decimals: 18,
    address: "0xddea378A6dDC8AfeC82C36E9b0078826bf9e68B6",
  },
];

const cTokens = [
  {
    name: "Compound Basic Attention Token",
    symbol: "cBAT",
    decimals: 8,
    underlying: "0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99",
    underlyingSymbol: "BAT",
    underlyingDecimals: 18,
    contract: "CErc20",
    address: "0xEBf1A11532b93a529b5bC942B4bAA98647913002",
  },
  {
    name: "Compound Dai",
    symbol: "cDAI",
    decimals: 8,
    underlying: "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
    underlyingSymbol: "DAI",
    underlyingDecimals: 18,
    contract: "CErc20",
    address: "0x6D7F0754FFeb405d23C51CE938289d4835bE3b14",
  },

  {
    name: "Compound USD Coin",
    symbol: "cUSDC",
    decimals: 8,
    underlying: "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
    underlyingSymbol: "USDC",
    underlyingDecimals: 6,
    contract: "CErc20",
    address: "0x5B281A6DdA0B271e91ae35DE655Ad301C976edb1",
  },
  {
    name: "Compound USDT",
    symbol: "cUSDT",
    decimals: 8,
    underlying: "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02",
    underlyingSymbol: "USDT",
    underlyingDecimals: 18,
    contract: "CErc20",
    address: "0x2fB298BDbeF468638AD6653FF8376575ea41e768",
  },
  {
    name: "Compound Wrapped BTC",
    symbol: "cWBTC",
    decimals: 8,
    underlying: "0x577D296678535e4903D59A4C929B718e1D575e0A",
    underlyingSymbol: "WBTC",
    underlyingDecimals: 8,
    contract: "CErc20",
    address: "0x0014F450B8Ae7708593F4A46F8fa6E5D50620F96",
  },
  {
    name: "Compound 0x",
    symbol: "cZRX",
    decimals: 8,
    underlying: "0xddea378A6dDC8AfeC82C36E9b0078826bf9e68B6",
    underlyingSymbol: "ZRX",
    underlyingDecimals: 18,
    contract: "CErc20",
    address: "0x52201ff1720134bBbBB2f6BC97Bf3715490EC19B",
  },
];

const cETH = {
  name: "Compound Ethereum",
  symbol: "cETH",
  decimals: 8,
  underlying: "",
  underlyingSymbol: "ETH",
  contract: "CEther",
  address: "0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e",
};

export { tokens, cTokens, cETH };
