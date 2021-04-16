import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { SET_CONTRACT_ADDRESS, SET_USER } from "../../states/appSlice";

import { getWeb3, getContracts } from "../../utils";

import styled from "styled-components";

import Header from "../../components/header";
import Dashboard from "../app/dashboard";
import LoadingContainer from "./LoadingContainer";

const App = () => {
  const dispatch = useDispatch();

  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contracts, setContracts] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const contracts = await getContracts(web3);
      const accounts = await web3.eth.getAccounts();

      dispatch(
        SET_USER({
          user: accounts[0],
        })
      );

      dispatch(
        SET_CONTRACT_ADDRESS({
          contract_address: contracts.compound.options.address,
        })
      );

      setWeb3(web3);
      setContracts(contracts);
      setAccounts(accounts);
    };
    init();
  }, []);

  return (
    <>
      {typeof web3 !== "undefined" &&
      typeof contracts !== "undefined" &&
      accounts.length > 0 ? (
        <>
          <Header />
          <Container>
            <Section>
              <Dashboard web3={web3} contracts={contracts} />
            </Section>
          </Container>
        </>
      ) : (
        <LoadingContainer />
      )}
    </>
  );
};

const Container = styled.div`
  height: 80vh;
  width: 100%;
  background: #000;
`;

const Section = styled.div`
  /* border: 1px solid red; */

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 97vh;
  background: #0a0a0a;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 400px;
    background: #fff;
    clip-path: polygon(100% 50%, 0 100%, 100% 100%);
  }

  .content {
    position: relative;
    max-width: 900px;
    text-align: center;
  }

  .content > h2 {
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 5em;
  }

  .content > p {
    color: #fff;
    font-size: 1.5em;
  }
`;

export default App;
