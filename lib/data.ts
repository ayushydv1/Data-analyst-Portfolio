export const site = {
  name: "Md Asif Ansari",
  shortName: "Asif",
  initials: "MA",
  title: "Data Analyst / Power BI Developer",
  location: "Delhi",
  phone: "9304593902",
  phoneHref: "tel:+919304593902",
  email: "aansari430@gmail.com",
  linkedinHref: "https://www.linkedin.com/in/Asif_Ansari",
  linkedinLabel: "Asif_Ansari",
  resumeHref: "/resume.pdf",
  yearsExperience: 4,
  summary:
    "I am an experienced Data Analyst / Power BI Developer with over 4 years of professional experience in Data Analytics & Business Intelligence. I have hands-on experience on Power BI, DAX, SQL, Power Query, Data Modeling, ETL, Data Cleaning, Excel, and Python with strong expertise in Dashboard Development, Reporting, Data Visualization & KPI development.",
  about:
    "A detail-oriented and analytical professional with strong problem solving skills, experienced in understanding business requirements, transforming data, developing DAX calculations and building interactive dashboards to deliver clear, actionable business insights.",
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
] as const;

export const stats = [
  { value: 4, suffix: "+", label: "Years in analytics & BI" },
  { value: 70, suffix: "+", label: "DAX measures shipped" },
  { value: 30, suffix: "%", label: "Less manual reporting" },
  { value: 20, suffix: "%", label: "Fewer data issues" },
] as const;

export const skills = [
  {
    title: "BI & Data Visualization",
    items: [
      "Power BI",
      "Power BI Service",
      "Power Query",
      "Data Visualization",
      "Dashboard Development",
      "KPI Reporting",
    ],
  },
  {
    title: "Data Analytics",
    items: [
      "Data Cleaning",
      "Data Transformation",
      "RLS",
      "Star Schema",
      "Data Modeling",
      "Data Validation",
      "Business Intelligence",
    ],
  },
  {
    title: "Tools & Technologies",
    items: [
      "Power BI Desktop",
      "Power BI Service",
      "M-Query",
      "SQL",
      "Excel",
      "ETL",
      "Cloud AI",
      "Python",
    ],
  },
  {
    title: "AI & Productivity Tools",
    items: [
      "ChatGPT",
      "Microsoft Copilot",
      "Cloud AI",
      "Prompt Engineering",
    ],
  },
] as const;

export const experience = [
  {
    company: "Newgen Software Technology",
    role: "Data Analyst",
    period: "Dec 2023 – Present",
    start: "2023",
    bullets: [
      "Developed and maintained interactive Power BI dashboards, including Learning & Development and Campus Hiring Dashboards, to track business KPIs and performance.",
      "Used SQL, Power Query and Power BI to extract, clean, transform and validate data from multiple business sources, preparing reliable datasets for dashboard development.",
      "Created 70+ advanced DAX measures for KPIs, business calculations, percentages and time-based analysis, reducing manual reporting effort by 30% across HR & L&D operations.",
      "Designed and maintained Power BI data models, including relationships, calendar tables and lookup tables to ensure accurate data integration.",
      "Translated business requirements into clear, actionable dashboards using interactive filters, KPI cards, charts, slicers and drill-through reports.",
      "Performed data validation and reconciliation to ensure accuracy and consistency between source data and Power BI reports, and created reusable calculations and reporting logic.",
      "Worked with stakeholders to identify reporting requirements, resolved data issues by 20% and delivered business-focused analytical solutions.",
    ],
  },
  {
    company: "Kine.AI (Kinelabs Private Limited)",
    role: "Software Engineer, Data Applications",
    period: "Aug 2023 – Nov 2023",
    start: "2023",
    bullets: [
      "Built on an engineering intelligence platform that unifies software development data from Jira, GitHub and GitLab to track sprint progress, delivery performance and developer productivity.",
      "Used data insights to identify issues and improve the software development process.",
    ],
  },
  {
    company: "Cisco Systems (India)",
    role: "Software Development Engineer",
    period: "Aug 2021 – Aug 2022",
    start: "2021",
    bullets: [
      "Worked on the Config Separation POC project as part of the software development team, supporting technical and problem-solving activities under project guidance.",
      "Gained hands-on exposure to Java and Python through project work and structured technical training.",
    ],
  },
] as const;

export type ProjectImage = {
  src: string;
  alt: string;
  label: string;
};

export type Project = {
  id: string;
  title: string;
  year: string;
  summary: string;
  tags: readonly string[];
  details: readonly string[];
  images?: readonly ProjectImage[];
};

export const projects: Project[] = [
  {
    id: "covid-19",
    title: "COVID-19 Analytics Dashboard",
    year: "2024",
    summary:
      "A Power BI report covering COVID-19 overview, demographics, comorbidities, and administrative views — patient counts, care type, mortality trend, and population breakdowns.",
    tags: ["Power BI", "DAX", "Data Visualization"],
    details: [
      "Overview page with KPI cards, type of patient care, patient population over time, and a COVID-19 mortality trend.",
      "Demographics page with pregnancy status, gender distribution, and patient population by age group.",
      "Comorbidities page with condition filters and patient admissions over time.",
      "Administrative page with patient distribution by level, care type over time, and a final-classification breakdown.",
    ],
    images: [
      {
        src: "/projects/covid/overview.png",
        alt: "COVID-19 overview dashboard with care type, population over time, and mortality trend",
        label: "Overview",
      },
      {
        src: "/projects/covid/demographics.png",
        alt: "COVID-19 demographics dashboard with pregnancy status, gender, and age groups",
        label: "Demographics",
      },
      {
        src: "/projects/covid/comorbidities.png",
        alt: "COVID-19 comorbidities dashboard with condition filters and admissions over time",
        label: "Comorbidities",
      },
      {
        src: "/projects/covid/administrative.png",
        alt: "COVID-19 administrative dashboard with patient level and care-type views",
        label: "Administrative",
      },
    ],
  },
  {
    id: "world-of-peaches",
    title: "World of Peaches",
    year: "2026",
    summary:
      "Power BI World Championship 2026 dashboard by Asif Ansari — global peach production, trade, and a tabular country view with year and region filters.",
    tags: ["Power BI", "DAX", "Star Schema"],
    details: [
      "Overview of global production, export and import value, trade balance, a 14-year production trend, and regional share.",
      "Production page with top producer, volume, harvested area, yield, CAGR, and country production share.",
      "Trade page with export share by continent, trade flow, penetration, and top exporting countries.",
      "Tabular view of peach data by continent and country, with production, area, yield, trade, and share columns.",
    ],
    images: [
      {
        src: "/projects/peaches/overview.png",
        alt: "World of Peaches overview with production, trade KPIs, trend, and regional map",
        label: "Overview",
      },
      {
        src: "/projects/peaches/production.png",
        alt: "Who Grows production page with top producer, yield, and country share",
        label: "Production",
      },
      {
        src: "/projects/peaches/trade.png",
        alt: "Who Trades page with export share, trade flow, and top exporters",
        label: "Trade",
      },
      {
        src: "/projects/peaches/tabular.png",
        alt: "Tabular peach data by continent and country",
        label: "Tabular view",
      },
    ],
  },
  {
    id: "swiggy",
    title: "Swiggy Analytics Dashboard",
    year: "2024",
    summary:
      "A Power BI dashboard for restaurant operations — locations, ratings, pricing, cuisine mix, and a restaurant-level table.",
    tags: ["Power BI", "DAX", "KPI Reporting"],
    details: [
      "Overview with restaurant and location counts, average rating and price, pure-veg share, restaurants by location, cuisine mix, rating distribution, and price versus rating.",
      "Second page with cuisines, rated restaurants, offer availability, average price and rating by cuisine, and a top-rated restaurants table.",
    ],
    images: [
      {
        src: "/projects/swiggy/overview.png",
        alt: "Swiggy overview with restaurant KPIs, cuisine mix, and rating charts",
        label: "Overview",
      },
      {
        src: "/projects/swiggy/cuisines.png",
        alt: "Swiggy cuisine and restaurant table view",
        label: "Cuisines",
      },
    ],
  },
  {
    id: "smoking-health",
    title: "Smoking Health Risk Analysis",
    year: "2024",
    summary:
      "A Power BI dashboard that pairs smoking and health metrics with organ-level views — smoking status, duration, and cholesterol and hypertension risk by age group.",
    tags: ["Power BI", "Data Visualization", "KPI Reporting"],
    details: [
      "Patient counts with average age and BMI, smoking status split, daily intake over age groups, and cholesterol and hypertension risk by age.",
      "Pages switch between body and organ views (heart, lungs, liver, kidney), including healthy and damaged comparisons.",
    ],
    images: [
      {
        src: "/projects/smoking/body.png",
        alt: "Smoking health risk dashboard with full-body anatomy view",
        label: "Body",
      },
      {
        src: "/projects/smoking/heart-healthy.png",
        alt: "Smoking health risk dashboard with healthy heart view",
        label: "Heart — healthy",
      },
      {
        src: "/projects/smoking/heart-damaged.png",
        alt: "Smoking health risk dashboard with damaged heart view",
        label: "Heart — damaged",
      },
      {
        src: "/projects/smoking/lungs-healthy.png",
        alt: "Smoking health risk dashboard with healthy lungs view",
        label: "Lungs — healthy",
      },
      {
        src: "/projects/smoking/lungs-damaged.png",
        alt: "Smoking health risk dashboard with damaged lungs view",
        label: "Lungs — damaged",
      },
      {
        src: "/projects/smoking/liver-healthy.png",
        alt: "Smoking health risk dashboard with healthy liver view",
        label: "Liver — healthy",
      },
      {
        src: "/projects/smoking/liver-damaged.png",
        alt: "Smoking health risk dashboard with damaged liver view",
        label: "Liver — damaged",
      },
      {
        src: "/projects/smoking/kidney.png",
        alt: "Smoking health risk dashboard with kidney view",
        label: "Kidney",
      },
      {
        src: "/projects/smoking/body-smoking.png",
        alt: "Smoking health risk dashboard with smoking anatomy view",
        label: "Body — smoking",
      },
    ],
  },
];

export const achievements = [
  {
    title: "HR & L&D dashboards",
    body: "Recognized for delivering high-quality interactive dashboards supporting the HR and L&D teams.",
  },
  {
    title: "Brand Signature Award",
    body: "Awarded the Brand Signature Award for creatively naming the product “PRISM” and its tagline.",
  },
  {
    title: "Newgen Premier League",
    body: "Won the Newgen Premier League Cricket as Captain, showcasing leadership and teamwork.",
  },
] as const;

export const education = {
  degree: "Bachelor of Engineering",
  school: "RGPV University",
  location: "Bhopal",
  year: "2020",
} as const;

export const certifications = [
  {
    name: "Master in Power BI Desktop and Service",
    issuer: "Udemy",
  },
  {
    name: "SQL Data Analysis",
    issuer: "Udemy",
  },
  {
    name: "Python for Data Analysis Full Bootcamp",
    issuer: "Udemy",
  },
] as const;

export const marqueeTools = [
  "Power BI",
  "DAX",
  "SQL",
  "Power Query",
  "Python",
  "Excel",
  "ETL",
  "Data Modeling",
  "Star Schema",
  "KPI Reporting",
  "M-Query",
  "RLS",
] as const;
