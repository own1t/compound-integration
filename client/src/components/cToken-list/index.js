import React, { useState, useEffect } from "react";

import {
  CTokenCard,
  CTokenCardContent,
  CTokenListWrapper,
  CTokenItemHeader,
  CTokenItem,
  CTokenSymbol,
  SupplyBalance,
  BorrowBalance,
} from "./CTokenListElements";

import { getCTokenBalances, formatNumber } from "../../utils";

const CTokenList = ({ web3, contracts, setCTokenData }) => {
  const [cTokenBalances, setCTokenBalances] = useState([]);

  useEffect(() => {
    const init = async () => {
      const rawCTokens = await contracts.compound.methods.getCTokens().call();
      const cTokens = rawCTokens.map((cToken) => ({
        ...cToken,
        ticker: web3.utils.hexToUtf8(cToken.cTokenTicker),
      }));

      const cTokenBalances = await Promise.all(
        cTokens.map((cToken) => getCTokenBalances(web3, contracts, cToken))
      );

      setCTokenBalances(cTokenBalances);
      setCTokenData(cTokenBalances);
    };
    init();
  }, [cTokenBalances]);

  return (
    <CTokenCard>
      <CTokenCardContent>
        <CTokenListWrapper>
          <CTokenItemHeader>
            <CTokenSymbol>Asset</CTokenSymbol>
            <SupplyBalance>Supply Balance</SupplyBalance>
            <BorrowBalance>Borrow Balance</BorrowBalance>
          </CTokenItemHeader>
          {cTokenBalances.map((cToken, idx) => (
            <CTokenItem key={idx}>
              <CTokenSymbol>
                <a
                  href={`//rinkeby.etherscan.io/address/${cToken.cTokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cToken.cTokenSymbol}
                </a>
              </CTokenSymbol>
              <SupplyBalance>
                {formatNumber(cToken.fixedSupplyBalance)}
              </SupplyBalance>
              <BorrowBalance>
                {formatNumber(cToken.fixedBorrowBalance)}
              </BorrowBalance>
            </CTokenItem>
          ))}
        </CTokenListWrapper>
      </CTokenCardContent>
    </CTokenCard>
  );
};

export default CTokenList;
