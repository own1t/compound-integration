import styled from "styled-components";

export const Label = styled.label``;

export const Input = styled.input`
  position: relative;
  /* width: 120px; */
  width: 60px;
  /* height: 40px; */
  height: 20px;
  margin: 10px;
  outline: none;
  background: #111;
  -webkit-appearance: none;
  cursor: pointer;
  border-radius: 20px;
  box-shadow: -5px -5px 20px rgba(255, 255, 255, 0.1),
    5px 5px 10px rgba(0, 0, 0, 1), inset -2px -2px 5px rgba(255, 255, 255, 0.1),
    inset 2px 2px 5px rgba(0, 0, 0, 0.5), 0 0 0 2px #1f1f1f;

  transition: 0.5s;

  &:checked {
    background: #04d394;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    /* width: 80px; */
    width: 40px;
    /* height: 40px; */
    height: 20px;
    background: linear-gradient(to top, #000, #555);
    border-radius: 20px;
    box-shadow: 0 0 0 1px #232323;
    transform: scale(0.98, 0.96);
    transition: 0.5s;
  }

  &:checked::before {
    /* left: 40px; */
    left: 20px;
  }

  &::after {
    content: "";
    position: absolute;
    /* left: 65px; */
    left: 10px;
    top: calc(25% - 2px);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: silver;
    transition: 0.5s;
  }

  &:checked::after {
    /* left: calc(65px + 40px); */
    left: calc(5px + 5px);
    background: silver;
    box-shadow: 0 0 5px #04d394, 0 0 15px #04d394, 0 0 30px #04d394;
  }
`;
