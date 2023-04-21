import React from "react";
import { createBoard } from "@wixc3/react-board";
import { PrincipalBasedOnInterestAccrued } from "../../../components/calculators/principal-based-on-interest-accrued";

export default createBoard({
  name: "PrincipalBasedOnInterestAccrued",
  Board: () => <PrincipalBasedOnInterestAccrued />,
  environmentProps: {
    canvasWidth: 469,
    windowWidth: 932,
    windowHeight: 866,
  },
});
