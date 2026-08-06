"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { Banknote, BriefcaseBusiness, CalendarClock, ChartNoAxesCombined, CircleDollarSign, Landmark, PiggyBank, ReceiptText, ShieldCheck, TrendingUp } from "lucide-react";

import { estimateQuebecTax, estimateRrspTaxSavings, futureValue, loanPayment, presentValueOfWithdrawals } from "@/lib/finance";
import type { Locale } from "@/lib/site";

type CalculatorKey = "savings" | "loan" | "income" | "delay" | "taxRate" | "inflation" | "rrspLoan" | "rrspSavings" | "retirementInflation" | "humanLife";

const toolList = {
  fr: [
    ["savings", "Épargne", "Illustrer l’accumulation de l’épargne", PiggyBank],
    ["loan", "Emprunt", "Illustrer les facteurs liés à un emprunt", Landmark],
    ["income", "Revenus de placement", "Calculer le capital requis pour vos retraits", Banknote],
    ["delay", "Report d’investissement", "Mesurer l’impact de reporter vos cotisations", CalendarClock],
    ["taxRate", "Taux d’imposition", "Estimer les taux applicables au Québec", ReceiptText],
    ["inflation", "Inflation", "Convertir un montant futur en pouvoir d’achat actuel", TrendingUp],
    ["rrspLoan", "Prêt REER", "Évaluer un emprunt pour cotiser à un REER", CircleDollarSign],
    ["rrspSavings", "Économie d’impôt REER", "Estimer l’économie liée à une cotisation", ShieldCheck],
    ["retirementInflation", "Budget retraite et inflation", "Projeter vos dépenses mensuelles futures", ChartNoAxesCombined],
    ["humanLife", "Valeur de vie humaine", "Estimer votre valeur économique actuelle", BriefcaseBusiness],
  ],
  en: [
    ["savings", "Savings", "Illustrate how savings accumulate", PiggyBank],
    ["loan", "Loan", "Illustrate the factors affecting a loan", Landmark],
    ["income", "Investment income", "Calculate the capital required for withdrawals", Banknote],
    ["delay", "Deferred investment", "Measure the impact of delaying contributions", CalendarClock],
    ["taxRate", "Tax rate", "Estimate Québec income-tax rates", ReceiptText],
    ["inflation", "Inflation", "Convert a future amount into today’s purchasing power", TrendingUp],
    ["rrspLoan", "RRSP loan", "Evaluate borrowing to contribute to an RRSP", CircleDollarSign],
    ["rrspSavings", "RRSP tax savings", "Estimate tax savings from a contribution", ShieldCheck],
    ["retirementInflation", "Retirement budget and inflation", "Project future monthly expenses", ChartNoAxesCombined],
    ["humanLife", "Human life value", "Estimate your current economic value", BriefcaseBusiness],
  ],
} as const;

const ui = {
  fr: {
    inputs: "Vos données", results: "Résultats", amount: "Montant actuel", contribution: "Cotisation", frequency: "Fréquence", contributionYears: "Durée des cotisations", totalYears: "Durée de l’accumulation", return: "Taux de rendement", placement: "Type de placement", balance: "Solde accumulé", contributed: "Cotisations totales", growth: "Intérêts récoltés",
    loanAmount: "Montant du prêt", loanBalance: "Solde après le remboursement d’impôt", loanType: "Type d’emprunt", duration: "Durée", interest: "Taux d’intérêt", payment: "Paiement", totalInterest: "Intérêts totaux", capital: "Capital", withdrawals: "Retraits", finalBalance: "Solde final souhaité", delayYears: "Années de report", withoutDelay: "Montant sans report", withDelay: "Montant avec report", catchUp: "Cotisation requise pour rattraper le retard", delayCost: "Coût total du report",
    taxableIncome: "Revenu imposable", incomeTax: "Impôt sur le revenu", netIncome: "Revenu net", averageRate: "Taux moyen", marginalRate: "Taux marginal", referenceAmount: "Montant de référence", referenceYear: "Année de référence", inflationRate: "Taux d’inflation", targetYear: "Année cible", inflationAmount: "Montant avec l’effet de l’inflation",
    retirementYears: "Nombre d’années avant la retraite", unusedRoom: "Cotisations REER inutilisées", marginalTax: "Taux d’imposition marginal", refundPortion: "Portion du remboursement appliquée au prêt", repaymentYears: "Durée de remboursement", rrspAtRetirement: "Sommes accumulées à la retraite", refund: "Remboursement estimé", rrspContribution: "Cotisation REER", taxSavings: "Économie d’impôt",
    housing: "Habitation", food: "Alimentation", transport: "Transport", telecom: "Télécommunications", health: "Santé", leisure: "Loisirs", other: "Autres", currentBudget: "Budget en dollars courants", futureBudget: "Budget en dollars futurs", annualSalary: "Salaire annuel", age: "Âge", retirementAge: "Âge à la retraite", incomeGrowth: "Croissance prévue des revenus", value: "Valeur",
    years: "ans", report: "Les calculs sont produits à titre indicatif et éducatif. Consultez un professionnel avant de prendre une décision financière ou fiscale.", quebecOnly: "Estimation pour une personne résidant au Québec.", weekly: "Hebdomadaire", biweekly: "Aux deux semaines", semimonthly: "Quinzaine", monthly: "Mensuelle", semiannual: "Semestrielle", annual: "Annuelle",
  },
  en: {
    inputs: "Your information", results: "Results", amount: "Current amount", contribution: "Contribution", frequency: "Frequency", contributionYears: "Contribution period", totalYears: "Accumulation period", return: "Rate of return", placement: "Investment type", balance: "Accumulated balance", contributed: "Total contributions", growth: "Interest earned",
    loanAmount: "Loan amount", loanBalance: "Balance after tax refund", loanType: "Loan type", duration: "Term", interest: "Interest rate", payment: "Payment", totalInterest: "Total interest", capital: "Capital", withdrawals: "Withdrawals", finalBalance: "Desired ending balance", delayYears: "Years deferred", withoutDelay: "Amount without delay", withDelay: "Amount with delay", catchUp: "Contribution required to catch up", delayCost: "Total cost of delay",
    taxableIncome: "Taxable income", incomeTax: "Income tax", netIncome: "Net income", averageRate: "Average rate", marginalRate: "Marginal rate", referenceAmount: "Reference amount", referenceYear: "Reference year", inflationRate: "Inflation rate", targetYear: "Target year", inflationAmount: "Amount adjusted for inflation",
    retirementYears: "Years until retirement", unusedRoom: "Unused RRSP contribution room", marginalTax: "Marginal tax rate", refundPortion: "Tax refund applied to loan", repaymentYears: "Repayment period", rrspAtRetirement: "Accumulated at retirement", refund: "Estimated refund", rrspContribution: "RRSP contribution", taxSavings: "Tax savings",
    housing: "Housing", food: "Food", transport: "Transportation", telecom: "Telecommunications", health: "Health", leisure: "Leisure", other: "Other", currentBudget: "Budget in current dollars", futureBudget: "Budget in future dollars", annualSalary: "Annual salary", age: "Age", retirementAge: "Retirement age", incomeGrowth: "Expected income growth", value: "Value",
    years: "years", report: "Calculations are educational estimates. Consult a professional before making a financial or tax decision.", quebecOnly: "Estimate for a Québec resident.", weekly: "Weekly", biweekly: "Every two weeks", semimonthly: "Twice monthly", monthly: "Monthly", semiannual: "Semi-annually", annual: "Annually",
  },
} as const;

const frequencyValues = [52, 26, 24, 12, 2, 1];

function NumericField({ label, value, onChange, suffix = "$", min = 0, max, step = 1 }: { label: string; value: number; onChange: (value: number) => void; suffix?: string; min?: number; max?: number; step?: number }) {
  return <label className="native-field"><span>{label}</span><span className="native-input"><input type="number" inputMode="decimal" value={value} min={min} max={max} step={step} onChange={(event) => onChange(Number(event.target.value) || 0)} /><small aria-hidden="true">{suffix}</small></span></label>;
}

function SelectField({ label, value, onChange, options }: { label: string; value: string | number; onChange: (value: string) => void; options: { value: string | number; label: string }[] }) {
  return <label className="native-field"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></label>;
}

function Result({ label, value, large = false }: { label: string; value: string; large?: boolean }) {
  return <div className={large ? "native-result large" : "native-result"}><span>{label}</span><output>{value}</output></div>;
}

function deferredValue(initial: number, contribution: number, frequency: number, years: number, delayYears: number, annualRate: number) {
  const periods = Math.round(years * frequency);
  const delayPeriods = Math.round(delayYears * frequency);
  const rate = (1 + annualRate / 100) ** (1 / frequency) - 1;
  let balance = initial;
  for (let period = 0; period < periods; period += 1) {
    if (period >= delayPeriods) balance += contribution;
    balance *= 1 + rate;
  }
  return balance;
}

export function FinancialCalculatorSuite({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const calculators = toolList[locale];
  const formatCurrency = useMemo(() => new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 2 }), [locale]);
  const formatPercent = useMemo(() => new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", { style: "percent", maximumFractionDigits: 2 }), [locale]);
  const [active, setActive] = useState<CalculatorKey>("savings");
  const [savings, setSavings] = useState({ initial: 5000, contribution: 500, frequency: 12, contributionYears: 5, totalYears: 10, rate: 5, placement: "rrsp" });
  const [loan, setLoan] = useState({ amount: 13532.85, years: 6, rate: 12, frequency: 12, type: "personal" });
  const [income, setIncome] = useState({ withdrawal: 500, frequency: 12, years: 30, rate: 5, finalBalance: 0 });
  const [delay, setDelay] = useState({ initial: 5000, contribution: 500, frequency: 12, years: 25, rate: 4, delayYears: 3 });
  const [taxIncome, setTaxIncome] = useState(50000);
  const [inflation, setInflation] = useState({ amount: 1000000, referenceYear: 2046, rate: 2.25, targetYear: 2026 });
  const [rrspLoan, setRrspLoan] = useState({ retirementYears: 25, returnRate: 5, unusedRoom: 12000, loanAmount: 12000, paymentFrequency: 12, payment: 400, loanRate: 5.68, repaymentYears: 5, marginalTax: 38, refundPortion: 100 });
  const [rrspTax, setRrspTax] = useState({ income: 50000, contribution: 12000 });
  const [retirement, setRetirement] = useState({ housing: 950, food: 150, transport: 300, telecom: 150, health: 300, leisure: 300, other: 250, rate: 2.25, year: 2038 });
  const [life, setLife] = useState({ salary: 55000, age: 33, retirementAge: 67, growth: 3 });

  const frequencies = frequencyValues.map((value, index) => ({ value, label: [t.weekly, t.biweekly, t.semimonthly, t.monthly, t.semiannual, t.annual][index] }));
  const savingsResult = futureValue({ initial: savings.initial, contribution: savings.contribution, frequency: savings.frequency, contributionYears: savings.contributionYears, totalYears: savings.totalYears, annualRate: savings.rate });
  const payment = loanPayment(loan.amount, loan.rate, loan.years, loan.frequency);
  const loanInterest = payment * loan.years * loan.frequency - loan.amount;
  const requiredCapital = presentValueOfWithdrawals(income.withdrawal, income.frequency, income.years, income.rate, income.finalBalance);
  const noDelay = futureValue({ initial: delay.initial, contribution: delay.contribution, frequency: delay.frequency, contributionYears: delay.years, totalYears: delay.years, annualRate: delay.rate }).balance;
  const withDelay = deferredValue(delay.initial, delay.contribution, delay.frequency, delay.years, delay.delayYears, delay.rate);
  const catchUpUnit = Math.max(0.01, deferredValue(0, 1, delay.frequency, delay.years, delay.delayYears, delay.rate));
  const catchUpContribution = Math.max(0, (noDelay - delay.initial * (1 + delay.rate / 100) ** delay.years) / catchUpUnit);
  const delayCost = Math.max(0, (catchUpContribution - delay.contribution) * delay.frequency * Math.max(0, delay.years - delay.delayYears) - delay.contribution * delay.frequency * delay.delayYears);
  const taxRateResult = estimateQuebecTax({ employmentIncome: taxIncome, selfEmploymentIncome: 0, taxPaid: 0, rrspFhsa: 0, otherIncome: 0, capitalGains: 0, eligibleDividends: 0, nonEligibleDividends: 0 });
  const inflationYears = inflation.referenceYear - inflation.targetYear;
  const inflationAmount = inflation.amount / (1 + inflation.rate / 100) ** inflationYears;
  const refund = rrspLoan.loanAmount * rrspLoan.marginalTax / 100;
  const netLoan = Math.max(0, rrspLoan.loanAmount - refund * rrspLoan.refundPortion / 100);
  const rrspPeriodicRate = rrspLoan.loanRate / 100 / rrspLoan.paymentFrequency;
  const rrspRawPeriods = rrspLoan.payment <= netLoan * rrspPeriodicRate
    ? Number.POSITIVE_INFINITY
    : rrspPeriodicRate === 0
      ? netLoan / Math.max(0.01, rrspLoan.payment)
      : -Math.log(1 - netLoan * rrspPeriodicRate / rrspLoan.payment) / Math.log(1 + rrspPeriodicRate);
  const rrspRepaymentDuration = Number.isFinite(rrspRawPeriods) ? (Math.ceil(rrspRawPeriods) + 1) / rrspLoan.paymentFrequency : Number.POSITIVE_INFINITY;
  const rrspFuture = rrspLoan.loanAmount * (1 + rrspLoan.returnRate / 100) ** rrspLoan.retirementYears;
  const rrspTaxSavings = estimateRrspTaxSavings(rrspTax.income, rrspTax.contribution);
  const currentBudget = retirement.housing + retirement.food + retirement.transport + retirement.telecom + retirement.health + retirement.leisure + retirement.other;
  const futureBudget = currentBudget * (1 + retirement.rate / 100) ** Math.max(0, retirement.year - 2026);
  const workYears = Math.max(0, life.retirementAge - life.age);
  const lifeValue = life.growth === 0 ? life.salary * workYears : life.salary * (((1 + life.growth / 100) ** workYears - 1) / (life.growth / 100));

  const update = <T extends object>(setter: React.Dispatch<React.SetStateAction<T>>, key: keyof T) => (value: number | string) => setter((current) => ({ ...current, [key]: value }));

  const selectCalculatorWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % calculators.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + calculators.length) % calculators.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = calculators.length - 1;
    else return;

    event.preventDefault();
    const nextKey = calculators[nextIndex][0];
    setActive(nextKey);
    requestAnimationFrame(() => document.getElementById(`native-calculator-tab-${nextKey}`)?.focus());
  };

  return (
    <section className="section native-calculators-section">
      <div className="container native-calculator-picker" role="tablist" aria-label={locale === "fr" ? "Calculatrices financières" : "Financial calculators"}>
        {calculators.map(([key, title, body, Icon], index) => <button type="button" role="tab" id={`native-calculator-tab-${key}`} aria-controls="native-calculator-panel" aria-selected={active === key} tabIndex={active === key ? 0 : -1} className={active === key ? "active" : undefined} onClick={() => setActive(key)} onKeyDown={(event) => selectCalculatorWithKeyboard(event, index)} key={key}><span>{String(index + 1).padStart(2, "0")}</span><Icon /><strong>{title}</strong><small>{body}</small></button>)}
      </div>

      <div className="container native-calculator" role="tabpanel" id="native-calculator-panel" aria-labelledby={`native-calculator-tab-${active}`}>
        <div className="native-calculator-form">
          <p className="eyebrow">{t.inputs}</p><h2>{calculators.find(([key]) => key === active)?.[1]}</h2>
          <div className="native-fields">
            {active === "savings" ? <><NumericField label={t.amount} value={savings.initial} onChange={update(setSavings, "initial")} /><NumericField label={t.contribution} value={savings.contribution} onChange={update(setSavings, "contribution")} /><SelectField label={t.frequency} value={savings.frequency} onChange={(value) => update(setSavings, "frequency")(Number(value))} options={frequencies} /><SelectField label={t.placement} value={savings.placement} onChange={update(setSavings, "placement")} options={[{ value: "rrsp", label: "REER / RRSP" }, { value: "tfsa", label: "CELI / TFSA" }, { value: "nonregistered", label: locale === "fr" ? "Non enregistré" : "Non-registered" }]} /><NumericField label={t.contributionYears} value={savings.contributionYears} onChange={update(setSavings, "contributionYears")} suffix={t.years} /><NumericField label={t.totalYears} value={savings.totalYears} onChange={update(setSavings, "totalYears")} suffix={t.years} /><NumericField label={t.return} value={savings.rate} onChange={update(setSavings, "rate")} suffix="%" step={0.1} /></> : null}
            {active === "loan" ? <><SelectField label={t.loanType} value={loan.type} onChange={update(setLoan, "type")} options={[{ value: "mortgage", label: locale === "fr" ? "Hypothèque" : "Mortgage" }, { value: "auto", label: locale === "fr" ? "Auto" : "Vehicle" }, { value: "personal", label: locale === "fr" ? "Personnel" : "Personal" }]} /><NumericField label={t.loanAmount} value={loan.amount} onChange={update(setLoan, "amount")} /><NumericField label={t.duration} value={loan.years} onChange={update(setLoan, "years")} suffix={t.years} /><NumericField label={t.interest} value={loan.rate} onChange={update(setLoan, "rate")} suffix="%" step={0.01} /><SelectField label={t.frequency} value={loan.frequency} onChange={(value) => update(setLoan, "frequency")(Number(value))} options={frequencies} /></> : null}
            {active === "income" ? <><NumericField label={t.withdrawals} value={income.withdrawal} onChange={update(setIncome, "withdrawal")} /><SelectField label={t.frequency} value={income.frequency} onChange={(value) => update(setIncome, "frequency")(Number(value))} options={frequencies} /><NumericField label={t.duration} value={income.years} onChange={update(setIncome, "years")} suffix={t.years} /><NumericField label={t.return} value={income.rate} onChange={update(setIncome, "rate")} suffix="%" step={0.1} /><NumericField label={t.finalBalance} value={income.finalBalance} onChange={update(setIncome, "finalBalance")} /></> : null}
            {active === "delay" ? <><NumericField label={t.amount} value={delay.initial} onChange={update(setDelay, "initial")} /><NumericField label={t.contribution} value={delay.contribution} onChange={update(setDelay, "contribution")} /><SelectField label={t.frequency} value={delay.frequency} onChange={(value) => update(setDelay, "frequency")(Number(value))} options={frequencies} /><NumericField label={t.duration} value={delay.years} onChange={update(setDelay, "years")} suffix={t.years} /><NumericField label={t.return} value={delay.rate} onChange={update(setDelay, "rate")} suffix="%" step={0.1} /><NumericField label={t.delayYears} value={delay.delayYears} onChange={update(setDelay, "delayYears")} suffix={t.years} /></> : null}
            {active === "taxRate" ? <><NumericField label={t.taxableIncome} value={taxIncome} onChange={setTaxIncome} /><p className="native-form-note">{t.quebecOnly}</p></> : null}
            {active === "inflation" ? <><NumericField label={t.referenceAmount} value={inflation.amount} onChange={update(setInflation, "amount")} /><NumericField label={t.referenceYear} value={inflation.referenceYear} onChange={update(setInflation, "referenceYear")} suffix="" /><NumericField label={t.inflationRate} value={inflation.rate} onChange={update(setInflation, "rate")} suffix="%" step={0.01} /><NumericField label={t.targetYear} value={inflation.targetYear} onChange={update(setInflation, "targetYear")} suffix="" /></> : null}
            {active === "rrspLoan" ? <><NumericField label={t.retirementYears} value={rrspLoan.retirementYears} onChange={update(setRrspLoan, "retirementYears")} suffix={t.years} /><NumericField label={t.return} value={rrspLoan.returnRate} onChange={update(setRrspLoan, "returnRate")} suffix="%" step={0.1} /><NumericField label={t.unusedRoom} value={rrspLoan.unusedRoom} onChange={update(setRrspLoan, "unusedRoom")} /><NumericField label={t.loanAmount} value={rrspLoan.loanAmount} onChange={update(setRrspLoan, "loanAmount")} /><SelectField label={t.frequency} value={rrspLoan.paymentFrequency} onChange={(value) => update(setRrspLoan, "paymentFrequency")(Number(value))} options={frequencies} /><NumericField label={t.payment} value={rrspLoan.payment} onChange={update(setRrspLoan, "payment")} /><NumericField label={t.interest} value={rrspLoan.loanRate} onChange={update(setRrspLoan, "loanRate")} suffix="%" step={0.01} /><NumericField label={t.repaymentYears} value={rrspLoan.repaymentYears} onChange={update(setRrspLoan, "repaymentYears")} suffix={t.years} /><NumericField label={t.marginalTax} value={rrspLoan.marginalTax} onChange={update(setRrspLoan, "marginalTax")} suffix="%" /><NumericField label={t.refundPortion} value={rrspLoan.refundPortion} onChange={update(setRrspLoan, "refundPortion")} suffix="%" /></> : null}
            {active === "rrspSavings" ? <><NumericField label={t.taxableIncome} value={rrspTax.income} onChange={update(setRrspTax, "income")} /><NumericField label={t.rrspContribution} value={rrspTax.contribution} onChange={update(setRrspTax, "contribution")} /><p className="native-form-note">{t.quebecOnly}</p></> : null}
            {active === "retirementInflation" ? <><NumericField label={t.housing} value={retirement.housing} onChange={update(setRetirement, "housing")} /><NumericField label={t.food} value={retirement.food} onChange={update(setRetirement, "food")} /><NumericField label={t.transport} value={retirement.transport} onChange={update(setRetirement, "transport")} /><NumericField label={t.telecom} value={retirement.telecom} onChange={update(setRetirement, "telecom")} /><NumericField label={t.health} value={retirement.health} onChange={update(setRetirement, "health")} /><NumericField label={t.leisure} value={retirement.leisure} onChange={update(setRetirement, "leisure")} /><NumericField label={t.other} value={retirement.other} onChange={update(setRetirement, "other")} /><NumericField label={t.inflationRate} value={retirement.rate} onChange={update(setRetirement, "rate")} suffix="%" step={0.01} /><NumericField label={locale === "fr" ? "Année" : "Year"} value={retirement.year} onChange={update(setRetirement, "year")} suffix="" /></> : null}
            {active === "humanLife" ? <><NumericField label={t.annualSalary} value={life.salary} onChange={update(setLife, "salary")} /><NumericField label={t.age} value={life.age} onChange={update(setLife, "age")} suffix={t.years} /><NumericField label={t.retirementAge} value={life.retirementAge} onChange={update(setLife, "retirementAge")} suffix={t.years} /><NumericField label={t.incomeGrowth} value={life.growth} onChange={update(setLife, "growth")} suffix="%" step={0.1} /></> : null}
          </div>
        </div>

        <div className="native-calculator-results" aria-live="polite">
          <p className="eyebrow">{t.results}</p>
          {active === "savings" ? <><Result label={t.balance} value={formatCurrency.format(savingsResult.balance)} large /><Result label={t.contributed} value={formatCurrency.format(savingsResult.contributed)} /><Result label={t.growth} value={formatCurrency.format(savingsResult.growth)} /></> : null}
          {active === "loan" ? <><Result label={t.payment} value={formatCurrency.format(payment)} large /><Result label={t.totalInterest} value={formatCurrency.format(loanInterest)} /><Result label={t.loanAmount} value={formatCurrency.format(loan.amount)} /></> : null}
          {active === "income" ? <><Result label={t.capital} value={formatCurrency.format(requiredCapital)} large /><Result label={t.withdrawals} value={formatCurrency.format(income.withdrawal * income.frequency * income.years)} /><Result label={t.finalBalance} value={formatCurrency.format(income.finalBalance)} /></> : null}
          {active === "delay" ? <><Result label={t.withoutDelay} value={formatCurrency.format(noDelay)} large /><Result label={t.withDelay} value={formatCurrency.format(withDelay)} /><Result label={t.catchUp} value={formatCurrency.format(catchUpContribution)} /><Result label={t.delayCost} value={formatCurrency.format(delayCost)} /></> : null}
          {active === "taxRate" ? <><Result label={t.incomeTax} value={formatCurrency.format(taxRateResult.totalTax)} large /><Result label={t.netIncome} value={formatCurrency.format(taxRateResult.netIncome)} /><Result label={t.averageRate} value={formatPercent.format(taxRateResult.averageRate)} /><Result label={t.marginalRate} value={formatPercent.format(taxRateResult.marginalRate)} /></> : null}
          {active === "inflation" ? <><Result label={t.inflationAmount} value={formatCurrency.format(inflationAmount)} large /><Result label={t.inflationRate} value={formatPercent.format(inflation.rate / 100)} /><Result label={t.duration} value={`${Math.abs(inflationYears)} ${t.years}`} /></> : null}
          {active === "rrspLoan" ? <><Result label={t.rrspAtRetirement} value={formatCurrency.format(rrspFuture)} large /><Result label={t.loanAmount} value={formatCurrency.format(rrspLoan.loanAmount)} /><Result label={t.refund} value={formatCurrency.format(refund)} /><Result label={t.loanBalance} value={formatCurrency.format(netLoan)} /><Result label={t.payment} value={formatCurrency.format(rrspLoan.payment)} /><Result label={t.duration} value={Number.isFinite(rrspRepaymentDuration) ? `${rrspRepaymentDuration.toFixed(2)} ${t.years}` : "—"} /></> : null}
          {active === "rrspSavings" ? <><Result label={t.taxSavings} value={formatCurrency.format(rrspTaxSavings)} large /><Result label={t.taxableIncome} value={formatCurrency.format(Math.max(0, rrspTax.income - rrspTax.contribution))} /><Result label={t.rrspContribution} value={formatCurrency.format(rrspTax.contribution)} /></> : null}
          {active === "retirementInflation" ? <><Result label={t.futureBudget} value={formatCurrency.format(futureBudget)} large /><Result label={t.currentBudget} value={formatCurrency.format(currentBudget)} /><Result label={t.inflationRate} value={formatPercent.format(retirement.rate / 100)} /></> : null}
          {active === "humanLife" ? <><Result label={t.value} value={formatCurrency.format(lifeValue)} large /><Result label={t.duration} value={`${workYears} ${t.years}`} /><Result label={t.annualSalary} value={formatCurrency.format(life.salary)} /></> : null}
          <small className="native-disclaimer">{t.report}</small>
        </div>
      </div>
    </section>
  );
}

export function QuebecTaxCalculator({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const [values, setValues] = useState({ employmentIncome: 0, selfEmploymentIncome: 0, taxPaid: 0, rrspFhsa: 0, otherIncome: 0, capitalGains: 0, eligibleDividends: 0, nonEligibleDividends: 0 });
  const formatCurrency = useMemo(() => new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }), [locale]);
  const formatPercent = useMemo(() => new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", { style: "percent", maximumFractionDigits: 2 }), [locale]);
  const result = estimateQuebecTax(values);
  const update = (key: keyof typeof values) => (value: number) => setValues((current) => ({ ...current, [key]: value }));
  const labels = locale === "fr" ? {
    employmentIncome: "Revenus d’emploi", selfEmploymentIncome: "Revenus d’un travail autonome", taxPaid: "Impôt sur le revenu payé", rrspFhsa: "Cotisations au REER et au CELIAPP", otherIncome: "Autres revenus", capitalGains: "Gains en capital", eligibleDividends: "Dividendes déterminés", nonEligibleDividends: "Dividendes non déterminés", total: "Montant d’impôt total", federal: "Impôt fédéral", provincial: "Impôt provincial", contributions: "Cotisations au RRQ, à l’AE et au RQAP", balance: "Remboursement ou solde estimé",
  } : {
    employmentIncome: "Employment income", selfEmploymentIncome: "Self-employment income", taxPaid: "Income tax paid", rrspFhsa: "RRSP and FHSA contributions", otherIncome: "Other income", capitalGains: "Capital gains", eligibleDividends: "Eligible dividends", nonEligibleDividends: "Non-eligible dividends", total: "Total estimated tax", federal: "Federal tax", provincial: "Québec tax", contributions: "QPP, EI, and QPIP contributions", balance: "Estimated refund or balance",
  };

  return (
    <section className="section native-calculators-section">
      <div className="container native-calculator tax-calculator">
        <div className="native-calculator-form"><p className="eyebrow">{t.inputs}</p><h2>{locale === "fr" ? "Calculatrice d’impôt sur le revenu du Québec 2025" : "2025 Québec income tax calculator"}</h2><div className="native-fields">{(Object.keys(values) as (keyof typeof values)[]).map((key) => <NumericField key={key} label={labels[key]} value={values[key]} onChange={update(key)} />)}</div></div>
        <div className="native-calculator-results" aria-live="polite"><p className="eyebrow">{t.results}</p><Result label={labels.total} value={formatCurrency.format(result.totalTax)} large /><Result label={labels.federal} value={formatCurrency.format(result.federalTax)} /><Result label={labels.provincial} value={formatCurrency.format(result.provincialTax)} /><Result label={labels.contributions} value={formatCurrency.format(result.payrollContributions)} /><Result label={t.netIncome} value={formatCurrency.format(result.netIncome)} /><Result label={t.averageRate} value={formatPercent.format(result.averageRate)} /><Result label={t.marginalRate} value={formatPercent.format(result.marginalRate)} /><Result label={labels.balance} value={formatCurrency.format(Math.abs(result.taxBalance))} /><small className="native-disclaimer">{t.report} {t.quebecOnly}</small></div>
      </div>
    </section>
  );
}
