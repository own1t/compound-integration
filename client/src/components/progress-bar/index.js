import React, { useEffect, useState } from "react";

import {
  Container,
  Wrapper,
  NumberSpan,
  PercentContainer,
  ProgressDisplay,
  PercentageSpan,
} from "./ProgressBarElements";
import { formatNumber } from "../../utils";

const ProgressBar = ({ contracts }) => {
  const [limitLeftPercentage, setLimitLeftPercentage] = useState(0);

  useEffect(() => {
    const init = async () => {
      const collateralCount = await contracts.compound.methods
        .collateralCount()
        .call();

      const rawCTokens = await contracts.compound.methods.getCTokens().call();
      const cTokens = rawCTokens.filter((cToken) => cToken.collateral === true);

      if (collateralCount > 0) {
        // const maxBorrows = await Promise.all([
        //   rawCTokens.map((cToken) =>
        //     contracts.compound.methods.getMaxBorrow(cToken.cTokenTicker).call()
        //   ),
        // ]);

        // const underlyingLimits = await Promise.all([
        //   cTokens.map((cToken) => getUnderlyingLimit(cToken)),
        // ]);

        // console.log(maxBorrows);
        // console.log(underlyingLimits);

        const maxBorrow = await contracts.compound.methods
          .getMaxBorrow(cTokens[0].cTokenTicker)
          .call();
        const maxLimit = await getUnderlyingLimit(cTokens[0]);

        const borrowed = maxLimit - maxBorrow;
        const percentage = borrowed / maxLimit;

        setLimitLeftPercentage(percentage * 100);
      }
    };
    init();
  }, []);

  const getUnderlyingLimit = async (cToken) => {
    const underlyingBalance = await contracts.compound.methods
      .getUnderlyingBalance(cToken.cTokenTicker)
      .call();
    const underlyingDecimals = cToken.underlyingDecimals;
    const fixedUnderlyingBalance =
      underlyingBalance / Math.pow(10, underlyingDecimals);

    const limit = fixedUnderlyingBalance * 0.6;

    return limit;
  };

  return (
    <Container>
      <Wrapper>
        <NumberSpan>Borrow Limit</NumberSpan>
        <PercentContainer>
          <ProgressDisplay
            percentage={`${formatNumber(limitLeftPercentage)}%`}
          ></ProgressDisplay>
        </PercentContainer>
        <PercentageSpan>{formatNumber(limitLeftPercentage)}%</PercentageSpan>
      </Wrapper>
    </Container>
  );
};

export default ProgressBar;
