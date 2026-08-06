export type TaxEstimate = {
  taxableIncome: number;
  federalTax: number;
  provincialTax: number;
  payrollContributions: number;
  totalTax: number;
  netIncome: number;
  averageRate: number;
  marginalRate: number;
};

type Bracket = [limit: number, rate: number];

const federalBrackets2025: Bracket[] = [
  [57_375, 0.145],
  [114_750, 0.205],
  [177_882, 0.26],
  [253_414, 0.29],
  [Number.POSITIVE_INFINITY, 0.33],
];

const quebecBrackets2025: Bracket[] = [
  [53_255, 0.14],
  [106_495, 0.19],
  [129_590, 0.24],
  [Number.POSITIVE_INFINITY, 0.2575],
];

function progressiveTax(income: number, brackets: Bracket[]) {
  let remaining = Math.max(0, income);
  let previousLimit = 0;
  let tax = 0;

  for (const [limit, rate] of brackets) {
    const taxableInBracket = Math.min(remaining, limit - previousLimit);
    if (taxableInBracket <= 0) break;
    tax += taxableInBracket * rate;
    remaining -= taxableInBracket;
    previousLimit = limit;
  }

  return tax;
}

function marginalRate(income: number, brackets: Bracket[]) {
  return brackets.find(([limit]) => income <= limit)?.[1] ?? brackets.at(-1)?.[1] ?? 0;
}

export function estimateQuebecTax({
  employmentIncome,
  selfEmploymentIncome,
  taxPaid,
  rrspFhsa,
  otherIncome,
  capitalGains,
  eligibleDividends,
  nonEligibleDividends,
}: {
  employmentIncome: number;
  selfEmploymentIncome: number;
  taxPaid: number;
  rrspFhsa: number;
  otherIncome: number;
  capitalGains: number;
  eligibleDividends: number;
  nonEligibleDividends: number;
}) {
  const grossCashIncome = employmentIncome + selfEmploymentIncome + otherIncome + capitalGains + eligibleDividends + nonEligibleDividends;
  const taxableIncome = Math.max(0, employmentIncome + selfEmploymentIncome + otherIncome + capitalGains * 0.5 + eligibleDividends * 1.38 + nonEligibleDividends * 1.15 - rrspFhsa);

  const federalBeforeCredits = progressiveTax(taxableIncome, federalBrackets2025);
  const federalBasicCredit = Math.min(taxableIncome, 16_129) * 0.145;
  const federalDividendCredit = eligibleDividends * 1.38 * 0.150198 + nonEligibleDividends * 1.15 * 0.090301;
  const federalAfterCredits = Math.max(0, federalBeforeCredits - federalBasicCredit - federalDividendCredit);
  const federalTax = Math.max(0, federalAfterCredits * 0.835);

  const provincialBeforeCredits = progressiveTax(taxableIncome, quebecBrackets2025);
  const provincialBasicCredit = Math.min(taxableIncome, 18_571) * 0.14;
  const provincialDividendCredit = eligibleDividends * 1.38 * 0.117 + nonEligibleDividends * 1.15 * 0.0342;
  const provincialTax = Math.max(0, provincialBeforeCredits - provincialBasicCredit - provincialDividendCredit);

  const qppPensionable = Math.max(0, Math.min(employmentIncome + selfEmploymentIncome, 71_300) - 3_500);
  const qppBase = qppPensionable * (selfEmploymentIncome > 0 && employmentIncome === 0 ? 0.128 : 0.064);
  const qppAdditional = Math.max(0, Math.min(employmentIncome + selfEmploymentIncome, 81_200) - 71_300) * (selfEmploymentIncome > 0 && employmentIncome === 0 ? 0.08 : 0.04);
  const employmentInsurance = Math.min(employmentIncome, 65_700) * 0.0131;
  const parentalInsurance = Math.min(employmentIncome + selfEmploymentIncome, 98_000) * (selfEmploymentIncome > 0 && employmentIncome === 0 ? 0.00878 : 0.00494);
  const payrollContributions = qppBase + qppAdditional + employmentInsurance + parentalInsurance;
  const totalTax = Math.max(0, federalTax + provincialTax + payrollContributions);
  const averageRate = grossCashIncome > 0 ? totalTax / grossCashIncome : 0;
  const combinedMarginal = marginalRate(taxableIncome, federalBrackets2025) * 0.835 + marginalRate(taxableIncome, quebecBrackets2025);

  return {
    taxableIncome,
    federalTax,
    provincialTax,
    payrollContributions,
    totalTax,
    taxBalance: totalTax - taxPaid,
    netIncome: Math.max(0, grossCashIncome - rrspFhsa - totalTax),
    averageRate,
    marginalRate: combinedMarginal,
  } satisfies TaxEstimate & { taxBalance: number };
}

const rrspCombinedMarginalBrackets2026: Bracket[] = [
  [54_345, 0.2569],
  [58_523, 0.3069],
  [108_680, 0.361175],
  [117_045, 0.411175],
  [132_245, 0.4571],
  [181_440, 0.4746],
  [258_482, 0.50207],
  [Number.POSITIVE_INFINITY, 0.53305],
];

export function estimateRrspTaxSavings(income: number, contribution: number) {
  const taxableIncome = Math.max(0, income);
  const taxableAfterContribution = Math.max(0, taxableIncome - Math.max(0, contribution));
  return Math.max(0, progressiveTax(taxableIncome, rrspCombinedMarginalBrackets2026) - progressiveTax(taxableAfterContribution, rrspCombinedMarginalBrackets2026));
}

export function futureValue({ initial, contribution, frequency, contributionYears, totalYears, annualRate, contributionGrowth = 0 }: { initial: number; contribution: number; frequency: number; contributionYears: number; totalYears: number; annualRate: number; contributionGrowth?: number }) {
  const periods = Math.max(0, Math.round(totalYears * frequency));
  const contributionPeriods = Math.max(0, Math.min(periods, Math.round(contributionYears * frequency)));
  const periodicRate = (1 + annualRate / 100) ** (1 / frequency) - 1;
  let balance = initial;
  let contributed = initial;

  for (let period = 0; period < periods; period += 1) {
    if (period < contributionPeriods) {
      const year = Math.floor(period / frequency);
      const indexedContribution = contribution * (1 + contributionGrowth / 100) ** year;
      balance += indexedContribution;
      contributed += indexedContribution;
    }
    balance *= 1 + periodicRate;
  }

  return { balance, contributed, growth: balance - contributed };
}

export function loanPayment(principal: number, annualRate: number, years: number, frequency: number, finalBalance = 0) {
  const periods = Math.max(1, Math.round(years * frequency));
  const rate = annualRate / 100 / frequency;
  if (rate === 0) return (principal - finalBalance) / periods;
  return (principal - finalBalance / (1 + rate) ** periods) * rate / (1 - (1 + rate) ** -periods);
}

export function presentValueOfWithdrawals(withdrawal: number, frequency: number, years: number, annualRate: number, finalBalance = 0) {
  const periods = Math.max(1, Math.round(years * frequency));
  const rate = (1 + annualRate / 100) ** (1 / frequency) - 1;
  if (rate === 0) return withdrawal * periods + finalBalance;
  return withdrawal * (1 - (1 + rate) ** -periods) / rate * (1 + rate) + finalBalance / (1 + rate) ** periods;
}
