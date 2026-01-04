import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/web/legal/legal-page-layout";
import { LegalSection } from "@/components/web/legal/legal-section";
import { LegalContactBox } from "@/components/web/legal/legal-contact-box";

export const metadata: Metadata = {
  title: "Datasäkerhetspolicy — Kvitty",
  description: "Kvittys datasäkerhetspolicy beskriver hur vi skyddar och säkerställer integriteten av dina uppgifter.",
};

export default function DataSecurityPage() {
  return (
    <LegalPageLayout
      title="Datasäkerhetspolicy"
      lastUpdated="4 januari 2026"
      description="Denna datasäkerhetspolicy beskriver de tekniska och organisatoriska säkerhetsåtgärder vi vidtar för att skydda dina data."
    >
      {/* Introduktion */}
      <LegalSection id="introduktion" title="1. Introduktion">
        <p>
          På Kvitty gör vi skillnad på <strong className="text-foreground">integritetsskydd</strong>{" "}
          (att skydda data från obehörig åtkomst) och <strong className="text-foreground">datasäkerhet</strong>{" "}
          (att säkerställa att data inte går förlorad).
        </p>
        <p>
          För bokföringsdata är datasäkerhet särskilt kritisk. Att förlora bokföringsunderlag kan få
          allvarliga konsekvenser för ditt företag. Därför prioriterar vi dataintegritet och tillgänglighet
          högt genom robusta backup- och återställningsrutiner.
        </p>
        <p>
          Denna policy beskriver våra säkerhetsåtgärder för att skydda dina data mot både obehörig
          åtkomst och dataförlust.
        </p>
      </LegalSection>

      {/* Dataintegritet */}
      <LegalSection id="dataintegritet" title="2. Dataintegritet och tillgänglighet">
        <p>
          Vi säkerställer att dina bokföringsdata och övriga uppgifter är säkra och tillgängliga genom:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Kontinuerliga backuper:</strong> Automatiska säkerhetskopior
            av databasen
          </li>
          <li>
            <strong className="text-foreground">Point-in-time återställning:</strong> Möjlighet att
            återställa data till valfri tidpunkt
          </li>
          <li>
            <strong className="text-foreground">Redundans:</strong> Data replikeras över flera servrar
            och datacenter
          </li>
          <li>
            <strong className="text-foreground">Katastrofåterställning:</strong> Rutiner för att
            återställa tjänsten vid allvarliga incidenter
          </li>
        </ul>
      </LegalSection>

      {/* Backup-strategi */}
      <LegalSection id="backup" title="3. Backup-strategi">
        <p>
          Våra säkerhetskopieringsrutiner säkerställer att dina data kan återställas vid behov:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">3.1 Databas-backuper</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kontinuerliga backuper av PostgreSQL-databasen</li>
              <li>Point-in-time recovery möjlighet</li>
              <li>Backuper bevaras enligt definierade bevarandeperioder</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">3.2 Vercel plattforms-backuper</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Automatiska backuper av applikationskod och konfiguration</li>
              <li>Versionhantering via Git för kodändringar</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">3.3 Fillagrings-redundans</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Filer (kvitton, bilagor) lagras i Vercel Blob med inbyggd redundans</li>
              <li>Automatisk replikering över flera datacenter</li>
              <li>Fördröjd radering för återställning av misstagna raderingar</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">3.4 Bevarandeperioder</h3>
            <p>
              Backuper bevaras i enlighet med svensk bokföringslagstiftning (7 år för bokföringsdata)
              och våra interna rutiner för dataintegritet.
            </p>
          </div>
        </div>
        <div className="mt-6 p-4 rounded-lg border border-border bg-muted/30">
          <p className="text-sm">
            <strong className="text-foreground">Observera:</strong> Specifika backup-detaljer kan variera
            beroende på hosting-setup och databas-leverantör. Kontakta oss för mer detaljerad information
            om våra aktuella backup-rutiner.
          </p>
        </div>
      </LegalSection>

      {/* Åtkomstkontroll */}
      <LegalSection id="atkomstkontroll" title="4. Åtkomstkontroll">
        <p>
          Vi begränsar åtkomsten till dina personuppgifter genom flera säkerhetslager:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">4.1 Begränsad personalåtkomst</h3>
            <p>
              Endast ett fåtal behöriga personer har administrativ åtkomst till produktionssystem.
              All åtkomst loggas och övervakas.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">4.2 Multifaktorautentisering</h3>
            <p>
              All administrativ åtkomst kräver multifaktorautentisering (MFA) för att förhindra
              obehörig åtkomst även vid komprometterade lösenord.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">4.3 Rollbaserad åtkomstkontroll (RBAC)</h3>
            <p>
              Inom Kvitty-applikationen används rollbaserad åtkomstkontroll där arbetsytemedlemmar
              endast har åtkomst till den arbetsyta de är inbjudna till.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">4.4 Revisionsloggning</h3>
            <p>
              Känsliga operationer loggas för att möjliggöra granskning och upptäckt av misstänkt
              aktivitet.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">4.5 Sessionshantering</h3>
            <p>
              Vi använder better-auth för säker sessionshantering med automatisk utloggning efter
              inaktivitet och säker token-hantering.
            </p>
          </div>
        </div>
      </LegalSection>

      {/* Kryptering */}
      <LegalSection id="kryptering" title="5. Kryptering">
        <p>
          All data krypteras för att skydda mot obehörig åtkomst:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">5.1 Data under överföring</h3>
            <p>
              <strong className="text-foreground">TLS/SSL är obligatoriskt.</strong> All kommunikation
              mellan din webbläsare och våra servrar krypteras med modern TLS-kryptering. Okrypterade
              HTTP-anslutningar stöds inte.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">5.2 Data i vila</h3>
            <p>
              All data som lagras i databasen krypteras i vila (encryption at rest) för att skydda mot
              obehörig åtkomst vid fysisk kompromittering av servrar.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">5.3 Fillagringskryptering</h3>
            <p>
              Uppladdade filer (kvitton, bilagor, PDF:er) krypteras både under överföring och i
              Vercel Blob-lagring.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">5.4 Autentiseringstokenkryptering</h3>
            <p>
              Sessionstokens och OAuth-tokens krypteras och lagras säkert. Tokens i databasen är
              hashade eller krypterade.
            </p>
          </div>
        </div>
      </LegalSection>

      {/* Infrastruktursäkerhet */}
      <LegalSection id="infrastruktur" title="6. Infrastruktursäkerhet">
        <p>
          Vår tekniska infrastruktur är byggd med säkerhet i åtanke:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">6.1 Hosting med Vercel</h3>
            <p>
              Kvitty hostas på Vercel, en ledande plattform med omfattande säkerhetscertifieringar
              och compliance (SOC 2, GDPR-compliance).
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">6.2 PostgreSQL-säkerhet</h3>
            <p>
              Vår PostgreSQL-databas körs hos en säkerhetsgranskad leverantör med:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Automatiska säkerhetsuppdateringar</li>
              <li>Nätverksisolering och brandväggar</li>
              <li>Krypterad lagring</li>
              <li>Kontinuerlig övervakning</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">6.3 Regelbundna säkerhetsuppdateringar</h3>
            <p>
              Vi uppdaterar regelbundet våra system, bibliotek och dependencies för att åtgärda
              säkerhetssårbarheter.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">6.4 Sårbarhetsscanning</h3>
            <p>
              Våra dependencies övervakas kontinuerligt för kända sårbarheter. Kritiska sårbarheter
              åtgärdas prioriterat.
            </p>
          </div>
        </div>
      </LegalSection>

      {/* Interna rutiner */}
      <LegalSection id="interna-rutiner" title="7. Interna säkerhetsrutiner">
        <p>
          Vi har etablerat interna processer för att upprätthålla hög säkerhet:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">7.1 Kodgranskningsprocess</h3>
            <p>
              Kvitty är öppen källkod på GitHub. All kod granskas innan den mergas till produktion.
              Community-bidrag granskas extra noggrant.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">7.2 Säkerhetstestning</h3>
            <p>
              Vi utför regelbundna säkerhetstester och sårbarhetsanalyser av applikationen.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">7.3 Personalåtkomstkontroller</h3>
            <p>
              Begränsad personal har åtkomst till produktionssystem. Åtkomst beviljas enligt
              principle of least privilege (minsta nödvändiga behörighet).
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">7.4 DPIA (Data Protection Impact Assessments)</h3>
            <p>
              Vi genomför dataskyddskonsekvensbedömningar (DPIA) för nya funktioner som hanterar
              känsliga personuppgifter.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">7.5 Incidenthanteringsprocedurer</h3>
            <p>
              Vi har rutiner för att hantera säkerhetsincidenter, inklusive:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Incidentidentifiering och triagering</li>
              <li>Containment och eliminering av hot</li>
              <li>Återställning av tjänster</li>
              <li>Kommunikation till berörda parter</li>
              <li>Post-incident analys och förbättringar</li>
            </ul>
          </div>
        </div>
      </LegalSection>

      {/* Tredjepartssäkerhet */}
      <LegalSection id="tredjepartssäkerhet" title="8. Tredjepartssäkerhet">
        <p>
          Vi arbetar med noggrant utvalda tredjepartsleverantörer:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">8.1 Leverantörssäkerhetsbedömningar</h3>
            <p>
              Innan vi integrerar med en tredjepartstjänst utvärderar vi deras säkerhetspraxis,
              certifieringar och GDPR-compliance.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">8.2 Underpersonuppgiftsbiträden</h3>
            <p>
              Våra huvudsakliga underpersonuppgiftsbiträden är:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Vercel Inc. (hosting, edge functions, blob storage)</li>
              <li>PostgreSQL-leverantör (databashosting)</li>
              <li>Google LLC (OAuth-autentisering, vid användarens val)</li>
              <li>Groq (AI-tjänster)</li>
            </ul>
            <p className="mt-2">
              Alla dessa leverantörer är GDPR-compliance och har lämpliga säkerhetsåtgärder på plats.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">8.3 Serviceavtal (SLA)</h3>
            <p>
              Vi har serviceavtal med våra kritiska leverantörer som definierar säkerhetskrav,
              incidenthantering och drifttidsgarantier.
            </p>
          </div>
        </div>
      </LegalSection>

      {/* Användaransvar */}
      <LegalSection id="användaransvar" title="9. Användaransvar">
        <p>
          Datasäkerhet är ett delat ansvar. Du som användare har ansvar för:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">9.1 Skydda kontoinloggningsuppgifter</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Använd ett starkt, unikt lösenord (om tillämpligt)</li>
              <li>Dela aldrig dina inloggningsuppgifter med andra</li>
              <li>Logga ut från delade datorer</li>
              <li>Använd tvåfaktorautentisering när tillgängligt</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">9.2 Rapportera säkerhetsincidenter</h3>
            <p>
              Om du misstänker att ditt konto har komprometterats eller upptäcker en säkerhetsbrist,
              kontakta oss omedelbart på{" "}
              <a
                href="mailto:hej@kvitty.se"
                className="text-foreground hover:text-foreground/80 underline underline-offset-2"
              >
                hej@kvitty.se
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">9.3 Granska arbetsytemedlemsåtkomst</h3>
            <p>
              Kontrollera regelbundet vilka användare som har åtkomst till dina arbetsytor och ta
              bort åtkomst för användare som inte längre behöver den.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">9.4 Behåll egna säkerhetskopior</h3>
            <p>
              Trots våra omfattande backup-rutiner rekommenderar vi starkt att du regelbundet exporterar
              dina bokföringsdata (SIE-filer) och sparar lokalt som en extra säkerhetsåtgärd.
            </p>
          </div>
        </div>
      </LegalSection>

      {/* Incidenthantering */}
      <LegalSection id="incidenthantering" title="10. Incidenthantering och rapportering">
        <p>
          Vid en säkerhetsincident eller dataintrång följer vi dessa rutiner:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">10.1 Rapportering till tillsynsmyndighet</h3>
            <p>
              Om en personuppgiftsincident medför risk för enskildas rättigheter och friheter rapporterar
              vi detta till Integritetsskyddsmyndigheten (IMY) inom 72 timmar enligt GDPR artikel 33.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">10.2 Notifiering till berörda användare</h3>
            <p>
              Om incidenten medför hög risk för dina rättigheter och friheter kommer vi att meddela
              dig direkt via e-post enligt GDPR artikel 34.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-2">10.3 Kontakt vid säkerhetsincidenter</h3>
            <p>
              För att rapportera säkerhetsincidenter eller säkerhetsproblem, kontakta oss på:
            </p>
            <div className="pl-4 mt-2">
              <a
                href="mailto:hej@kvitty.se"
                className="text-foreground hover:text-foreground/80 underline underline-offset-2"
              >
                hej@kvitty.se
              </a>
            </div>
          </div>
        </div>
      </LegalSection>

      {/* Kontakt */}
      <LegalSection id="kontakt" title="11. Kontaktinformation">
        <p>
          Om du har frågor om vår datasäkerhetspolicy eller säkerhetsrutiner, är du välkommen att
          kontakta oss.
        </p>
        <LegalContactBox />
      </LegalSection>

      {/* Ändringar */}
      <LegalSection id="andringar" title="12. Ändringar av datasäkerhetspolicyn">
        <p>
          Vi förbehåller oss rätten att uppdatera denna datasäkerhetspolicy för att återspegla
          förändringar i vår säkerhetspraxis eller lagkrav. Datumet för senaste uppdatering finns
          längst upp på denna sida.
        </p>
      </LegalSection>

      {/* Relaterade dokument */}
      <LegalSection id="relaterade" title="13. Relaterade dokument">
        <p>För mer information, se även:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link
              href="/privacy"
              className="text-foreground hover:text-foreground/80 underline underline-offset-2"
            >
              Integritetspolicy
            </Link>
            {" "}— Hur vi behandlar personuppgifter
          </li>
          <li>
            <Link
              href="/terms"
              className="text-foreground hover:text-foreground/80 underline underline-offset-2"
            >
              Användarvillkor
            </Link>
            {" "}— Regler och ansvar vid användning av Kvitty
          </li>
        </ul>
      </LegalSection>
    </LegalPageLayout>
  );
}
