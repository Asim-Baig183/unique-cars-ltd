export const DEALERSHIP_KNOWLEDGE_BASE = {
  dealershipName: "Unique Cars Ltd",
  websiteUrl: "https://uniquecarsltd.ca",
  email: "sales@uniquecars.ca",
  services: [
    "Pre-owned Vehicle Sales",
    "Car Financing & Credit Approval",
    "Trade-in Valuation",
    "Vehicle Rentals",
    "Warranty & Certification Programs",
  ],
  pages: {
    inventory: "https://uniquecarsltd.ca/inventory",
    financing: "https://uniquecarsltd.ca/CreditApplication",
    tradeIn: "https://uniquecarsltd.ca/AppraiseTrade",
    contactUs: "https://uniquecarsltd.ca/ContactUs",
    aboutUs: "https://uniquecarsltd.ca/AboutUs",
  },
  faqs: [
    {
      question: "What documents are required for financing?",
      answer: "Govt-issued ID, proof of income (pay stubs or bank statements), and proof of address."
    },
    {
      question: "Do you accept trade-ins?",
      answer: "Yes! Get an estimated trade-in value at https://uniquecarsltd.ca/AppraiseTrade"
    },
    {
      question: "Are all vehicles inspected?",
      answer: "Yes, all our vehicles undergo safety inspections and come with vehicle history options."
    }
  ]
};

export const getKnowledgeBaseContext = (): string => {
  return `
=== DEALERSHIP INFORMATION ===
Name: ${DEALERSHIP_KNOWLEDGE_BASE.dealershipName}
Website: ${DEALERSHIP_KNOWLEDGE_BASE.websiteUrl}
Sales Email: ${DEALERSHIP_KNOWLEDGE_BASE.email}
Services: ${DEALERSHIP_KNOWLEDGE_BASE.services.join(", ")}

Quick Links:
- Inventory: ${DEALERSHIP_KNOWLEDGE_BASE.pages.inventory}
- Financing: ${DEALERSHIP_KNOWLEDGE_BASE.pages.financing}
- Trade-In: ${DEALERSHIP_KNOWLEDGE_BASE.pages.tradeIn}
- Contact Us: ${DEALERSHIP_KNOWLEDGE_BASE.pages.contactUs}
  `.trim();
};
