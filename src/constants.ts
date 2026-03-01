import { Project, Experience, Education } from './types';

export const EXPERIENCES: Experience[] = [
  {
    company: "Vision Technology Consulting (a VETECE Company)",
    role: "Cloud Consultant",
    period: "OCT 2025 - NOW",
    description: [
      "Designed and implemented CI/CD pipeline for Oracle APEX applications and database deployments.",
      "Integrated GitHub with CI/CD pipeline for version control and traceability.",
      "Implemented Jenkins pipelines to automate deployment scripts.",
      "Applied automated database testing using utPLSQL.",
      "Deployed containerized applications using Docker and Kubernetes on OCI.",
      "Assisted in cloud architecture design and deployment for internal OCI projects."
    ]
  },
  {
    company: "Vision Technology Consulting (a VETECE Company)",
    role: "Cloud Intern",
    period: "FEB - AUG 2025",
    description: [
      "Developed a personalised conversational chatbot using OCI Generative AI services.",
      "Built and experimented OCI Generative AI Agent with RAG concepts through Langflow.",
      "Implemented serverless automation using OCI Functions for lightweight backend tasks.",
      "Built automation scripts for monitoring cloud metrics and system behavior."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Anti-Vaping Serious Game",
    description: "A Flutter-based mobile serious game with structured navigation and state management to support interactive storytelling. Integrated Firebase Authentication for user management.",
    tags: ["Flutter", "Firebase", "Dart", "Mobile Dev"]
  },
  {
    title: "USA House Price Prediction Model",
    description: "Built and evaluated a house price prediction pipeline using Random Forest, XGBoost, and Gradient Boosting. Deployed a Streamlit-based web application.",
    tags: ["Python", "Machine Learning", "Streamlit", "Data Science"]
  },
  {
    title: "Travel Blog Web",
    description: "Designed and developed a responsive web application using HTML, CSS, JavaScript, and React with reusable UI components and client-side routing.",
    tags: ["React", "JavaScript", "Tailwind CSS", "Web Dev"]
  },
  {
    title: "Carpool Mobile Application",
    description: "Developed a Java-based mobile application integrated with Firebase Authentication for real-time data handling for ride creation and matching.",
    tags: ["Java", "Firebase", "Android", "Mobile Dev"]
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "UNIVERSITY MALAYA",
    degree: "Bachelor of Computer Science (Information System)",
    period: "2021-2025",
    details: "CGPA 3.88"
  },
  {
    institution: "SELANGOR MATRICULATION COLLEGE",
    degree: "Science Stream",
    period: "2020-2021",
    details: "CGPA 4.00"
  }
];

export const SKILLS = {
  languages: ["Python", "R", "Dart (Flutter)", "Java", "HTML", "CSS", "JavaScript", "SQL", "NoSQL", "Terraform"],
  ai: ["Generative AI", "RAG", "LLMs", "Langflow", "LangChain"],
  cloud: ["Oracle Cloud Infrastructure (OCI)", "Oracle APEX", "Docker", "Kubernetes", "Jenkins", "GitHub", "Power BI", "Firebase", "Streamlit", "Gradio"],
  certificates: [
    "OCI 2025 Certified Foundations Associate",
    "Oracle AI Vector Search Professional",
    "Oracle APEX Cloud Developer Certified Professional"
  ]
};
