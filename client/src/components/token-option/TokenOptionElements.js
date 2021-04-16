import styled from "styled-components";

export const Container = styled.div`
  /* border: 1px solid red; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  border: 3px solid #04d394;
  border-radius: 5px;
`;

export const Header = styled.div`
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

export const Content = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90%;
`;

export const Row = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(autofit, minmax(300px, 1fr));
`;

export const Col = styled.div`
  position: relative;
  width: 100%;
  margin: 20px 0;
  padding: 0 10px;
  transition: 0.5s;

  button {
    background: #04d394;
    color: #000;
  }
`;

export const FormContainer = styled.div`
  width: 90%;
`;

export const Form = styled.form`
  width: 90%;

  > h2 {
    width: 100%;
    color: #fff;
    text-align: center;
  }
`;

export const InputBox = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  color: #04d394;

  > input {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    box-shadow: none;
    border: none;
    outline: none;
    font-size: 18px;
    padding: 0 10px;
    z-index: 1;
    color: #000;
  }

  > input:focus + .text,
  > input:valid + .text {
    top: -35px;
    left: -10px;
  }

  .text {
    position: absolute;
    top: 0;
    left: 0;
    line-height: 40px;
    font-size: 18px;
    display: block;
    transition: 0.5s;
    pointer-events: none;
  }

  .line {
    position: absolute;
    bottom: 0;
    display: block;
    width: 100%;
    height: 2px;
    background: #fff;
    transition: 0.5s;
    border-radius: 2px;
    pointer-events: none;
  }

  > input:focus ~ .line,
  > input:valid ~ .line {
    height: 100%;
  }
`;
