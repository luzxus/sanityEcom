import React from "react";

import "./CTA.css";

const CTA = () => {
  const email = "richard156@hotmail.se".toLowerCase();

  const openOutlook = () => {
    const recipientEmail = email; // Replace with the actual recipient's email address
    const subject = "Subject goes here"; // Replace with the desired subject
    const body = "Email body goes here"; // Replace with the desired email body

    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="cta-container">
      <div className="text">
        <p>Har du svårt att bestämma dig?</p>
        <p>Kontakta oss vid eventuella frågor</p>
        <p>Gör vardagsmaten lite hetare</p>
      </div>
      <div className="action-button">
        <button onClick={openOutlook}> Kontakta oss</button>
      </div>
    </div>
  );
};

export default CTA;
