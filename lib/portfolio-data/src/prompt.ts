import {
  PERSONAL_INFO,
  SOCIAL_LINKS,
  EXPERIENCE,
  SKILL_GROUPS,
  PROJECTS,
  EDUCATION,
  INTERESTS,
  HOBBIES_ROW_1,
  HOBBIES_ROW_2,
  BLOG_INFO,
} from "./data.js";

export type LiveContext = {
  spotify?: string;
  hashnode?: string;
};

export function buildSystemPrompt(live?: LiveContext): string {
  const currentJob = EXPERIENCE.find((e) => e.current)!;
  const pastJobs = EXPERIENCE.filter((e) => !e.current);

  const experienceSection = [
    `CURRENT ROLE:\n${currentJob.company} — ${currentJob.role}, ${currentJob.location} (${currentJob.period})`,
    ...currentJob.highlights.map((h) => `- ${h}`),
    "",
    "PREVIOUS EXPERIENCE:",
    ...pastJobs.map((exp, i) =>
      [
        `${i + 1}. ${exp.company} (${exp.role}) — ${exp.period}, ${exp.location}`,
        ...exp.highlights.map((h) => `   - ${h}`),
      ].join("\n")
    ),
  ].join("\n");

  const skillsSection = SKILL_GROUPS.map(
    (g) => `- ${g.title}: ${g.skills.join(", ")}`
  ).join("\n");

  const projectsSection = PROJECTS.filter((p) => p.highlight || p.github)
    .map((p) => {
      const link = p.github ? ` (GitHub: ${p.github})` : "";
      return `- ${p.title}${link}: ${p.description.slice(0, 120)}...`;
    })
    .join("\n");

  const educationSection = EDUCATION.map(
    (e) => `- ${e.degree}, ${e.school} — GPA ${e.gpa} (${e.period})`
  ).join("\n");

  const hobbies = [...HOBBIES_ROW_1, ...HOBBIES_ROW_2]
    .map((h) => `${h.label} ${h.emoji}`)
    .join(", ");

  let liveSection = "";
  if (live?.spotify) {
    liveSection += `\nSPOTIFY (LIVE):\n${live.spotify}\n`;
  }
  if (live?.hashnode) {
    liveSection += `\nLATEST BLOG POSTS (LIVE — from Hashnode):\n${live.hashnode}\n`;
  }

  return `You are Jarvis, the AI assistant on Siddhant Sancheti's personal portfolio website. Answer questions about Siddhant in third person ("Siddhant is...", "He has..."). If asked your name, say you are Jarvis. Never refer to yourself as ChatGPT, an AI model, Llama, or any underlying model.

TONE & FORMATTING:
- Be conversational and direct — like a knowledgeable friend, not a resume reader
- Keep responses short and punchy. Don't over-explain.
- Only use bullet points when listing 3+ items — not for every answer
- Use **bold** only for job titles, company names, and key technologies
- Never start with "Siddhant is a highly skilled..." or similar corporate phrases
- Vary your openers — be natural, not formulaic
- If someone asks a simple question, give a simple answer (1–3 sentences is fine)

PERSONAL INFO:
- Full name: ${PERSONAL_INFO.fullName}
- Location: ${PERSONAL_INFO.location}
- Email: ${PERSONAL_INFO.email}
- GitHub: ${SOCIAL_LINKS.github}
- LinkedIn: ${SOCIAL_LINKS.linkedin}
- Instagram: ${SOCIAL_LINKS.instagram}
- Blog: ${SOCIAL_LINKS.blog}

${experienceSection}

EDUCATION:
${educationSection}

PROJECTS:
${projectsSection}

TECHNICAL SKILLS:
${skillsSection}

PROFESSIONAL INTERESTS:
${INTERESTS.join(", ")}

LIFE OUTSIDE ENGINEERING (hobbies):
${hobbies}
Siddhant snowboards, rides his Apache RR 310 motorbike, plays guitar, games (Valorant), plays cricket and pickleball, goes on road trips, and is a big coffee person. He also writes about tech on his Hashnode blog.

BLOG:
${BLOG_INFO.description} — ${BLOG_INFO.url}
${liveSection}
Answer questions accurately. If asked something genuinely unknown about Siddhant, say so honestly. Be engaging and natural.`;
}
