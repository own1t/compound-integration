import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { GET_USER } from "../../states/appSlice";

import { getCTokenData, truncate, formatNumber } from "../../utils";

import {
  TokenListContainer,
  TokenListWrapper,
  TokenItem,
  TokenIndex,
  TokenSymbol,
  TokenAddress,
  UnderlyingBalance,
  ExchangeRate,
  TokenMarket,
} from "./TokenListElements";
import RadioButton from "../button";
import LoadingContainer from "../../views/base/LoadingContainer";

const TokenList = ({ web3, contracts }) => {
  const user = useSelector(GET_USER);

  const [cTokens, setCTokens] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const compound = contracts.compound;

      const rawCTokens = await compound.methods.getCTokens().call();
      const cTokens = await Promise.all(
        rawCTokens.map((rawCToken) => getCTokenData(web3, compound, rawCToken))
      );

      setCTokens(cTokens);
    };
    init();
  }, [cTokens]);

  const handleEnterMarket = async (cToken) => {
    try {
      const symbol = web3.utils.hexToUtf8(cToken);

      await contracts.compound.methods.enterMarket(cToken).send({ from: user });

      console.log("ENTER");
      alert(`Market Enter for ${symbol} has proceeded`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleExitMarket = async (cToken) => {
    try {
      const symbol = web3.utils.hexToUtf8(cToken);

      await contracts.compound.methods.exitMarket(cToken).send({ from: user });

      console.log("EXIT");
      alert(`Market Exit for ${symbol} has proceeded`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!cTokens ? (
        <LoadingContainer />
      ) : (
        <TokenListContainer>
          <TokenListWrapper>
            <TokenItem>
              <TokenIndex>Asset</TokenIndex>
              <TokenSymbol></TokenSymbol>
              <TokenAddress>Address</TokenAddress>
              <ExchangeRate>Exchange Rate</ExchangeRate>
              <UnderlyingBalance>Underlying Balance</UnderlyingBalance>
              <TokenMarket>Collateral</TokenMarket>
            </TokenItem>
            {cTokens.map((cToken, idx) => (
              <TokenItem key={idx}>
                <TokenIndex>{idx + 1}</TokenIndex>
                <TokenSymbol>{cToken.underlyingSymbol}</TokenSymbol>
                <TokenAddress>
                  <a
                    href={`//rinkeby.etherscan.io/address/${cToken.underlyingAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {truncate(cToken.underlyingAddress, 25)}
                  </a>
                </TokenAddress>
                <ExchangeRate>
                  {formatNumber(cToken.cTokensInOneUnderlying)}
                </ExchangeRate>
                <UnderlyingBalance>
                  {formatNumber(cToken.fixedUnderlyingBalance)}
                </UnderlyingBalance>
                <TokenMarket>
                  {cToken.collateral ? (
                    <RadioButton
                      type="checkbox"
                      name="btn"
                      value={cToken.cTokenTicker}
                      defaultChecked={cToken.collateral}
                      onClick={(e) => handleExitMarket(e.target.value)}
                    />
                  ) : (
                    <RadioButton
                      type="checkbox"
                      name="btn"
                      value={cToken.cTokenTicker}
                      defaultChecked={cToken.collateral}
                      onClick={(e) => handleEnterMarket(e.target.value)}
                    />
                  )}
                </TokenMarket>
              </TokenItem>
            ))}
          </TokenListWrapper>
        </TokenListContainer>
      )}
    </>
  );
};

export default TokenList;
