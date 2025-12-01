import "./Footer.css";

export default function Footer() {
  return (
    <>
      <section className="footer-area"></section>

      <footer>
        <div className="container">
          <div className="footer-top">
            <h3 className="footer-copy">
              Designing the future:
              <br />
              Ocean intelligence x human creativity.
            </h3>
          </div>
          <div className="footer-acknowledgment">
            <p>
              Compound acknowledges the people of the Woi wurrung and Boon wurrung language groups of the eastern Kulin Nation on whose unceded lands Compound conducts business on. Compound respectfully acknowledges their Ancestors and Elders, past and present. Compound also acknowledges the Traditional Custodians and their Ancestors of the lands and waters across Australia where we conduct our business.
            </p>
          </div>
          <div className="footer-row">
            <h1>Compound</h1>
          </div>
        </div>
      </footer>
    </>
  );
};