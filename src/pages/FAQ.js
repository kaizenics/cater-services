import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Help.scss";
import { RiQuestionnaireLine } from "react-icons/ri";
import { useState } from "react";

export default function Help() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  const faqData = [
    {
      question: "What is your return policy?",
      answer:
        "Our return policy allows you to return items within 30 days of purchase. Please check our Returns and Exchanges page for more details.",
    },
    {
      question: "How do I track my order?",
      answer:
        'You can easily track your order by logging into your account on our website. Once logged in, go to the "Order History" section to view the status and tracking information.',
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping. Shipping rates and delivery times vary depending on the destination. Please refer to our Shipping page for more information.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping. Shipping rates and delivery times vary depending on the destination. Please refer to our Shipping page for more information.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Our return policy allows you to return items within 30 days of purchase. Please check our Returns and Exchanges page for more details.",
    },
  ];

  return (
    <>
      <Navbar />
      <section className="faq-body">
        <div className="faq-container">
          <div className="faq-text">
            <RiQuestionnaireLine className="question-chat" />
            <h1>Frequently Asked Questions</h1>
          </div>
          <div className="faq-content">
            <div className="accordion-container">
              {faqData.map((item, index) => (
                <div className="accordion-item" key={index}>
                  <div
                    className="accordion-header"
                    onClick={() => handleAccordionClick(index)}
                  >
                    {item.question}
                  </div>
                  <div
                    className={`accordion-content ${
                      activeAccordion === index ? "active" : ""
                    }`}
                  >
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
