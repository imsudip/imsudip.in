import { about } from './About';
import { experiences } from './Experience';
import { heroConfig, socialLinks } from './Hero';
import { projects } from './Projects';

export const chatLanguages = [
  { code: 'english', label: 'English', nativeLabel: 'English' },
  { code: 'hindi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { code: 'bengali', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'tamil', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'telugu', label: 'Telugu', nativeLabel: 'తెలుగు' },
] as const;

function generateSystemPrompt(language: string = 'english'): string {
  const skillNames = heroConfig.skills.map((skill) => skill.name).join(', ');
  const socialLinksText = socialLinks
    .map((link) => `${link.name}: ${link.href}`)
    .join('\n- ');
  const experienceText = experiences
    .map(
      (exp) =>
        `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})`,
    )
    .join('\n- ');
  const projectsText = projects
    .map(
      (project) =>
        `${project.title}: ${project.description}${project.live ? ` - ${project.live}` : ''}`,
    )
    .join('\n- ');

  const lang = chatLanguages.find((l) => l.code === language);
  const languageInstruction =
    lang && language !== 'english'
      ? `\n- Respond in ${lang.label} (${lang.nativeLabel}). Regardless of the language the user writes in, always respond in ${lang.label}. Keep the same concise, helpful tone.`
      : '';

  return `You are ${about.name}'s Portfolio Assistant representing ${about.name}.

ABOUT: ${about.description}

SKILLS: ${skillNames}

EXPERIENCE:
- ${experienceText}

PROJECTS:
- ${projectsText}

SOCIAL LINKS:
- ${socialLinksText}

RESPONSE RULES:
- Keep responses under 100 words
- Use markdown formatting for better readability
- Make all links clickable using markdown link syntax [text](url)
- Use **bold** for emphasis when needed
- Use bullet points (-) for lists when appropriate
- Be conversational and helpful
- Focus on Sudip's expertise and projects
- For work inquiries, direct to email: [sudipghosh9333@gmail.com](mailto:sudipghosh9333@gmail.com) or LinkedIn: [LinkedIn](https://www.linkedin.com/in/imsudip)
- Answer questions about technical skills, experience, and projects
- If unsure about details, suggest visiting the portfolio sections
- You are not a bot, you are a human. you are ${about.name}. you talk in first person.
- Refer ${about.name} as "Me" or "I"${languageInstruction}
- DO NOT USE REASONING.

Your goal: Help visitors learn about your work in a friendly, concise way.`;
}

export { generateSystemPrompt };

export const chatSuggestions: Record<string, string[]> = {
  english: [
    'What technologies do you work with?',
    'Tell me about your recent projects',
    'How can I contact you for work?',
    "What's your development experience?",
    'Are you available for freelance work?',
    'Show me your best work',
  ],
  hindi: [
    'आप किन तकनीकों पर काम करते हैं?',
    'अपने हाल के प्रोजेक्ट्स के बारे में बताएं',
    'काम के लिए मैं आपसे कैसे संपर्क करूं?',
    'आपका डेवलपमेंट अनुभव क्या है?',
    'क्या आप फ्रीलांस काम के लिए उपलब्ध हैं?',
    'मुझे अपना सर्वश्रेष्ठ काम दिखाएं',
  ],
  bengali: [
    'আপনি কোন টেকনোলজিতে কাজ করেন?',
    'আপনার সাম্প্রতিক প্রজেক্টগুলি সম্পর্কে বলুন',
    'কাজের জন্য আমি কীভাবে যোগাযোগ করতে পারি?',
    'আপনার ডেভেলপমেন্ট অভিজ্ঞতা কী?',
    'আপনি কি ফ্রিল্যান্স কাজের জন্য উপলব্ধ?',
    'আপনার সেরা কাজগুলি দেখান',
  ],
  tamil: [
    'நீங்கள் எந்த தொழில்நுட்பங்களில் வேலை செய்கிறீர்கள்?',
    'உங்கள் சமீபத்திய திட்டங்களைப் பற்றி சொல்லுங்கள்',
    'வேலைக்கு நான் எப்படி தொடர்பு கொள்ளலாம்?',
    'உங்கள் டெவலப்மென்ட் அனுபவம் என்ன?',
    'நீங்கள் ஃப்ரீலான்ஸ் வேலைக்கு கிடைக்கிறீர்களா?',
    'உங்கள் சிறந்த படைப்புகளைக் காட்டுங்கள்',
  ],
  telugu: [
    'మీరు ఏ టెక్నాలజీలపై పని చేస్తారు?',
    'మీ ఇటీవలి ప్రాజెక్ట్‌ల గురించి చెప్పండి',
    'పని కోసం నేను మీతో ఎలా సంప్రదించగలను?',
    'మీ డెవలప్‌మెంట్ అనుభవం ఏమిటి?',
    'మీరు ఫ్రీలాన్స్ పనికి అందుబాటులో ఉన్నారా?',
    'మీ ఉత్తమ పనిని చూపండి',
  ],
};
