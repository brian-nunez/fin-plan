type TCalculatePrincipalBasedOnAccrued = {
  accrued: number;
  rate: number;
  compoundPeriods: number;
  time: number;
};

export function calculatePrincipalBasedOnAccrued({
  accrued,
  rate,
  compoundPeriods,
  time,
}: TCalculatePrincipalBasedOnAccrued) {
  return accrued / Math.pow(1 + (rate / compoundPeriods), compoundPeriods * time);
}

export default calculatePrincipalBasedOnAccrued;
