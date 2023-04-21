import React from "react";
import { createBoard } from "@wixc3/react-board";
import { InterestRateBasedOnAccruedAndPrincipal } from "../../../components/calculators/interest-rate-based-on-accrued-and-principal";

export default createBoard({
  name: "InterestRateBasedOnAccruedAndPrincipal",
  Board: () => <InterestRateBasedOnAccruedAndPrincipal />,
  environmentProps: {
    canvasWidth: 469,
    windowWidth: 932,
    windowHeight: 866,
  },
});
