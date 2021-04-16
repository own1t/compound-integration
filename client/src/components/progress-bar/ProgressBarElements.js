import styled from "styled-components";

export const Container = styled.div`
  /* border: 1px solid red; */

  position: relative;
  width: 80%;
  margin-bottom: 30px;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(#616161 0%, #333 10%, #222);
  padding: 20px;
  border-radius: 8;
  border: 2px solid #000;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.5);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: rgba(255, 255, 255, 0.1);
    z-index: 10;
    pointer-events: none;
  }
`;

export const NumberSpan = styled.span`
  position: relative;
  width: 80px;
  color: #fff;
  text-align: right;
  letter-spacing: 1px;
`;

export const PercentageSpan = styled.span`
  position: relative;
  width: 80px;
  color: #fff;
  text-align: left;
  letter-spacing: 1px;
`;

export const PercentContainer = styled.div`
  position: relative;
  top: 2px;
  width: calc(100% - 120px);
  height: 20px;
  background: #151515;
  border-radius: 20px;
  margin: 0 10px;
  box-shadow: inset 0 0 10px #000;
  overflow: hidden;
`;

export const ProgressDisplay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.percentage};

  height: 100%;
  border-radius: 20px;
  background: linear-gradient(45deg, #04d394, #18ad7b);
`;
