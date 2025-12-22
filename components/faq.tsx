"use client";

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const faqs = [
    {
      question: "Is the Web3 Talents program fully online?",
      answer: "Yes, the program is conducted 100% online. This ensures that students and professionals can participate from anywhere in the world."
    },
    {
      question: "Do I need a background in Informatics or Finance?",
      answer: "No. We explicitly welcome talents from all disciplines. Diverse perspectives are essential for building a human-centered digital future."
    },
    {
      question: "What is the duration of the program?",
      answer: "The journey runs for 20 weeks, from January 28 to June 17, 2026."
    }
  ];

  return (
      <section id="faq" className="py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
            Frequently Asked Questions
          </h2>

          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
                <Accordion.Item
                    key={index}
                    value={`item-${index}`}
                    className="border border-border rounded-lg bg-card/50 overflow-hidden"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left font-semibold hover:bg-accent/5 transition-all group">
                      {faq.question}
                      <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>

                  <Accordion.Content className="px-6 pb-6 text-muted-foreground data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    {faq.answer}
                  </Accordion.Content>
                </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>
  );
}