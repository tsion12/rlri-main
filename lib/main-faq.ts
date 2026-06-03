/** Main institute FAQ content (reallifeinstitute.org). */
export type MainFaqItem = {
  id: string;
  question: string;
  answer: string;
  /** When set, replaces a segment in `answer` for rich links (see `answerLinkPhrase`). */
  answerLinkPhrase?: string;
  answerLinkHref?: string;
};

export const MAIN_FAQ_ITEMS: MainFaqItem[] = [
  {
    id: "what-is-rlri",
    question: "What is Real Life Research Institute?",
    answer:
      "Real Life Research Institute (RLRI) is a federally and territorially registered non-profit organization based in Iqaluit, Nunavut, Canada. We support community-based projects and research that aim to improve the well-being and daily lives of people both within our communities and beyond. Our work focuses on empowering individuals with diverse learning needs and those in underserved communities through our Literacies Program, which includes financial literacy, digital literacy, health and cultural literacy, and environmental literacy. In addition to these programs, we conduct humanitarian and development work in vulnerable communities in Canada and abroad. We rely on both our dedicated Canada-based staff to support our programs and a trusted network of local experts and partners who lead implementation efforts on the ground abroad.",
  },
  {
    id: "who-we-support",
    question: "Who does the Real Life Research Institute support?",
    answer:
      "Our work supports youth, particularly young adults under 40, as well as women and individuals with diverse learning needs, including those with limited access to formal education or training. We serve underserved and remote communities, with a strong focus on Nunavut, by delivering inclusive programs that build capacity in financial, digital, health and cultural, and environmental literacy. Internationally, we extend our support to vulnerable populations through humanitarian efforts, WASH (water, sanitation, and hygiene) programs, peacebuilding, and climate resilience initiatives.",
  },
  {
    id: "where-we-work",
    question: "How does Real Life decide where to work?",
    answer:
      "Real Life Research Institute determines where to work based on a combination of community-identified needs, research evidence, and strategic partnerships. We prioritize regions and populations where systemic barriers to opportunity persist and where our programs can create meaningful, sustainable impact. Whether locally in Nunavut or internationally, we respond to urgent challenges such as educational inequality, climate vulnerability, or humanitarian crises by working collaboratively with local stakeholders, organizations, and experts who understand the unique context of each community.",
  },
  {
    id: "contributions",
    question:
      "How are my contributions used in Real Life's development and charitable projects?",
    answer:
      "We are committed to transparency and accountability in how we use contributions. Donations directly support the delivery of our development and charitable programs, including literacy initiatives, scholarships, emergency relief, and community-based research. A significant portion goes toward implementing projects on the ground (both in Canada and abroad), while a modest share supports essential administrative and operational functions that ensure program quality, coordination, and impact. We regularly share updates, reports, and stories to show how your support is making a real difference.",
  },
  {
    id: "how-to-support",
    question: "How can I support Real Life's projects?",
    answer:
      "You can support Real Life's projects in many ways, including making financial donations, volunteering your time and skills, partnering with us as an organization, or participating in community events and campaigns. We welcome both one-time and recurring contributions, as well as in-kind donations such as equipment or services that help advance our programs. To explore partnership opportunities or offer support, please fill out the partnership form on our website or contact us directly at info@reallifeinstitute.org.",
    answerLinkPhrase: "info@reallifeinstitute.org",
    answerLinkHref: "mailto:info@reallifeinstitute.org",
  },
  {
    id: "track-impact",
    question: "How can I track the impact of my support or donation?",
    answer:
      "At Real Life Research Institute, we prioritize transparency and accountability. Donors and supporters can track the impact of their contributions through regular updates, annual reports, detailed project reports, success stories, and testimonials shared via our newsletter, website, and social media channels. We also provide impact summaries highlighting key outcomes and how your support is helping to transform lives in Canada and abroad.",
  },
  {
    id: "scholarship-fund",
    question: "Can I donate specifically to the scholarship or emergency relief fund?",
    answer:
      "Yes, you can choose to direct your donation specifically to our scholarship fund or emergency fund. When donating through our website, please specify your preferred fund to ensure your contribution supports the cause that matters most to you.",
  },
  {
    id: "fund-beneficiaries",
    question: "Who benefits from Real Life's scholarships and emergency relief fund?",
    answer:
      "Real Life's scholarships and emergency relief fund primarily benefit individuals from underserved communities. We also support individuals and families in crisis, such as those affected by displacement, housing insecurity, and other emergencies, by providing timely assistance to help them regain stability and continue their personal or academic journey.",
  },
  {
    id: "safeguarding",
    question: "What are Real Life Research Institute's safeguarding principles?",
    answer:
      'Real Life Research Institute is committed to upholding the highest standards of safeguarding to ensure the safety, dignity, and well-being of all individuals involved in our programs, especially children, youth, women, and vulnerable community members. Our safeguarding principles include zero tolerance for abuse and exploitation. All staff, volunteers, and partners are expected to adhere to our safeguarding policy and code of conduct. For more information, please see the "Policies" section on our website to access our full safeguarding policy and related documents.',
    answerLinkPhrase: '"Policies" section',
    answerLinkHref: "/aboutus#institute-policies",
  },
  {
    id: "opportunities",
    question:
      "What internship, volunteer, or career opportunities are available at Real Life?",
    answer:
      "Real Life Research Institute offers a range of internships, volunteer, and career opportunities for individuals passionate about community development, research, and social impact. We welcome applicants from diverse backgrounds, including students, recent graduates, and early-career professionals seeking meaningful experience. Current opportunities are posted on our website.",
    answerLinkPhrase: "posted on our website",
    answerLinkHref: "/volunteer",
  },
  {
    id: "arctic-research",
    question: "What kind of research does Real Life conduct in the Arctic?",
    answer:
      "Real Life Research Institute conducts interdisciplinary research on the evolving dynamics of the Arctic, with a focus on climate change, security, and governance. A core priority of our work is amplifying the voices, rights, and knowledge systems of Indigenous communities, whose lived experiences are vital to understanding environmental change and informing sustainable, inclusive policy solutions. Our team investigates how rising temperatures and melting ice are affecting ecosystems, maritime routes, and global climate systems. We also analyze the geopolitical interests and power dynamics in the region, including how stakeholders compete and collaborate over Arctic resources, territory, and influence.",
  },
  {
    id: "indigenous-knowledge",
    question: "How does Real Life approach Indigenous knowledge and decolonization?",
    answer:
      "Real Life Research Institute centers Indigenous knowledge, leadership, and lived experience across all aspects of our work. We engage in decolonial research and programming that prioritizes Indigenous languages, practices, worldviews, and community-defined goals.",
  },
  {
    id: "humanitarian",
    question: "What is Real Life's role in humanitarian research and response?",
    answer:
      "Real Life Research Institute plays an active role in humanitarian research and response by conducting community-centered, evidence-based research that informs effective interventions in crisis-affected regions. We collaborate closely with local partners and experts to design and implement programs addressing climate change, displacement, food security, health, water, sanitation, and hygiene. Our approach prioritizes the rights, dignity, and participation of affected populations to ensure sustainable and culturally appropriate solutions.",
  },
];
