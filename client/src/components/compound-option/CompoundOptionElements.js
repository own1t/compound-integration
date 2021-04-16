import styled from "styled-components";

export const Container = styled.div`
  /* border: 1px solid red; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  border: 3px solid #04d394;
  border-radius: 5px;
`;

export const Header = styled.div`
  /* border: 1px solid red; */

  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;

  > .MuiSvgIcon-root {
    position: absolute;
    color: #04d394;
    font-size: 2.25rem;
    cursor: pointer;
    right: 80px;
  }
`;

export const LongCard = styled.div`
  position: relative;
  width: 90%;
  height: 250px;
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

  > h2 {
    position: absolute;
    top: -200px;
    left: -20px;
    opacity: 0.2;
    font-size: 13em;
    color: #04d394;
    pointer-events: none;
  }
`;

export const CompoundForm = styled.form`
  width: 100%;
  padding: 20px;
  padding-bottom: 0;
  transition: 0.5s;
  bottom: 0;

  > h3 {
    font-size: 1.8em;
    color: #000;
    z-index: 1;
  }
`;

export const InputGroupContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 55px;
  border: 1px solid #000;
  background: #fff;

  > button {
    color: #04d394;
    padding: 10px;
    width: 25%;
  }

  > input {
    background: #fff;
    width: 40%;
    height: 54px;
    outline: none;
    padding: 0 25px;
    border: none;
    border-right: 1px solid #000;
    font-size: 1rem;

    &::placeholder {
      background: #fff;
      color: #000;
    }
  }
`;

export const Select = styled.select`
  position: relative;
  left: 3px;
  outline: none;
  background: #fff;
  font-size: 18px;
  width: 45%;
  margin: -2px;
  margin-right: 7px;
  padding: 11px 16px 12px;
  border: none;
`;

export const Option = styled.option``;
