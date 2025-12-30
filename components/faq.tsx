"use client";

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const faqs = [
    {
      question: "Is the program fully online?",
      answer: "Yes, the program is conducted 100% online. This ensures that students and professionals can participate from anywhere in the world."
    },
    {
      question: "What do I need to put in my application?",
      answer: "There is nothing specific we are looking for in terms of prior technical knowledge. We welcome people from all disciplines (tech, business, law, etc.). We just want to learn about who you are!"
    },
    {
      question: "Is the program free?",
      answer: "Yes, the program is completely free"
    },
    {
      question: "How time consuming is this program?",
      answer: "The program is designed to be part-time and compatible with full-time studies or a job. You should expect to commit approximately 5 to 7 hours per week to attend sessions and complete the self-study materials."
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