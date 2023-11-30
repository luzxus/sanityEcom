import { Metadata } from 'next'

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Fraktinformation - drömföretaget',
  description:
    'Läs vår fraktinformation för att få reda på leveranstider och priser för leverans inom Sverige, EU och utanför EU. Kontakta oss om du har ytterligare frågor.',
  // other metadata
}

// FraktInformation component
const FraktInformation = () => {
  return (
    <div className="frakt-container">
      <h2>Fraktinformation</h2>

      {/* Section 1: Order Processing and Free Shipping (Sverige) */}
      <section className="section">
        <p>
          Alla ordrar packas och skickas inom 1-5 arbetsdagar och beställningar
          (inom Sverige) över 500kr innebär fri frakt.
        </p>
        <p>
          Observera att vid förbeställning skickas din beställning när samtliga
          produkter finns på lager, vilket kan medföra längre leveranstid. Mer
          information kommer med din orderbekräftelse.
        </p>
      </section>

      {/* Section 2: Shipping within Sweden with Postnord */}
      <section className="section">
        <h3>Frakt inom Sverige med Postnord</h3>
        <p>
          Alla ordrar skickas med Postnord, och fraktkostnaden beräknas i kassan
          baserat på vikt.
        </p>
        <ul>
          <li>0g-50g: 15kr</li>
          <li>50g-100g: 30kr</li>
          <li>100g-250g: 54kr</li>
          <li>250g-500g: 60kr</li>
          <li>500g-1kg: 74kr</li>
          <li>1kg-2kg: 109kr</li>
          <li>2kg-3kg: 122kr</li>
          <li>3kg-5kg: 149kr</li>
        </ul>
      </section>

      {/* Section 3: Shipping outside Sweden within EU */}
      <section className="section">
        <h3>Frakt utanför Sverige men inom EU</h3>
        <p>Leveranstid är 1-20 dagar ungefär.</p>
        <ul>
          <li>0-50g: 119kr</li>
          <li>50g-100g: 134kr</li>
          {/* Add the rest of the EU shipping details */}
        </ul>
      </section>

      {/* Section 4: Shipping outside EU */}
      <section className="section">
        <h3>Frakt utanför EU</h3>
        <p>Leveranstid 4-30 dagar.</p>
        <ul>
          <li>0-250g: 108kr</li>
          <li>250g-1kg: 156kr</li>
          {/* Add the rest of the outside EU shipping details */}
        </ul>
      </section>

      {/* Section 5: Contact for Questions */}
      <section className="section">
        <h3>Kontakta oss för fler frågor</h3>
        <p>Har ni några frågor gällande frakt så kontakta oss.</p>
      </section>
    </div>
  )
}

export default FraktInformation
