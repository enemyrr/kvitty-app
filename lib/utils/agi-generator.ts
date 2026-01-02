import type { Workspace, PayrollRun, PayrollEntry, Employee } from "@/lib/db/schema";

interface AGIGeneratorInput {
  workspace: Workspace;
  payrollRun: PayrollRun;
  entries: (PayrollEntry & { employee: Employee })[];
}

export function generateAGIXml(input: AGIGeneratorInput): string {
  const { workspace, payrollRun, entries } = input;

  const now = new Date().toISOString();
  const orgNumber = workspace.orgNumber || "";
  const period = payrollRun.period;

  // Calculate totals
  const totalEmployerContributions = entries.reduce(
    (sum, e) => sum + parseFloat(e.employerContributions),
    0
  );
  const totalTaxDeduction = entries.reduce(
    (sum, e) => sum + parseFloat(e.taxDeduction),
    0
  );

  // Generate IU entries for each employee
  const iuEntries = entries
    .map(
      (entry) => `
  <Blankett xmlns="http://xmls.skatteverket.se/se/skatteverket/da/komponent/schema/1.1">
    <Arendeinformation>
      <Arendeagare>${orgNumber}</Arendeagare>
      <Period>${period}</Period>
    </Arendeinformation>
    <Blankettinnehall>
      <IU>
        <ArbetsgivareIUGROUP>
          <AgRegistreradId faltkod="201">${orgNumber}</AgRegistreradId>
        </ArbetsgivareIUGROUP>
        <BetalningsmottagareIUGROUP>
          <BetalningsmottagareIDChoice>
            <BetalningsmottagarId faltkod="215">${entry.employee.personalNumber}</BetalningsmottagarId>
          </BetalningsmottagareIDChoice>
        </BetalningsmottagareIUGROUP>
        <AndraKostnadsers faltkod="020">${Math.round(parseFloat(entry.otherExpenses || "0"))}</AndraKostnadsers>
        <ArbetsplatsensGatuadress faltkod="245">${entry.workplaceAddress || workspace.address || ""}</ArbetsplatsensGatuadress>
        <ArbetsplatsensOrt faltkod="246">${entry.workplaceCity || workspace.city || ""}</ArbetsplatsensOrt>
        <AvdrPrelSkatt faltkod="001">${Math.round(parseFloat(entry.taxDeduction))}</AvdrPrelSkatt>
        <KontantErsattningUlagAG faltkod="011">${Math.round(parseFloat(entry.grossSalary))}</KontantErsattningUlagAG>
        <RedovisningsPeriod faltkod="006">${period}</RedovisningsPeriod>
        <SkatteplBilformanUlagAG faltkod="013">${Math.round(parseFloat(entry.benefitsCar || "0"))}</SkatteplBilformanUlagAG>
        <SkatteplOvrigaFormanerUlagAG faltkod="012">${Math.round(parseFloat(entry.benefitsOther || "0"))}</SkatteplOvrigaFormanerUlagAG>
        <Specifikationsnummer faltkod="570">${entry.specificationNumber}</Specifikationsnummer>
      </IU>
    </Blankettinnehall>
  </Blankett>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="utf-8" standalone="no"?>
<Skatteverket xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" omrade="Arbetsgivardeklaration" xmlns="http://xmls.skatteverket.se/se/skatteverket/da/instans/schema/1.1">
  <Avsandare xmlns="http://xmls.skatteverket.se/se/skatteverket/da/komponent/schema/1.1">
    <Programnamn>Kvitty</Programnamn>
    <Organisationsnummer>${orgNumber}</Organisationsnummer>
    <TekniskKontaktperson>
      <Namn>${workspace.contactName || ""}</Namn>
      <Telefon>${workspace.contactPhone || ""}</Telefon>
      <Epostadress>${workspace.contactEmail || ""}</Epostadress>
    </TekniskKontaktperson>
    <Skapad>${now}</Skapad>
  </Avsandare>
  <Blankettgemensamt xmlns="http://xmls.skatteverket.se/se/skatteverket/da/komponent/schema/1.1">
    <Arbetsgivare>
      <AgRegistreradId>${orgNumber}</AgRegistreradId>
      <Kontaktperson>
        <Namn>${workspace.contactName || ""}</Namn>
        <Telefon>${workspace.contactPhone || ""}</Telefon>
        <Epostadress>${workspace.contactEmail || ""}</Epostadress>
      </Kontaktperson>
    </Arbetsgivare>
  </Blankettgemensamt>
  <Blankett xmlns="http://xmls.skatteverket.se/se/skatteverket/da/komponent/schema/1.1">
    <Arendeinformation>
      <Arendeagare>${orgNumber}</Arendeagare>
      <Period>${period}</Period>
    </Arendeinformation>
    <Blankettinnehall>
      <HU>
        <ArbetsgivareHUGROUP>
          <AgRegistreradId faltkod="201">${orgNumber}</AgRegistreradId>
        </ArbetsgivareHUGROUP>
        <RedovisningsPeriod faltkod="006">${period}</RedovisningsPeriod>
        <SummaArbAvgSlf faltkod="487">${Math.round(totalEmployerContributions)}</SummaArbAvgSlf>
        <SummaSkatteavdr faltkod="497">${Math.round(totalTaxDeduction)}</SummaSkatteavdr>
      </HU>
    </Blankettinnehall>
  </Blankett>${iuEntries}
</Skatteverket>`;

  return xml;
}
