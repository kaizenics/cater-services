import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Terms.scss";

const Terms = () => {
  return (
    <div>
      <Navbar />

      <section>
        <div className="terms">
          <h1>TERMS AND CONDITION</h1>
          <p>
            Please read these terms and conditions carefully before using the
            ordering system for Ate Gang's Catering Services. By using the
            ordering system, you agree to be bound by these terms and
            conditions:
          </p>

          <h2>1. Use of the Ordering System: </h2>
          <p>
            The ordering system is provided solely for the purpose of placing
            orders with Ate Gang's Catering Services. You may not use the system
            for any other purpose.
          </p>

          <h2>2. Accuracy of Information:</h2>
          <p>
            You are responsible for ensuring that the information you provide in
            the ordering system is accurate and complete. Ate Gang's Catering
            Services is not responsible for any errors or omissions in the
            information you provide.
          </p>

          <h2>3. Payment:</h2>
          <p>
            Payment for orders placed through the ordering system must be made
            at the time of ordering. Ate Gang's Catering Services reserves the
            right to refuse any order that is not paid for in full.
          </p>

          <h2>4. Cancellation and Refunds: </h2>
          <p>
            Orders placed through the ordering system may be cancelled or
            refunded in accordance with Ate Gang's Catering Services'
            cancellation and refund policy.{" "}
          </p>

          <h2>5. Availability of Products:</h2>
          <p>
            Ate Gang's Catering Services reserves the right to change the
            availability of its products at any time and without notice.
          </p>

          <div className="d-terms">
            <p>
              By using the ordering system, you acknowledge that you have read
              and understood these terms and conditions and agree to be bound by
              them.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Terms;
