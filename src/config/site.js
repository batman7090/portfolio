export const site = {
  name: 'K Shamanth Kumar',
  initials: 'SK',
  role: 'AI & ML Engineer',
  // Rotates in the hero. Add or remove freely.
  roles: ['AI Engineer', 'LLM Systems', 'RAG Pipelines', 'MLOps', 'Machine Learning', 'Deep Learning'],
  email: 'kshamanth49@gmail.com',
  resume: '/resume.pdf',
  available: true,
  availableNote: 'Open to AI/ML engineering roles, freelance builds and research collaborations.',
  intro:
    'I build systems that reason over your data  retrieval pipelines, fine-tuned language models, and multi-agent workflows that survive contact with production.',
  // One-line teaser shown in the About preview on the home page.
  aboutTeaser:
    'A self-driven engineer who fell for the moment a model stops guessing and starts reasoning  and has been chasing that feeling into production ever since.',
  socials: [
    { label: 'GitHub', url: 'https://github.com/batman7090' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/k-shamanth-kumar-524194206/' },
    { label: 'Medium', url: 'https://medium.com/@kshamanth97' },
  ],
}

export const nav = [
  { label: 'About', to: '/about' },
  { label: 'Work', to: '/projects' },
  { label: 'Writing', to: '/blog' },
  { label: 'Learning', to: '/courses' },
  { label: 'Contact', to: '/contact' },
]


export const about = {
  photo: '/images/shamanth.png',
  photoAlt: 'K Shamanth Kumar',

  lede: "I'm Shamanth a mechanical engineer who followed the maths all the way into AI. Today I build LLM-driven systems as a Concept Development Engineer, but the throughline has never changed. I care less about models that dazzle in a notebook and more about systems that hold up when the real world touches them.",

  story: [
    {
      heading: 'From Indian classrooms to a curiosity that would not sit still',
      text: 'I grew up in India, through school, and went on to a bachelors in Mechanical Engineering  but even then I gravitated toward the parts where machines met intelligence, specialising in machine learning for mechanical systems. That was the first crack in the door, the realisation that the systems I found most interesting were the ones that could learn.',
    },
    {
      heading: 'Chasing the maths of AI  and a plane ticket to Germany',
      text: "The more I dug into AI, the more I wanted to understand it from the ground up, not just use it. So I went back to the foundations  the mathematics underneath the models. That pull led me to Germany, a country I admired for its engineering and its appetite for innovation. I landed a dual-degree in International Mechatronics across LUH Hannover and SPbPU in Russia, specialising in Mathematics, Electronics and AI  exactly the intersection I'd been circling for years.",
    },
    {
      heading: 'A software job, and an AI drive that refused to stay quiet',
      text: "I started as a working student at IAV, writing software as a developer. Good work  but the AI itch never left. It shaped my thesis on pedestrian intention prediction at IAV, in collaboration with LUH, and that project turned into a full-time role as a Concept Development Engineer. I'd found a way to make the thing I was most curious about the thing I got paid to do.",
    },
    {
      heading: 'Research, then real products',
      text: 'My AI drive kept pushing. I worked across research projects  fine-tuning diffusion models to generate realistic synthetic data for augmentation, and automating the SIL functionality-test pipeline end to end, from test cases through TPT testing to results landing in the database. Less glamorous than a demo, but this is where I learned what "production" actually asks of you.',
    },
    {
      heading: 'Building at the frontier, as Concept Development Engineer',
      text: "For the last two years I've led development of two products at IAV as Concept Development Engineer for Concept Development  both built on LLM multi-agent workflows. One turns natural language into full vehicle-scenario simulations in dSPACE / CarMaker. The other takes natural language all the way to driver-monitoring simulation in Unreal Engine. Taking an idea from a sentence to a running simulation is, it turns out, exactly the kind of end-to-end problem I've been chasing since those first mechanical-systems classes.",
    },
    {
      heading: 'How I work',
      text: 'I learn by building and I build to ship. In a field that reinvents itself every few months, continuous learning is not a hobby  it is the job. I would rather have a system running end to end, with evaluation and a story about what broke first, than a clever demo that only works on my machine. Most of what I know came from getting something wrong, understanding why, and writing it down.',
    },
  ],

  facts: [
    { label: 'From', value: 'India  based in Germany' },
    { label: 'Role', value: 'Concept Development · IAV' },
    { label: 'Focus', value: 'LLM multi-agent systems, ML, applied maths' },
    { label: 'Open to', value: 'AI/ML roles & collaborations' },
  ],

  interests: [
    'The mathematics behind AI  where it all clicks',
    'Badminton, volleyball and running',
    'Fitness and staying sharp off the screen',
    'Writing on Medium to teach what I learn',
    'Reading about how AI systems actually fail',
    'Continuous learning in a fast-moving world',
  ],

  goal: "Long-term, I want to build AI systems that people genuinely trust  useful, honest about their limits, and solid enough to live in production. From mechanical systems to multi-agent LLM workflows, the mission has stayed the same take an idea from a research paper all the way to something real people rely on every day.",
}