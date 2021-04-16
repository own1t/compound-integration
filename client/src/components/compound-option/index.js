import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { GET_USER } from "../../states/appSlice";

import { cTokens } from "../../utils/tokenList";

import { Clear } from "@material-ui/icons";
import {
  Container,
  Header,
  LongCard,
  CompoundForm,
  InputGroupContainer,
  Select,
  Option,
} from "./CompoundOptionElements";
import { Button } from "@material-ui/core";

const CompoundOption = ({ web3, contracts, toggle }) => {
  const user = useSelector(GET_USER);

  const [selectedToken, setSelectedCToken] = useState(cTokens[0].address);
  const [supplyAmount, setSupplyAmount] = useState(0);
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [borrowAmount, setBorrowAmount] = useState(0);
  const [repayAmount, setRepayAmount] = useState(0);

  useEffect(() => {
    // console.log(selectedToken);
  }, [selectedToken]);

  const handleSupply = async (e) => {
    e.preventDefault();

    const tokenAmount = web3.utils.toWei(supplyAmount, "ether");

    try {
      await contracts.compound.methods
        .supply(selectedToken, tokenAmount)
        .send({ from: user });

      setSupplyAmount(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRedeem = async (e) => {
    e.preventDefault();

    const tokenAmount = web3.utils.toWei(redeemAmount, "ether");

    try {
      await contracts.compound.methods
        .redeem(selectedToken, tokenAmount)
        .send({ from: user });

      setRedeemAmount(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBorrow = async (e) => {
    e.preventDefault();

    const tokenAmount = web3.utils.toWei(borrowAmount, "ether");

    try {
      await contracts.compound.methods
        .borrow(selectedToken, tokenAmount)
        .send({ from: user });

      setBorrowAmount(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRepay = async (e) => {
    e.preventDefault();

    const tokenAmount = web3.utils.toWei(repayAmount, "ether");

    try {
      await contracts.compound.methods
        .repayBorrow(selectedToken, tokenAmount)
        .send({ from: user });

      setRepayAmount(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Header>
        <Clear onClick={toggle} />
      </Header>
      <LongCard>
        <h2>COMPOUND</h2>
        <CompoundForm onSubmit={handleSupply}>
          <h3>Supply</h3>
          <InputGroupContainer>
            <Select onChange={(e) => setSelectedCToken(e.target.value)}>
              {cTokens.map((cToken, idx) => (
                <Option key={idx} value={cToken.address}>
                  {cToken.symbol}
                </Option>
              ))}
            </Select>

            <input
              type="number"
              value={supplyAmount}
              onChange={(e) => setSupplyAmount(e.target.value)}
              placeholder="Amount"
            />
            <Button type="submit">Submit</Button>
          </InputGroupContainer>
        </CompoundForm>

        <CompoundForm onSubmit={handleRedeem}>
          <h3>Redeem</h3>
          <InputGroupContainer>
            <Select onChange={(e) => setSelectedCToken(e.target.value)}>
              {cTokens.map((cToken, idx) => (
                <Option key={idx} value={cToken.address}>
                  {cToken.symbol}
                </Option>
              ))}
            </Select>

            <input
              type="number"
              value={redeemAmount}
              onChange={(e) => setRedeemAmount(e.target.value)}
              placeholder="Amount"
            />
            <Button type="submit">Submit</Button>
          </InputGroupContainer>
        </CompoundForm>
      </LongCard>

      <LongCard>
        <h2>INTEGRATION</h2>
        <CompoundForm onSubmit={handleBorrow}>
          <h3>Borrow</h3>
          <InputGroupContainer>
            <Select onChange={(e) => setSelectedCToken(e.target.value)}>
              {cTokens.map((cToken, idx) => (
                <Option key={idx} value={cToken.address}>
                  {cToken.symbol}
                </Option>
              ))}
            </Select>

            <input
              type="number"
              value={borrowAmount}
              onChange={(e) => setBorrowAmount(e.target.value)}
              placeholder="Amount"
            />
            <Button type="submit">Submit</Button>
          </InputGroupContainer>
        </CompoundForm>

        <CompoundForm onSubmit={handleRepay}>
          <h3>Repay</h3>
          <InputGroupContainer>
            <Select onChange={(e) => setSelectedCToken(e.target.value)}>
              {cTokens.map((cToken, idx) => (
                <Option key={idx} value={cToken.address}>
                  {cToken.symbol}
                </Option>
              ))}
            </Select>

            <input
              type="number"
              value={repayAmount}
              onChange={(e) => setRepayAmount(e.target.value)}
              placeholder="Amount"
            />
            <Button type="submit">Submit</Button>
          </InputGroupContainer>
        </CompoundForm>
      </LongCard>
    </Container>
  );
};

export default CompoundOption;
