type TCalculateInterestRateBasedOnAccruedAndPrincipal = {
  accrued: number;
  principal: number;
  compoundPeriods: number;
  time: number;
};

export function calculateInterestRateBasedOnAccruedAndPrincipal({
  accrued,
  principal,
  compoundPeriods,
  time,
}: TCalculateInterestRateBasedOnAccruedAndPrincipal) {
  return compoundPeriods * (Math.pow(accrued / principal, 1 / (compoundPeriods * time)) - 1);
}

export default calculateInterestRateBasedOnAccruedAndPrincipal;
