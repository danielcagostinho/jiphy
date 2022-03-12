// React Import
import React, { useEffect } from "react";

// CSS Imports
import "./AboutPage.scss";

const AboutPage = ({ pageName }) => {
  useEffect(() => {
  }, [pageName]);
  return (
    <div className="AboutPage">
      <div className="AboutPageContent">
        <h2>{pageName}</h2>
        <p>
          Minim Lorem fugiat ex qui. Nulla fugiat minim aliqua dolore. Proident
          et culpa labore eu anim veniam aliquip velit minim nulla. Ea tempor
          anim dolor esse minim quis tempor deserunt adipisicing sint mollit in
          esse. Mollit quis deserunt est consequat aliqua dolor eu nisi
          voluptate cupidatat adipisicing do. Est fugiat cillum nisi ut
          voluptate occaecat nulla ipsum. Et labore nisi dolor tempor ea.
        </p>
        <p>
          Minim Lorem fugiat ex qui. Nulla fugiat minim aliqua dolore. Proident
          et culpa labore eu anim veniam aliquip velit minim nulla. Ea tempor
          anim dolor esse minim quis tempor deserunt adipisicing sint mollit in
          esse. Mollit quis deserunt est consequat aliqua dolor eu nisi
          voluptate cupidatat adipisicing do. Est fugiat cillum nisi ut
          voluptate occaecat nulla ipsum. Et labore nisi dolor tempor ea.
        </p>
        <p>
          Minim Lorem fugiat ex qui. Nulla fugiat minim aliqua dolore. Proident
          et culpa labore eu anim veniam aliquip velit minim nulla. Ea tempor
          anim dolor esse minim quis tempor deserunt adipisicing sint mollit in
          esse. Mollit quis deserunt est consequat aliqua dolor eu nisi
          voluptate cupidatat adipisicing do. Est fugiat cillum nisi ut
          voluptate occaecat nulla ipsum. Et labore nisi dolor tempor ea.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
