import React, { useState } from "react";

import {
  Container,
  Header,
  Content,
  FormContainer,
  Form,
  Row,
  Col,
  InputBox,
} from "./TokenOptionElements";
import { Button } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { GET_USER } from "../../states/appSlice";

const TokenOption = ({ web3, contracts, toggle }) => {
  const user = useSelector(GET_USER);

  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const [cTokenSymbol, setCTokenSymbol] = useState("");
  const [cTokenAddress, setCTokenAddress] = useState("");
  const [underlyingSymbol, setUnderlyingSymbol] = useState("");
  const [underlyingDecimals, setUnderlyingDecimals] = useState("");

  const handleAddToken = async (e) => {
    e.preventDefault();

    try {
      await contracts.compound.methods
        .addToken(web3.utils.fromAscii(tokenSymbol), tokenAddress)
        .send({ from: user });

      setTokenSymbol("");
      setTokenAddress("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCToken = async (e) => {
    e.preventDefault();

    try {
      await contracts.compound.methods
        .addCToken(
          web3.utils.fromAscii(cTokenSymbol),
          cTokenAddress,
          web3.utils.fromAscii(underlyingSymbol),
          underlyingDecimals
        )
        .send({ from: user });

      setCTokenSymbol("");
      setCTokenAddress("");
      setUnderlyingSymbol("");
      setUnderlyingDecimals("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Header>
        <Clear onClick={toggle} />
      </Header>
      <Content>
        <FormContainer>
          <Form onSubmit={handleAddToken}>
            <h2>Add Token</h2>
            <Row>
              <Col>
                <InputBox>
                  <input
                    type="text"
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
                    required
                  />
                  <span className="text">Token Symbol</span>
                  <span className="line"></span>
                </InputBox>
              </Col>
              <Col>
                <InputBox>
                  <input
                    type="text"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                    required
                  />
                  <span className="text">Token Address</span>
                  <span className="line"></span>
                </InputBox>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </FormContainer>

        <FormContainer>
          <Form onSubmit={handleAddCToken}>
            <h2>Add cToken</h2>
            <Row>
              <Col>
                <InputBox>
                  <input
                    type="text"
                    value={cTokenSymbol}
                    onChange={(e) => setCTokenSymbol(e.target.value)}
                    required
                  />
                  <span className="text">cToken Symbol</span>
                  <span className="line"></span>
                </InputBox>
              </Col>
              <Col>
                <InputBox>
                  <input
                    type="text"
                    value={cTokenAddress}
                    onChange={(e) => setCTokenAddress(e.target.value)}
                    required
                  />
                  <span className="text">cToken Address</span>
                  <span className="line"></span>
                </InputBox>
              </Col>
            </Row>

            <Row>
              <Col>
                <InputBox>
                  <input
                    type="text"
                    value={underlyingSymbol}
                    onChange={(e) => setUnderlyingSymbol(e.target.value)}
                    required
                  />
                  <span className="text">Underlying Symbol</span>
                  <span className="line"></span>
                </InputBox>
              </Col>
              <Col>
                <InputBox>
                  <input
                    type="text"
                    value={underlyingDecimals}
                    onChange={(e) => setUnderlyingDecimals(e.target.value)}
                    required
                  />
                  <span className="text">Underlying Decimals</span>
                  <span className="line"></span>
                </InputBox>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default TokenOption;
