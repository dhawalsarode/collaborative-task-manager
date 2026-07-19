export function getYAxisConfig(values: number[]) {
  const max = Math.max(0, ...values);

  if (max <= 4) {
    return {
      domain: [0, 4],
      ticks: [0, 1, 2, 3, 4],
    };
  }

  const targetStep = Math.ceil(max / 4);

  const niceSteps = [1, 2, 5, 10, 20, 50, 100];

  const step =
    niceSteps.find((s) => s >= targetStep) ?? targetStep;

  const roundedMax = Math.ceil(max / step) * step;

  const ticks = [];

  for (let i = 0; i <= roundedMax; i += step) {
    ticks.push(i);
  }

  return {
    domain: [0, roundedMax],
    ticks,
  };
}