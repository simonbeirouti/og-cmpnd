"use client";
// import Link from "next/link";

import "./Footer.css";

const Footer = () => {
  return (
    <>
      <section className="footer-area"></section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div style={{ width: "100%" }}>
              <h3 style={{ marginBottom: "4em", marginLeft: "1em" }}>
                A brief journey into carbon sequestration to grow algae.
              </h3>
            </div>
            {/* <div className="footer-col">
              <div className="footer-sub-col"></div>
              <div className="footer-sub-col footer-links">
                <Link href="/archive">
                  <p>Archive 101</p>
                </Link>
                <Link href="/archive">
                  <p>Archive 102</p>
                </Link>
                <Link href="/archive">
                  <p>Archive 103</p>
                </Link>
              </div>
            </div> */}
          </div>
          <div className="footer-row">
            <h1>Compound</h1>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
