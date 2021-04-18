import styled from "styled-components";

export const DashboardContainer = styled.div`
  /* border: 1px solid red; */

  position: relative;
  border-radius: 5px;
  width: 100%;
  height: 80vh;
  color: #fff;
`;

export const Header = styled.div`
  /* border: 1px solid red; */

  display: flex;

  width: 100%;
  height: 80px;

  > button {
    margin-left: auto;
    right: 400px;
    color: #04d394;
  }
`;

export const TokenOptionModal = styled.div`
  /* border: 1px solid red; */

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "0")};
  width: 800px;
  padding: 80px 50px 50px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  transition: 0.5s;
`;

export const CompoundOptionModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "0")};
  width: 85%;
  padding: 80px 50px 50px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  transition: 0.5s;
`;

export const ModalContent = styled.div``;

export const Content = styled.div`
  /* border: 1px solid red; */

  display: flex;
`;

export const ContentLeft = styled.div`
  /* border: 1px solid red; */

  position: relative;
  flex: 0.6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  color: #fff;
`;

export const ContentRight = styled.div`
  /* border: 1px solid red; */

  position: relative;
  flex: 0.3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 1;
  border-radius: 5px;
  color: #fff;
`;
