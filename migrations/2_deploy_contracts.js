const CompoundIntegration = artifacts.require("./CompoundIntegration.sol");

// Rinkeby
const comptrollerAddress = "0x2EAa9D77AE4D8f9cdD9FAAcd44016E746485bddb";
const priceOracleAddress = "0x5722A3F60fa4F0EC5120DCD6C386289A4758D1b2";
const cETHAddress = "0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e";

const daiAddress = "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa";
const batAddress = "0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99";
const usdcAddress = "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b";
const usdtAddress = "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02";
const wbtcAddress = "0x577D296678535e4903D59A4C929B718e1D575e0A";
const zrxAddress = "0xddea378A6dDC8AfeC82C36E9b0078826bf9e68B6";

const cDaiAddress = "0x6D7F0754FFeb405d23C51CE938289d4835bE3b14";
const cBatAddress = "0xEBf1A11532b93a529b5bC942B4bAA98647913002";
const cUsdcAddress = "0x5B281A6DdA0B271e91ae35DE655Ad301C976edb1";
const cUsdtAddress = "0x2fB298BDbeF468638AD6653FF8376575ea41e768";
const cWbtcAddress = "0x0014F450B8Ae7708593F4A46F8fa6E5D50620F96";
const cZrxAddress = "0x52201ff1720134bBbBB2f6BC97Bf3715490EC19B";

const [DAI, BAT, USDC, USDT, WBTC, ZRX] = [
  "DAI",
  "BAT",
  "USDC",
  "USDT",
  "WBTC",
  "ZRX",
].map((ticker) => web3.utils.fromAscii(ticker));

const [cDAI, cBAT, cUSDC, cUSDT, cWBTC, cZRX] = [
  "cDAI",
  "cBAT",
  "cUSDC",
  "cUSDT",
  "cWBTC",
  "cZRX",
].map((ticker) => web3.utils.fromAscii(ticker));

module.exports = async (deployer) => {
  deployer.deploy(
    CompoundIntegration,
    comptrollerAddress,
    priceOracleAddress,
    cETHAddress
  );

  const COMP_Integration = await CompoundIntegration.deployed();

  await Promise.all([
    COMP_Integration.addToken(DAI, daiAddress),
    COMP_Integration.addToken(BAT, batAddress),
    COMP_Integration.addToken(USDC, usdcAddress),
    COMP_Integration.addToken(USDT, usdtAddress),
    COMP_Integration.addToken(WBTC, wbtcAddress),
    COMP_Integration.addToken(ZRX, zrxAddress),
  ]);

  await Promise.all([
    COMP_Integration.addCToken(cDAI, cDaiAddress, DAI, 18),
    COMP_Integration.addCToken(cBAT, cBatAddress, BAT, 18),
    COMP_Integration.addCToken(cUSDC, cUsdcAddress, USDC, 6),
    COMP_Integration.addCToken(cUSDT, cUsdtAddress, USDT, 18),
    COMP_Integration.addCToken(cWBTC, cWbtcAddress, WBTC, 8),
    COMP_Integration.addCToken(cZRX, cZrxAddress, ZRX, 18),
  ]);
};
