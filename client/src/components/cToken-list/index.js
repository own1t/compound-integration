import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { GET_USER } from "../../states/appSlice";

import {
  CTokenCard,
  CTokenCardContent,
  CTokenListWrapper,
  CTokenItemHeader,
  CTokenItem,
  CTokenSymbol,
  SupplyBalance,
  BorrowBalance,
  InputRow,
  InputHeader,
  ButtonWrapper,
} from "./CTokenListElements";
import { Button } from "@material-ui/core";

import { getCTokenBalances, formatNumber } from "../../utils";

const CTokenList = ({ web3, contracts }) => {
  const user = useSelector(GET_USER);

  const [cTokens, setCTokens] = useState([]);

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

      setCTokens(cTokenBalances);
    };
    init();
  }, []);

  const handleClaimComp = async () => {
    try {
      await contracts.compound.methods.claimComp().send({ from: user });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CTokenCard>
      <CTokenCardContent>
        <CTokenListWrapper>
          <CTokenItemHeader>
            <CTokenSymbol>Asset</CTokenSymbol>
            <SupplyBalance>Supply Balance</SupplyBalance>
            <BorrowBalance>Borrow Balance</BorrowBalance>
          </CTokenItemHeader>
          {cTokens.map((cToken, idx) => (
            <CTokenItem key={idx}>
              <CTokenSymbol>{cToken.cTokenSymbol}</CTokenSymbol>
              <SupplyBalance>
                {formatNumber(cToken.fixedSupplyBalance)}
              </SupplyBalance>
              <BorrowBalance>
                {formatNumber(cToken.fixedBorrowBalance)}
              </BorrowBalance>
            </CTokenItem>
          ))}
        </CTokenListWrapper>

        <InputRow>
          <InputHeader></InputHeader>
          <ButtonWrapper>
            <Button onClick={handleClaimComp}>Claim COMP</Button>
          </ButtonWrapper>
        </InputRow>
      </CTokenCardContent>
    </CTokenCard>
  );
};

export default CTokenList;
