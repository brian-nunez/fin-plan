function calculateAccruedInterest({
  principal, rate, compoundPeriods, time,
}: {
  principal: number;
  rate: number;
  compoundPeriods: number;
  time: number;
}) {
  return principal * Math.pow(1 + (rate / compoundPeriods), compoundPeriods * time);
}

export default calculateAccruedInterest;
