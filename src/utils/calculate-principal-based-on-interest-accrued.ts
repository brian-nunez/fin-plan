type TCalculatePrincipalBasedOnInterestAccrued = {
  interestEarned: number;
  rate: number;
  compoundPeriods: number;
  time: number;
};

export function calculatePrincipalBasedOnInterestAccrued({
  interestEarned,
  rate,
  compoundPeriods,
  time,
}: TCalculatePrincipalBasedOnInterestAccrued) {
  return interestEarned / (Math.pow(1 + (rate / compoundPeriods), compoundPeriods * time) - 1);
}

export default calculatePrincipalBasedOnInterestAccrued;
