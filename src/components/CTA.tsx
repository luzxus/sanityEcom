import React from "react";

import "./CTA.css";

const CTA = () => {
  return (
    <div className="cta-container">
      <div className="text">
        <p>Har du svårt att bestämma dig?</p>
        <p>Kontakta oss vid eventuella frågor</p>
        <p>Gör vardagsmaten lite hetare</p>
      </div>
      <div className="action-button">
        <button>Kontakta oss</button>
      </div>
    </div>
  );
};

export default CTA;
