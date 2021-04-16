import React, { useState } from "react";

import {
  DashboardContainer,
  Header,
  TokenOptionModal,
  CompoundOptionModal,
  ModalContent,
  Content,
  ContentLeft,
  ContentRight,
} from "./DashboardElements";
import { Button } from "@material-ui/core";

import ProgressBar from "../../../components/progress-bar";
import TokenList from "../../../components/token-list";
import CTokenList from "../../../components/cToken-list";
import Wallet from "../../../components/wallet";
import TokenOption from "../../../components/token-option";
import CompoundOption from "../../../components/compound-option";

const Dashboard = ({ web3, contracts }) => {
  const [tokenOptionToggle, setTokenOptionToggle] = useState(false);
  const [compoundOptionToggle, setCompoundOptionToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleTokenOptionToggle = () => {
    setIsOpen(!isOpen);
    setTokenOptionToggle(!tokenOptionToggle);
  };

  const handleCompoundOptionToggle = () => {
    setIsOpen(!isOpen);
    setCompoundOptionToggle(!compoundOptionToggle);
  };

  return (
    <DashboardContainer>
      <Header>
        <Button onClick={handleTokenOptionToggle}>Add Token</Button>
        <Button onClick={handleCompoundOptionToggle}>Compound</Button>

        <TokenOptionModal isOpen={isOpen}>
          <ModalContent>
            {tokenOptionToggle ? (
              <TokenOption
                web3={web3}
                contracts={contracts}
                toggle={handleTokenOptionToggle}
              />
            ) : null}
          </ModalContent>
        </TokenOptionModal>

        <CompoundOptionModal isOpen={isOpen}>
          <ModalContent>
            {compoundOptionToggle ? (
              <CompoundOption
                web3={web3}
                contracts={contracts}
                toggle={handleCompoundOptionToggle}
              />
            ) : null}
          </ModalContent>
        </CompoundOptionModal>
      </Header>

      <Content>
        <ContentLeft>
          <ProgressBar web3={web3} contracts={contracts} />
          <TokenList web3={web3} contracts={contracts} />
        </ContentLeft>

        <ContentRight>
          <CTokenList web3={web3} contracts={contracts} />

          <Wallet web3={web3} contracts={contracts} />
        </ContentRight>
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;
