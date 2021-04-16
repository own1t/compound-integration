import styled from "styled-components";

export const WalletCard = styled.div`
  position: relative;
  width: 550px;
  height: 330px;
  margin: 30px;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  background: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
`;

export const WalletForm = styled.form`
  position: relative;
  width: 100%;
  padding: 20px;
  transition: 0.5s;

  > h2 {
    position: absolute;
    top: -250px;
    right: 0;
    opacity: 0.2;
    font-size: 20em;
    color: #04d394;
    pointer-events: none;
  }
`;

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

export const InputLabel = styled.div`
  /* border: 1px solid red; */

  position: relative;
  flex: 0.3;
  color: #04d394;

  > label {
  }
`;

export const InputBox = styled.div`
  /* border: 1px solid red; */

  position: relative;
  flex: 0.7;
  display: flex;
  align-items: center;
  color: #04d394;
  margin: 10px;

  > button {
    color: #04d394;
    padding: 7px;
    border: 1px solid #04d394;
  }

  > input {
    width: 100%;
    padding: 12px;
    border: 1px solid #04d394;
    border-radius: 6px;
    outline: none;
  }
`;

export const ButtonGroup = styled.div`
  position: relative;
  width: 100%;

  > button {
    width: 50%;
    color: #04d394;
    padding: 7px;
    border: 1px solid #04d394;

    &:hover {
      background: #04d394;
      color: #fff;
    }
  }

  .active {
    background: #04d394;
    color: #fff;
  }
`;

export const ButtonWrapper = styled.div`
  position: relative;
  flex: 0.15;

  > button {
    color: #04d394;
    padding: 7px;
    border: 1px solid #04d394;

    &:hover {
      background: #04d394;
      color: #fff;
    }
  }
`;

export const Select = styled.select`
  border: none;
  color: #04d394;
  outline: none;
`;

export const Option = styled.option``;
