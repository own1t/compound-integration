import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { GET_CONTRACT_ADDRESS, GET_USER } from "../../states/appSlice";

import { HorizontalSplit } from "@material-ui/icons";
import {
  Nav,
  NavContainer,
  NavLogo,
  NavMenu,
  NavBox,
  NavBox2,
} from "./HeaderElements";

import { truncate } from "../../utils";

const Header = () => {
  const user = useSelector(GET_USER);
  const contractAddress = useSelector(GET_CONTRACT_ADDRESS);

  useEffect(() => {}, [user]);

  return (
    <Nav>
      <NavContainer>
        <NavLogo href="https://compound-5991e.web.app/">
          <HorizontalSplit />
          <h1>Compound Integration</h1>
        </NavLogo>

        <NavMenu>
          <NavBox2>
            <h4>Contract Address: </h4>
            <a
              href={`//rinkeby.etherscan.io/address/${contractAddress}`}
              target="_blank"
              without
              rel="noopener noreferrer"
            >
              {truncate(contractAddress, 15)}
            </a>
          </NavBox2>

          <NavBox>
            <h4>Current Account: </h4>
            <a
              href={`//rinkeby.etherscan.io/address/${user}`}
              target="_blank"
              without
              rel="noopener noreferrer"
            >
              {truncate(user, 13)}
            </a>
          </NavBox>
        </NavMenu>
      </NavContainer>
    </Nav>
  );
};

export default Header;
