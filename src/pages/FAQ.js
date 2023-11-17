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
      question: "Q: What is Ate Gang's Catering Services?",
      answer:
        "Ate Gang's Catering Services is a local business in the Panabo area that offers catering services to its clients.",
  },
    {
      question: "Q: How can I place an order with Ate Gang's Catering Services?",
      answer:
        "A: You can place an order with Ate Gang's Catering Services by using the online ordering ",
    },
    {
      question: "Q: How does the online food ordering method work?",
      answer:
        'Customers can order food online and have it delivered to their location.',
    },
    {
      question: "Q: Can I customize my order?",
      answer:
        "Yes, you can customize your order by selecting the dishes you want from the menu ",
    },
    {
      question: "Q: How do I pay for my order?",
      answer:
        "You can pay for your order online by Cash on Delivery or Gcash Online Payment Services.",
    },
    {
      question: "Q: How does Ate Gang's Catering Services ensure the quality and safety of its food?",
      answer:
        "A: Ate Gang's Catering Services follows strict food safety guidelines and uses high-quality ingredients to ensure the quality and safety of its food.",
    },
    {
      question: "Q: What is the delivery time for my order?",
      answer:
        "A: Delivery times vary depending on your location and the volume of orders. ",
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
