const DESTINY_NUMBER_MEANINGS = {
  1: {
    destinyNumber: 1,
    lifeDirection: "Traditional interpretation frames this path around developing initiative and contributing through original direction.",
    naturalAbilities: ["Starting new efforts", "Independent judgment", "Clear self-expression"],
    opportunities: ["Taking ownership of a meaningful project", "Developing confident but collaborative leadership"],
    careerDevelopment: "Progress may come through roles with responsibility and room to innovate. Long-term success benefits from mentorship, listening, and shared credit.",
    relationships: "A life direction centered on independence works best alongside mutual respect, compromise, and genuine interest in a partner's aims.",
    challenges: ["Avoiding ego-driven decisions", "Accepting feedback", "Maintaining patience with collaboration"],
    personalGrowth: ["Practice leadership that develops others", "Separate confidence from the need to be right"],
    longTermDevelopment: "Build a body of work that reflects personal initiative while creating space for other people to contribute and lead."
  },
  2: {
    destinyNumber: 2,
    lifeDirection: "Traditional interpretation frames this path around cooperation, emotional intelligence, and building meaningful partnerships.",
    naturalAbilities: ["Listening and mediation", "Reading group dynamics", "Supporting shared goals"],
    opportunities: ["Creating trust across differences", "Developing partnership-based work or service"],
    careerDevelopment: "Growth may come through collaborative, coordinating, or people-centered roles. Clear boundaries and confidence in decisions help contributions remain visible.",
    relationships: "Partnership can be a major source of growth, provided closeness is balanced with personal identity and direct communication.",
    challenges: ["Avoiding emotional dependency", "Speaking up during disagreement", "Making decisions without excessive reassurance"],
    personalGrowth: ["Practice independent choices", "Treat boundaries as part of care"],
    longTermDevelopment: "Develop steady, reciprocal relationships while retaining the ability to act from personal values."
  },
  3: {
    destinyNumber: 3,
    lifeDirection: "Traditional interpretation frames this path around learning, creative expression, and making ideas understandable to others.",
    naturalAbilities: ["Communication and storytelling", "Creative synthesis", "Curiosity across subjects"],
    opportunities: ["Teaching or sharing expertise", "Producing creative work with a practical audience"],
    careerDevelopment: "Progress may follow communication, education, media, or creative work. Focus, craft, and completion turn talent into durable contribution.",
    relationships: "Shared conversation and play can be important; listening and consistent follow-through give expression deeper trust.",
    challenges: ["Maintaining focus", "Avoiding overcommitment", "Finishing long projects"],
    personalGrowth: ["Develop a regular creative practice", "Use milestones to sustain learning"],
    longTermDevelopment: "Refine a broad curiosity into a smaller number of meaningful skills and share them generously."
  },
  4: {
    destinyNumber: 4,
    lifeDirection: "Traditional interpretation frames this path around building dependable systems and contributing through practical, sustained effort.",
    naturalAbilities: ["Planning and sequencing", "Detailed execution", "Maintaining dependable standards"],
    opportunities: ["Creating processes that help others", "Developing expertise through consistent practice"],
    careerDevelopment: "Long-term progress may come through operations, engineering, administration, or craft. Adaptability prevents a useful system from becoming an end in itself.",
    relationships: "Reliability can be a strength; flexibility and emotional expression help relationships remain responsive.",
    challenges: ["Avoiding rigidity", "Delegating responsibility", "Allowing change without losing stability"],
    personalGrowth: ["Review routines regularly", "Balance planning with experimentation"],
    longTermDevelopment: "Build structures that are both durable and humane, with enough flexibility to change as needs evolve."
  },
  5: {
    destinyNumber: 5,
    lifeDirection: "Traditional interpretation frames this path around balancing change, communication, and adaptability with a stable center.",
    naturalAbilities: ["Learning new environments", "Connecting perspectives", "Communicating across groups"],
    opportunities: ["Working across disciplines", "Using adaptability to solve changing problems"],
    careerDevelopment: "Varied communication, analysis, consulting, or mediation work may offer growth. A few stable priorities help preserve depth and completion.",
    relationships: "Freedom and lively exchange can matter; dependability in shared agreements makes variety feel secure.",
    challenges: ["Avoiding inconsistency", "Choosing among too many options", "Balancing analysis with emotional awareness"],
    personalGrowth: ["Create routines that support flexibility", "Make decisions using clear criteria"],
    longTermDevelopment: "Integrate varied experience into a coherent direction instead of continually restarting."
  },
  6: {
    destinyNumber: 6,
    lifeDirection: "Traditional interpretation frames this path around care, responsibility, and contributing to environments where people can thrive.",
    naturalAbilities: ["Recognizing practical needs", "Creating welcoming spaces", "Sustaining close relationships"],
    opportunities: ["Service, education, design, or community contribution", "Building healthy traditions and shared support"],
    careerDevelopment: "Meaningful progress may involve service or improving people's daily environments. Boundaries, compensation, and shared workloads keep contribution sustainable.",
    relationships: "Care and commitment can support lasting bonds when responsibility and emotional labor are shared openly.",
    challenges: ["Avoiding overgiving", "Managing perfectionism", "Respecting other people's autonomy"],
    personalGrowth: ["Practice receiving support", "Protect personal ambitions alongside family responsibilities"],
    longTermDevelopment: "Create a sustainable form of service that includes self-respect, mutual care, and room for individual growth."
  },
  7: {
    destinyNumber: 7,
    lifeDirection: "Traditional interpretation frames this path around inquiry, reflection, and translating experience into considered understanding.",
    naturalAbilities: ["Research and analysis", "Recognizing patterns", "Independent learning"],
    opportunities: ["Developing specialist knowledge", "Sharing careful insight with a wider audience"],
    careerDevelopment: "Research, analysis, technology, investigation, or specialist fields may offer development. Communication and timely action make expertise useful to others.",
    relationships: "Trust and depth may be preferred over constant contact; explaining a need for solitude keeps connection intact.",
    challenges: ["Avoiding isolation", "Acting without total certainty", "Sharing emotion as well as analysis"],
    personalGrowth: ["Pair reflection with practical experiments", "Build regular connection with trusted people"],
    longTermDevelopment: "Allow knowledge and experience to deepen judgment, then apply that understanding in grounded, generous ways."
  },
  8: {
    destinyNumber: 8,
    lifeDirection: "Traditional interpretation frames this path around stewardship, accountable leadership, and patient development of long-term aims.",
    naturalAbilities: ["Resource management", "Long-range planning", "Persistence with complex responsibilities"],
    opportunities: ["Leading sustainable projects", "Building financial or organizational stability"],
    careerDevelopment: "Growth may come through management, operations, finance, or public responsibility. Ethical decisions and humane workloads matter as much as measurable outcomes.",
    relationships: "Commitment and reliability can be strong; warmth and flexibility ensure achievement does not crowd out connection.",
    challenges: ["Avoiding excessive seriousness", "Handling delays patiently", "Separating identity from status or work"],
    personalGrowth: ["Delegate and develop others", "Set limits around work", "Review goals for wellbeing as well as achievement"],
    longTermDevelopment: "Build durable contributions while keeping integrity, relationships, and health within the definition of success."
  },
  9: {
    destinyNumber: 9,
    lifeDirection: "Traditional interpretation frames this path around courageous action, compassion, and using energy in service of meaningful values.",
    naturalAbilities: ["Mobilizing action", "Advocating for people or causes", "Responding decisively under pressure"],
    opportunities: ["Community leadership", "Purposeful service and advocacy", "Turning conviction into sustained action"],
    careerDevelopment: "Action-oriented leadership, advocacy, emergency response, or community work may be meaningful. Planning and recovery make impact sustainable.",
    relationships: "Loyalty and passion can be important; patience and repair after conflict help sustain trust.",
    challenges: ["Avoiding impatience or aggression", "Preventing burnout", "Listening when values are challenged"],
    personalGrowth: ["Choose causes with sustainable scope", "Develop conflict de-escalation skills"],
    longTermDevelopment: "Direct courage toward lasting outcomes and include self-care as part of responsible service."
  }
};

module.exports = { DESTINY_NUMBER_MEANINGS };
