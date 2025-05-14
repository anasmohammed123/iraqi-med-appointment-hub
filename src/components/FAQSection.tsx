
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export const FAQSection = ({ faqs }: FAQSectionProps) => {
  // تقسيم الأسئلة إلى عمودين
  const midpoint = Math.ceil(faqs.length / 2);
  const leftColumnFaqs = faqs.slice(0, midpoint);
  const rightColumnFaqs = faqs.slice(midpoint);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">الأسئلة الشائعة</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا وكيفية استخدامها
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div>
            <Accordion type="single" collapsible className="w-full">
              {leftColumnFaqs.map((faq, index) => (
                <AccordionItem key={`left-${index}`} value={`left-item-${index}`}>
                  <AccordionTrigger className="text-right font-medium text-gray-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              {rightColumnFaqs.map((faq, index) => (
                <AccordionItem key={`right-${index}`} value={`right-item-${index}`}>
                  <AccordionTrigger className="text-right font-medium text-gray-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
