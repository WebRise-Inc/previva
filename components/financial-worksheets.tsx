"use client";

import { useMemo, useState } from "react";
import { Printer, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/site";

type Entry = { self: string; spouse: string; rate?: string };
type Entries = Record<string, Entry>;
type Row = { key: string; fr: string; en: string };
type Section = { key: string; fr: string; en: string; rows: Row[] };

const assetRows: Row[] = [
  { key: "cash", fr: "Argent comptant", en: "Cash" },
  { key: "accounts", fr: "Comptes de chèques ou d’épargne", en: "Chequing or savings accounts" },
  { key: "tfsa", fr: "Compte d’épargne libre d’impôt (CELI)", en: "Tax-Free Savings Account (TFSA)" },
  { key: "registered", fr: "REER / FERR / CRI / FRV", en: "RRSP / RRIF / LIRA / LIF" },
  { key: "insurance", fr: "Valeur de rachat — assurance vie", en: "Life insurance cash surrender value" },
  { key: "nonRegistered", fr: "Placements non enregistrés", en: "Non-registered investments" },
  { key: "pension", fr: "Régime de retraite avec votre employeur", en: "Employer pension plan" },
  { key: "property", fr: "Immeuble(s) — maison, chalet ou autre", en: "Real estate — home, cottage, or other" },
  { key: "business", fr: "Biens commerciaux — équipement, inventaire, etc.", en: "Business property — equipment, inventory, etc." },
  { key: "vehicles", fr: "Véhicules", en: "Vehicles" },
  { key: "otherAssets", fr: "Autres actifs", en: "Other assets" },
];

const debtRows: Row[] = [
  { key: "creditCards", fr: "Solde de cartes de crédit", en: "Credit card balances" },
  { key: "creditLines", fr: "Solde de marges de crédit", en: "Lines of credit" },
  { key: "personalLoans", fr: "Solde d’emprunts personnels", en: "Personal loans" },
  { key: "autoLoans", fr: "Solde d’emprunts autos", en: "Vehicle loans" },
  { key: "mortgage", fr: "Solde de l’hypothèque", en: "Mortgage balance" },
  { key: "studentLoan", fr: "Solde de prêt étudiant", en: "Student loan balance" },
  { key: "otherDebt", fr: "Autres dettes", en: "Other debts" },
];

const incomeRows: Row[] = [
  { key: "netSalary", fr: "Salaire net", en: "Net salary" },
  { key: "rentalIncome", fr: "Revenus nets de location", en: "Net rental income" },
  { key: "publicBenefits", fr: "Prestations de régimes publics — assurance emploi, CNESST, RRQ, etc.", en: "Public plan benefits — employment insurance, CNESST, QPP, etc." },
  { key: "privateBenefits", fr: "Prestations de régimes privés — retraite, assureur, etc.", en: "Private plan benefits — pension, insurer, etc." },
  { key: "childBenefit", fr: "Allocation pour enfants", en: "Child benefits" },
  { key: "supportIncome", fr: "Revenus de pension alimentaire", en: "Support payments received" },
  { key: "investmentIncome", fr: "Revenus de placement", en: "Investment income" },
  { key: "otherIncome", fr: "Autres revenus", en: "Other income" },
];

const expenseSections: Section[] = [
  {
    key: "housing", fr: "Habitation", en: "Housing", rows: [
      { key: "rentMortgage", fr: "Loyer / hypothèque", en: "Rent / mortgage" },
      { key: "utilities", fr: "Électricité / chauffage", en: "Electricity / heating" },
      { key: "telecom", fr: "Téléphone / câble / Internet", en: "Phone / cable / Internet" },
      { key: "propertyTaxes", fr: "Taxes municipales / scolaires", en: "Municipal / school taxes" },
      { key: "homeInsurance", fr: "Assurance habitation", en: "Home insurance" },
      { key: "condoFees", fr: "Frais de copropriété", en: "Condo fees" },
      { key: "homeMaintenance", fr: "Entretien de la maison", en: "Home maintenance" },
      { key: "furnishings", fr: "Ameublement, accessoires, outils", en: "Furniture, accessories, tools" },
      { key: "otherHousing", fr: "Autres dépenses d’habitation", en: "Other housing expenses" },
    ],
  },
  {
    key: "transport", fr: "Transport", en: "Transportation", rows: [
      { key: "publicTransit", fr: "Transport en commun", en: "Public transit" },
      { key: "fuel", fr: "Essence", en: "Fuel" },
      { key: "autoInsurance", fr: "Assurance auto", en: "Auto insurance" },
      { key: "registration", fr: "Immatriculation", en: "Vehicle registration" },
      { key: "licence", fr: "Permis de conduire", en: "Driver’s licence" },
      { key: "parking", fr: "Location auto / stationnement", en: "Vehicle rental / parking" },
      { key: "autoMaintenance", fr: "Entretien et réparations", en: "Maintenance and repairs" },
      { key: "otherTransport", fr: "Autres dépenses associées au transport", en: "Other transportation expenses" },
    ],
  },
  {
    key: "insurance", fr: "Assurance", en: "Insurance", rows: [
      { key: "lifeInsurance", fr: "Assurance vie", en: "Life insurance" },
      { key: "otherInsurance", fr: "Autres assurances — maladie, médicaments, etc.", en: "Other insurance — health, medication, etc." },
    ],
  },
  {
    key: "food", fr: "Alimentation", en: "Food", rows: [
      { key: "groceries", fr: "Épicerie", en: "Groceries" },
      { key: "restaurants", fr: "Restaurants", en: "Restaurants" },
      { key: "alcohol", fr: "Alcool", en: "Alcohol" },
    ],
  },
  { key: "clothing", fr: "Habillement", en: "Clothing", rows: [{ key: "clothingPurchases", fr: "Achats", en: "Purchases" }] },
  {
    key: "leisure", fr: "Loisirs", en: "Leisure", rows: [
      { key: "cultural", fr: "Activités culturelles", en: "Cultural activities" },
      { key: "sports", fr: "Activités sportives", en: "Sports activities" },
      { key: "media", fr: "Journaux, revues, musique", en: "Newspapers, magazines, music" },
      { key: "moviesGames", fr: "Location de films et de jeux", en: "Movie and game rentals" },
      { key: "lotteries", fr: "Loteries", en: "Lotteries" },
      { key: "travel", fr: "Voyage", en: "Travel" },
    ],
  },
  {
    key: "education", fr: "Éducation", en: "Education", rows: [
      { key: "courses", fr: "Cours", en: "Courses" },
      { key: "schoolSupplies", fr: "Matériel scolaire", en: "School supplies" },
      { key: "schoolTrips", fr: "Sorties pédagogiques", en: "School trips" },
    ],
  },
  {
    key: "health", fr: "Soins de santé / Beauté", en: "Health care / Personal care", rows: [
      { key: "hair", fr: "Coiffeur", en: "Hair care" },
      { key: "beauty", fr: "Esthéticienne", en: "Beauty care" },
      { key: "pharmacy", fr: "Pharmacie", en: "Pharmacy" },
      { key: "dental", fr: "Dentiste, optométriste, autres", en: "Dentist, optometrist, other" },
    ],
  },
  {
    key: "misc", fr: "Divers", en: "Miscellaneous", rows: [
      { key: "gifts", fr: "Cadeaux", en: "Gifts" },
      { key: "pets", fr: "Animaux", en: "Pets" },
      { key: "tobacco", fr: "Tabac", en: "Tobacco" },
      { key: "allowance", fr: "Argent de poche pour enfants", en: "Children’s allowance" },
      { key: "bankFees", fr: "Frais bancaires", en: "Bank fees" },
      { key: "supportExpense", fr: "Pension alimentaire", en: "Support payments" },
      { key: "childcare", fr: "Frais de garde", en: "Child care" },
      { key: "otherExpense", fr: "Autres dépenses", en: "Other expenses" },
    ],
  },
];

const repaymentRows: Row[] = [
  { key: "mortgagePayment", fr: "Hypothèque — si non incluse dans l’habitation", en: "Mortgage — if not included under housing" },
  { key: "creditCard1", fr: "Carte de crédit 1", en: "Credit card 1" },
  { key: "creditCard2", fr: "Carte de crédit 2", en: "Credit card 2" },
  { key: "otherCreditCards", fr: "Autres cartes de crédit", en: "Other credit cards" },
  { key: "creditLinePayment", fr: "Marge de crédit", en: "Line of credit" },
  { key: "personalLoanPayment", fr: "Prêt personnel", en: "Personal loan" },
  { key: "studentLoanPayment", fr: "Prêt étudiant", en: "Student loan" },
  { key: "rrspLoan", fr: "Prêt REER", en: "RRSP loan" },
  { key: "hbp", fr: "RAP", en: "Home Buyers’ Plan" },
  { key: "otherLoans", fr: "Autres emprunts", en: "Other loans" },
];

const savingsRows: Row[] = [
  { key: "reserveFund", fr: "Fonds de réserve", en: "Emergency fund" },
  { key: "rrspSavings", fr: "REER", en: "RRSP" },
  { key: "respSavings", fr: "REEE", en: "RESP" },
  { key: "tfsaSavings", fr: "CELI", en: "TFSA" },
  { key: "specialProjects", fr: "Projets spéciaux", en: "Special projects" },
  { key: "otherSavings", fr: "Autres épargnes", en: "Other savings" },
];

const labels = {
  fr: {
    you: "Vous", spouse: "Votre conjoint", household: "Ménage", rate: "Taux d’intérêt", total: "Total",
    print: "Imprimer", reset: "Effacer", assets: "Vos avoirs", debts: "Vos dettes", netWorth: "Valeur nette",
    combinedNetWorth: "Valeur nette pour les deux conjoints", assetsIntro: "Inscrivez la valeur actuelle de chaque avoir. Pour les régimes enregistrés, utilisez si possible une valeur nette d’impôt estimée.",
    debtsIntro: "Inscrivez le solde complet de chaque dette ainsi que son taux d’intérêt, et non seulement le paiement mensuel.",
    budgetIncome: "Revenus", expenses: "Dépenses", repayments: "Remboursement de dettes", savings: "Épargne",
    surplus: "Surplus ou déficit de la période", privacy: "Les renseignements saisis restent uniquement dans votre navigateur et ne sont pas enregistrés.",
  },
  en: {
    you: "You", spouse: "Your spouse", household: "Household", rate: "Interest rate", total: "Total",
    print: "Print", reset: "Clear", assets: "Your assets", debts: "Your debts", netWorth: "Net worth",
    combinedNetWorth: "Combined net worth", assetsIntro: "Enter the current value of each asset. For registered plans, use an estimated after-tax value where possible.",
    debtsIntro: "Enter the full outstanding balance and interest rate for each debt, not only the monthly payment.",
    budgetIncome: "Income", expenses: "Expenses", repayments: "Debt repayments", savings: "Savings",
    surplus: "Surplus or deficit for the period", privacy: "Information entered here stays in your browser and is not stored.",
  },
} as const;

function amount(value: string | undefined) {
  return Number.parseFloat(value || "0") || 0;
}

function sumRows(entries: Entries, rows: Row[], person: "self" | "spouse") {
  return rows.reduce((total, row) => total + amount(entries[row.key]?.[person]), 0);
}

function MoneyInput({ label, value, onChange, suffix }: { label: string; value: string; onChange: (value: string) => void; suffix?: string }) {
  return (
    <label className="worksheet-input">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">{suffix ? null : "$"}</span>
      <input type="number" inputMode="decimal" min="0" step={suffix ? "0.01" : "1"} value={value} placeholder="0" onChange={(event) => onChange(event.target.value)} />
      {suffix ? <span aria-hidden="true">{suffix}</span> : null}
    </label>
  );
}

function WorksheetActions({ locale, onReset }: { locale: Locale; onReset: () => void }) {
  const t = labels[locale];
  return (
    <div className="worksheet-actions">
      <Button type="button" variant="outline" onClick={() => window.print()}><Printer className="size-4" />{t.print}</Button>
      <Button type="button" variant="outline" onClick={onReset}><RotateCcw className="size-4" />{t.reset}</Button>
    </div>
  );
}

function EntryRow({ row, entries, setEntries, locale, includeRate = false }: { row: Row; entries: Entries; setEntries: React.Dispatch<React.SetStateAction<Entries>>; locale: Locale; includeRate?: boolean }) {
  const entry = entries[row.key] ?? { self: "", spouse: "", rate: "" };
  const update = (field: keyof Entry, value: string) => setEntries((current) => ({ ...current, [row.key]: { ...entry, ...current[row.key], [field]: value } }));
  const rowLabel = row[locale];

  return (
    <div className={`worksheet-row${includeRate ? " has-rate" : ""}`}>
      <div className="worksheet-row-label">{rowLabel}</div>
      <MoneyInput label={`${rowLabel} — ${labels[locale].you}`} value={entry.self} onChange={(value) => update("self", value)} />
      <MoneyInput label={`${rowLabel} — ${labels[locale].spouse}`} value={entry.spouse} onChange={(value) => update("spouse", value)} />
      {includeRate ? <MoneyInput label={`${rowLabel} — ${labels[locale].rate}`} value={entry.rate ?? ""} onChange={(value) => update("rate", value)} suffix="%" /> : null}
    </div>
  );
}

function WorksheetHeader({ locale, includeRate = false }: { locale: Locale; includeRate?: boolean }) {
  const t = labels[locale];
  return <div className={`worksheet-row worksheet-column-heads${includeRate ? " has-rate" : ""}`}><span /><strong>{t.you}</strong><strong>{t.spouse}</strong>{includeRate ? <strong>{t.rate}</strong> : null}</div>;
}

function TotalRow({ label, self, spouse, format, emphasis = false }: { label: string; self: number; spouse: number; format: Intl.NumberFormat; emphasis?: boolean }) {
  return <div className={`worksheet-row worksheet-total${emphasis ? " emphasis" : ""}`}><strong>{label}</strong><output>{format.format(self)}</output><output>{format.format(spouse)}</output></div>;
}

export function FinancialStatementTool({ locale }: { locale: Locale }) {
  const t = labels[locale];
  const [entries, setEntries] = useState<Entries>({});
  const format = useMemo(() => new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }), [locale]);
  const assetsSelf = sumRows(entries, assetRows, "self");
  const assetsSpouse = sumRows(entries, assetRows, "spouse");
  const debtsSelf = sumRows(entries, debtRows, "self");
  const debtsSpouse = sumRows(entries, debtRows, "spouse");
  const netSelf = assetsSelf - debtsSelf;
  const netSpouse = assetsSpouse - debtsSpouse;

  return (
    <section className="section worksheet-section">
      <div className="container worksheet-toolbar"><p>{t.privacy}</p><WorksheetActions locale={locale} onReset={() => setEntries({})} /></div>
      <div className="container worksheet-layout">
        <div className="worksheet-main">
          <section className="worksheet-group">
            <div className="worksheet-group-heading"><p className="eyebrow">01</p><h2>{t.assets}</h2><p>{t.assetsIntro}</p></div>
            <div className="worksheet-table-wrap"><div className="worksheet-table"><WorksheetHeader locale={locale} />{assetRows.map((row) => <EntryRow key={row.key} row={row} entries={entries} setEntries={setEntries} locale={locale} />)}<TotalRow label={t.total} self={assetsSelf} spouse={assetsSpouse} format={format} emphasis /></div></div>
          </section>
          <section className="worksheet-group">
            <div className="worksheet-group-heading"><p className="eyebrow">02</p><h2>{t.debts}</h2><p>{t.debtsIntro}</p></div>
            <div className="worksheet-table-wrap"><div className="worksheet-table rate-table"><WorksheetHeader locale={locale} includeRate />{debtRows.map((row) => <EntryRow key={row.key} row={row} entries={entries} setEntries={setEntries} locale={locale} includeRate />)}<TotalRow label={t.total} self={debtsSelf} spouse={debtsSpouse} format={format} emphasis /></div></div>
          </section>
        </div>
        <aside className="worksheet-summary">
          <p>{t.combinedNetWorth}</p><output className={netSelf + netSpouse < 0 ? "negative" : undefined}>{format.format(netSelf + netSpouse)}</output>
          <dl><div><dt>{t.you}</dt><dd>{format.format(netSelf)}</dd></div><div><dt>{t.spouse}</dt><dd>{format.format(netSpouse)}</dd></div><div><dt>{t.assets}</dt><dd>{format.format(assetsSelf + assetsSpouse)}</dd></div><div><dt>{t.debts}</dt><dd>{format.format(debtsSelf + debtsSpouse)}</dd></div></dl>
        </aside>
      </div>
    </section>
  );
}

function BudgetGroup({ number, title, rows, entries, setEntries, locale, format }: { number: string; title: string; rows: Row[]; entries: Entries; setEntries: React.Dispatch<React.SetStateAction<Entries>>; locale: Locale; format: Intl.NumberFormat }) {
  const self = sumRows(entries, rows, "self");
  const spouse = sumRows(entries, rows, "spouse");
  return (
    <section className="worksheet-group budget-group">
      <div className="worksheet-group-heading compact"><p className="eyebrow">{number}</p><h2>{title}</h2></div>
      <div className="worksheet-table-wrap"><div className="worksheet-table"><WorksheetHeader locale={locale} />{rows.map((row) => <EntryRow key={row.key} row={row} entries={entries} setEntries={setEntries} locale={locale} />)}<TotalRow label={labels[locale].total} self={self} spouse={spouse} format={format} /></div></div>
    </section>
  );
}

export function BudgetTool({ locale }: { locale: Locale }) {
  const t = labels[locale];
  const [entries, setEntries] = useState<Entries>({});
  const format = useMemo(() => new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }), [locale]);
  const expenseRows = expenseSections.flatMap((section) => section.rows);
  const totals = {
    incomeSelf: sumRows(entries, incomeRows, "self"), incomeSpouse: sumRows(entries, incomeRows, "spouse"),
    expenseSelf: sumRows(entries, expenseRows, "self"), expenseSpouse: sumRows(entries, expenseRows, "spouse"),
    debtSelf: sumRows(entries, repaymentRows, "self"), debtSpouse: sumRows(entries, repaymentRows, "spouse"),
    savingsSelf: sumRows(entries, savingsRows, "self"), savingsSpouse: sumRows(entries, savingsRows, "spouse"),
  };
  const surplusSelf = totals.incomeSelf - totals.expenseSelf - totals.debtSelf - totals.savingsSelf;
  const surplusSpouse = totals.incomeSpouse - totals.expenseSpouse - totals.debtSpouse - totals.savingsSpouse;
  const household = surplusSelf + surplusSpouse;

  return (
    <section className="section worksheet-section">
      <div className="container worksheet-toolbar"><p>{t.privacy}</p><WorksheetActions locale={locale} onReset={() => setEntries({})} /></div>
      <div className="container budget-layout">
        <div className="worksheet-main">
          <BudgetGroup number="01" title={t.budgetIncome} rows={incomeRows} entries={entries} setEntries={setEntries} locale={locale} format={format} />
          {expenseSections.map((section, index) => <BudgetGroup key={section.key} number={String(index + 2).padStart(2, "0")} title={`${t.expenses} — ${section[locale]}`} rows={section.rows} entries={entries} setEntries={setEntries} locale={locale} format={format} />)}
          <BudgetGroup number="11" title={t.repayments} rows={repaymentRows} entries={entries} setEntries={setEntries} locale={locale} format={format} />
          <BudgetGroup number="12" title={t.savings} rows={savingsRows} entries={entries} setEntries={setEntries} locale={locale} format={format} />
        </div>
        <aside className="worksheet-summary budget-summary">
          <p>{t.surplus}</p><output className={household < 0 ? "negative" : undefined}>{format.format(household)}</output>
          <dl>
            <div><dt>{t.budgetIncome}</dt><dd>{format.format(totals.incomeSelf + totals.incomeSpouse)}</dd></div>
            <div><dt>{t.expenses}</dt><dd>{format.format(totals.expenseSelf + totals.expenseSpouse)}</dd></div>
            <div><dt>{t.repayments}</dt><dd>{format.format(totals.debtSelf + totals.debtSpouse)}</dd></div>
            <div><dt>{t.savings}</dt><dd>{format.format(totals.savingsSelf + totals.savingsSpouse)}</dd></div>
            <div><dt>{t.you}</dt><dd>{format.format(surplusSelf)}</dd></div>
            <div><dt>{t.spouse}</dt><dd>{format.format(surplusSpouse)}</dd></div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
