import React from "react";

function Footer() {

  const date = new Date();
  const currentYear = date.getFullYear();

  console.log(currentYear);
  return (
    <div>
        <footer>
            <p>
                Copyright&copy; {currentYear}
            </p>
        </footer>
    </div>
  );
}

export default Footer;