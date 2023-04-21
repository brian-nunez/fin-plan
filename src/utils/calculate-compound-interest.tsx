type TCalculateCompounddInterest = {
  principal: number;
  rate: number;
  compoundPeriods: number;
  time: number;
};

export function calculateCompoundInterest({
  principal,
  rate,
  compoundPeriods,
  time,
}: TCalculateCompounddInterest) {
  return principal * Math.pow(1 + (rate / compoundPeriods), compoundPeriods * time);
}

export default calculateCompoundInterest;
