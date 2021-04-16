import styled from "styled-components";

export const TokenListContainer = styled.div`
  /* border: 1px solid red; */

  position: relative;
  display: flex;
  width: 100%;
`;

export const TokenListWrapper = styled.ul`
  position: relative;
  width: 100%;
  margin: 10px auto 0;
  padding: 20px;
  box-sizing: border-box;
  /* background: rgba(0, 0, 0, 0.1); */
  /* box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2); */
  background: rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  overflow: hidden;

  > h3 {
    margin-left: 10px;
  }
`;

export const TokenItem = styled.li`
  display: flex;
  align-items: center;

  width: 90%;
  /* background: rgba(255, 255, 255, 0.1); */
  background: #000;
  color: #fff;
  margin: 5px auto;
  padding: 10px 20px;
  transition: 0.5s;

  > span:nth-child(1) {
    width: 7%;
  }

  > span:nth-child(2) {
    width: 10%;
  }

  > span:nth-child(3) {
    width: 35%;
  }

  > span:nth-child(4) {
    width: 20%;
    text-align: center;
  }

  > span:nth-child(5) {
    width: 20%;
    text-align: center;
  }

  > div:nth-child(6) {
    width: 25%;
    text-align: right;
  }

  &:hover {
    transform: scale(1.06);
    background: #000;
    color: #04d394;

    button {
      color: #04d394;
      border: 1px solid #04d394;
    }
  }
`;

export const TokenIndex = styled.span``;

export const TokenSymbol = styled.span``;

export const TokenAddress = styled.span``;

export const UnderlyingBalance = styled.span``;

export const ExchangeRate = styled.span``;

export const TokenMarket = styled.span``;
