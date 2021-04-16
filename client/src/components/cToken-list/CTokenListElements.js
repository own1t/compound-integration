import styled from "styled-components";

export const CTokenCard = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

export const CTokenCardContent = styled.div`
  position: relative;
  width: 100%;
  margin: 10px auto 0;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
`;

export const CTokenListWrapper = styled.ul`
  padding: 0;
`;

export const CTokenItemHeader = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  color: #fff;
  background: #000;
  width: 90%;
  margin: 5px auto;
  padding: 10px 20px;

  > span:nth-child(1) {
    width: 20%;
  }

  > span:nth-child(2) {
    width: 35%;
  }

  > div:nth-child(3) {
    width: 45%;
  }
`;

export const CTokenItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 90%;
  color: #000;
  margin: 5px auto;
  padding: 10px 20px;
  transition: 0.5s;
  text-align: center;

  > span:nth-child(1) {
    width: 20%;
  }

  > span:nth-child(2) {
    width: 35%;
  }

  > div:nth-child(3) {
    width: 45%;
  }

  &:hover {
    color: #04d394;
  }
`;

export const CTokenSymbol = styled.span``;

export const SupplyBalance = styled.span``;

export const BorrowBalance = styled.span``;

export const InputRow = styled.div`
  /* border: 1px solid red; */

  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const InputHeader = styled.div`
  /* border: 1px solid red; */

  position: relative;
  flex: 0.84;

  > h3 {
    font-size: 1.8em;
    z-index: 1;
    color: #000;
    margin: 0;
    margin-bottom: 5px;
  }
`;

export const ButtonWrapper = styled.div`
  position: relative;
  flex: 0.15;

  > button {
    color: #04d394;
    padding: 7px;
    border: 1px solid #04d394;
    width: 200px;

    &:hover {
      background: #04d394;
      color: #fff;
    }
  }
`;
