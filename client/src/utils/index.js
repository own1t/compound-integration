import Web3 from "web3";

import CompoundIntegration from "../contracts/CompoundIntegration.json";
import IERC20 from "../contracts/IERC20.json";
import CTokenInterface from "../contracts/CTokenInterface.json";

export const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Accounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://localhost:9545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });
};

export const getContracts = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = CompoundIntegration.networks[networkId];
  const compound = new web3.eth.Contract(
    CompoundIntegration.abi,
    deployedNetwork && deployedNetwork.address
  );

  const tokens = await compound.methods.getTokens().call();
  const tokenContracts = tokens.reduce(
    (acc, token) => ({
      ...acc,
      [web3.utils.hexToUtf8(token.ticker)]: new web3.eth.Contract(
        IERC20.abi,
        token.tokenAddress
      ),
    }),
    {}
  );

  const cTokens = await compound.methods.getCTokens().call();
  const cTokenContracts = cTokens.reduce(
    (acc, cToken) => ({
      ...acc,
      [web3.utils.hexToUtf8(cToken.cTokenTicker)]: new web3.eth.Contract(
        CTokenInterface.abi,
        cToken.cTokenAddress
      ),
    }),
    {}
  );

  return { compound, ...tokenContracts, ...cTokenContracts };
};

export const getCTokenData = async (web3, compound, cToken) => {
  const cTokenAddress = cToken.cTokenAddress;
  const cTokenTicker = cToken.cTokenTicker;
  const cTokenSymbol = web3.utils.hexToUtf8(cTokenTicker);

  const underlyingSymbol = web3.utils.hexToUtf8(cToken.underlyingTicker);
  const underlyingAddress = cToken.underlyingAddress;
  const underlyingDecimals = cToken.underlyingDecimals;

  const underlyingBalance = await compound.methods
    .getUnderlyingBalance(cTokenTicker)
    .call();

  const fixedUnderlyingBalance =
    underlyingBalance / Math.pow(10, underlyingDecimals);

  const exchangeRate = await compound.methods
    .getExchangeRate(cTokenTicker)
    .call();

  const fixedExchangeRate = web3.utils.fromWei(exchangeRate, "ether");
  const mantissa = underlyingDecimals - 8;
  const cTokensInOneUnderlying = Math.pow(10, mantissa) / fixedExchangeRate;

  const collateral = cToken.collateral;

  return {
    cTokenAddress,
    cTokenTicker,
    cTokenSymbol,
    underlyingSymbol,
    underlyingAddress,
    underlyingDecimals,
    underlyingBalance,
    fixedUnderlyingBalance,
    cTokensInOneUnderlying,
    collateral,
  };
};

export const getCTokenBalances = async (web3, contracts, cToken) => {
  const cTokenSymbol = cToken.ticker;

  const supplyBalance = await contracts[cToken.ticker].methods
    .balanceOf(contracts.compound.options.address)
    .call();

  const fixedSupplyBalance = supplyBalance / Math.pow(10, 8);

  const borrowBalance = await contracts.compound.methods
    .getBorrowBalance(cToken.cTokenTicker)
    .call();

  // const fixedBorrowBalance = borrowBalance / Math.pow(10, 8);
  const fixedBorrowBalance = web3.utils.fromWei(borrowBalance, "ether");

  return {
    cTokenSymbol,
    supplyBalance,
    fixedSupplyBalance,
    borrowBalance,
    fixedBorrowBalance,
  };
};

export const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const capitalize = (s) => {
  if (typeof s !== "string") return "";

  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatNumber = (number) => `${new Number(number).toFixed(2)}`;
