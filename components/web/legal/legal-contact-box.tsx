export function LegalContactBox() {
  return (
    <div className="my-8 p-6 rounded-lg border border-border bg-muted/30">
      <h3 className="font-medium text-lg mb-3">Kontaktinformation</h3>
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">RIBBAN AB</strong>
        </p>
        <p>Organisationsnummer: 559254-0321</p>
        <p>
          E-post:{" "}
          <a
            href="mailto:hej@kvitty.se"
            className="text-foreground hover:text-foreground/80 underline underline-offset-2"
          >
            hej@kvitty.se
          </a>
        </p>
        <div className="pt-4 mt-4 border-t border-border">
          <p className="text-xs">
            För frågor om personuppgiftsbehandling eller för att utöva dina rättigheter enligt GDPR,
            kontakta oss på e-postadressen ovan.
          </p>
          <p className="text-xs mt-2">
            Du kan också vända dig till{" "}
            <a
              href="https://www.imy.se"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-foreground/80 underline underline-offset-2"
            >
              Integritetsskyddsmyndigheten (IMY)
            </a>{" "}
            om du vill lämna in ett klagomål.
          </p>
        </div>
      </div>
    </div>
  );
}
