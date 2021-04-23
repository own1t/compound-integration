import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { GET_USER } from "../../states/appSlice";

import {
  WalletCard,
  WalletForm,
  InputRow,
  InputHeader,
  InputLabel,
  InputBox,
  Select,
  Option,
  ButtonGroup,
  ButtonWrapper,
} from "./WalletElements";
import { Button } from "@material-ui/core";

import { formatNumber } from "../../utils";

const DIRECTION = {
  WITHDRAW: "WITHDRAW",
  DEPOSIT: "DEPOSIT",
};

const Wallet = ({ web3, contracts }) => {
  const user = useSelector(GET_USER);
  const [tokens, setTokens] = useState([]);

  const [selectedToken, setSelectedToken] = useState(undefined);
  const [balance, setBalance] = useState(0);

  const [direction, setDirection] = useState(DIRECTION.DEPOSIT);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const init = async () => {
      const rawTokens = await contracts.compound.methods.getTokens().call();
      const tokens = rawTokens.map((token) => ({
        ...token,
        ticker: web3.utils.hexToUtf8(token.ticker),
      }));

      if (tokens.length > 0) {
        const balance = await getBalance(tokens[0].ticker);

        setSelectedToken(tokens[0].ticker);
        setBalance(balance);
      }

      setTokens(tokens);
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      const balance = await getBalance(selectedToken);
      setBalance(balance);
    };
    if (typeof selectedToken !== "undefined") {
      init();
    }
  }, [selectedToken]);

  const getBalance = async (token) => {
    const tokenBalance = await contracts[token].methods
      .balanceOf(contracts.compound.options.address)
      .call();

    const balance = web3.utils.fromWei(tokenBalance);

    return balance;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tokenAmount = web3.utils.toWei(amount, "ether");

    if (direction === DIRECTION.DEPOSIT) {
      try {
        await contracts[selectedToken].methods
          .approve(contracts.compound.options.address, tokenAmount)
          .send({ from: user });

        await contracts.compound.methods
          .deposit(web3.utils.fromAscii(selectedToken), tokenAmount)
          .send({ from: user });

        const balance = await getBalance(selectedToken);
        setBalance(balance);

        setAmount(0);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await contracts.compound.methods
          .withdraw(web3.utils.fromAscii(selectedToken), tokenAmount)
          .send({ from: user });

        const balance = await getBalance(selectedToken);
        setBalance(balance);

        setAmount(0);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <WalletCard>
      <WalletForm onSubmit={handleSubmit}>
        <h2>{selectedToken}</h2>
        <InputRow>
          <InputHeader>
            <h3>Balance for {selectedToken}</h3>
          </InputHeader>
          <ButtonWrapper>
            <Select onChange={(e) => setSelectedToken(e.target.value)}>
              {tokens.map((token, idx) => (
                <Option key={idx} value={token.ticker}>
                  {token.ticker}
                </Option>
              ))}
            </Select>
          </ButtonWrapper>
        </InputRow>

        <InputRow>
          <InputLabel>
            <label>Balance</label>
          </InputLabel>
          <InputBox>
            <input type="number" value={formatNumber(balance)} readOnly />
          </InputBox>
        </InputRow>

        <InputRow>
          <InputLabel>
            <label>Direction</label>
          </InputLabel>
          <InputBox>
            <ButtonGroup>
              <Button
                className={direction === DIRECTION.DEPOSIT ? "active" : ""}
                onClick={() => setDirection(DIRECTION.DEPOSIT)}
              >
                DEPOSIT
              </Button>
              <Button
                className={direction === DIRECTION.WITHDRAW ? "active" : ""}
                onClick={() => setDirection(DIRECTION.WITHDRAW)}
              >
                WITHDRAW
              </Button>
            </ButtonGroup>
          </InputBox>
        </InputRow>

        <InputRow>
          <InputLabel>
            <label>Amount</label>
          </InputLabel>
          <InputBox>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} />
          </InputBox>
        </InputRow>

        <InputRow>
          <InputHeader></InputHeader>
          <ButtonWrapper>
            <Button type="submit">SUBMIT</Button>
          </ButtonWrapper>
        </InputRow>
      </WalletForm>
    </WalletCard>
  );
};

export default Wallet;
