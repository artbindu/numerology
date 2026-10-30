const FREQUENCY_LEVELS = {
  1: {
    label: "Single occurrence",
    meaning: "appears once, representing an available quality that can be practiced deliberately",
    positive: "A clear, moderate expression of this quality can be developed through regular use.",
    challenge: "The quality may not be the first resource someone reaches for under pressure.",
    personality: "The theme is present without dominating the person's broader style.",
    recommendation: "Notice situations where this quality helps and practice it consistently."
  },
  2: {
    label: "Double occurrence",
    meaning: "appears twice, bringing the theme into more frequent awareness",
    positive: "The quality may be easier to access and can become a dependable personal resource.",
    challenge: "Overreliance on this quality can make other approaches less visible.",
    personality: "The theme may appear more often in habits and first reactions.",
    recommendation: "Use the quality intentionally while checking whether the situation calls for a different response."
  },
  3: {
    label: "Triple occurrence",
    meaning: "appears three times, giving the theme a noticeable place in the grid",
    positive: "The quality can support confident action when paired with awareness and flexibility.",
    challenge: "A strong preference can become automatic and crowd out listening or adaptation.",
    personality: "Others may recognize the theme quickly, especially in familiar settings.",
    recommendation: "Balance the quality with a deliberate pause, feedback, and a complementary skill."
  },
  4: {
    label: "Four occurrences",
    meaning: "appears four times, placing substantial emphasis on the theme",
    positive: "Focused practice may make the quality a significant source of skill and contribution.",
    challenge: "Intensity can create blind spots, fatigue, or difficulty adapting when conditions change.",
    personality: "The theme may strongly influence choices, but it does not define the whole person.",
    recommendation: "Build counterbalancing habits and ask trusted people how this pattern affects them."
  },
  5: {
    label: "Five or more occurrences",
    meaning: "appears five or more times, making balance and conscious choice especially important",
    positive: "With reflection, the theme can be directed toward a specialized skill or meaningful purpose.",
    challenge: "Overemphasis may turn the quality into a rigid response or obscure other needs and strengths.",
    personality: "The pattern may be prominent, while its expression remains shaped by experience and choice.",
    recommendation: "Avoid treating intensity as automatically beneficial; seek balance, rest, and outside perspective."
  }
};

const REPEATED_NUMBER_THEMES = {
  1: {
    title: "Initiative in focus",
    meaning: "self-expression, independence, and beginning new efforts",
    personality: "May favor taking the lead and expressing a personal point of view.",
    positive: "Courage to initiate, confidence, and clear self-advocacy.",
    challenge: "Impatience, stubbornness, or difficulty sharing control.",
    career: "Can support entrepreneurship and ownership; collaboration keeps initiative aligned with team needs.",
    relationships: "Directness can clarify intentions; listening and compromise protect mutuality.",
    recommendation: "Pair decisive action with consultation, patience, and shared credit."
  },
  2: {
    title: "Sensitivity in focus",
    meaning: "cooperation, emotional awareness, and relationship-building",
    personality: "May pay close attention to other people and the atmosphere around them.",
    positive: "Diplomacy, empathy, and skill in supporting partnership.",
    challenge: "Emotional overdependence, indecision, or taking on others' feelings.",
    career: "Can aid coordination and mediation; clear boundaries prevent over-accommodation.",
    relationships: "Attunement can deepen closeness; direct requests and independent interests maintain balance.",
    recommendation: "Combine compassion with boundaries and make decisions from personal values as well as group input."
  },
  3: {
    title: "Learning and expression in focus",
    meaning: "curiosity, creativity, communication, and education",
    personality: "May seek new ideas and enjoy sharing discoveries with others.",
    positive: "Creative thinking, enthusiasm for learning, and expressive communication.",
    challenge: "Scattered focus, overpromising, or leaving ideas unfinished.",
    career: "Can support teaching and communication; schedules help convert inspiration into completed work.",
    relationships: "Conversation and humor can bring connection; follow-through matters as much as enthusiasm.",
    recommendation: "Limit simultaneous projects and create practical milestones for ideas."
  },
  4: {
    title: "Structure in focus",
    meaning: "discipline, planning, practicality, and consistent effort",
    personality: "May prefer predictable systems and careful preparation.",
    positive: "Reliability, organization, and persistence with detailed work.",
    challenge: "Rigidity, excessive caution, or difficulty delegating and changing plans.",
    career: "Can strengthen operations and quality work; periodic review prevents process from becoming inflexible.",
    relationships: "Dependability can build trust; emotional flexibility and affection prevent relationships feeling procedural.",
    recommendation: "Keep useful routines, but regularly question rules that no longer serve their purpose."
  },
  5: {
    title: "Balance and adaptation in focus",
    meaning: "communication, versatility, and responding to change",
    personality: "May move readily among ideas and adapt quickly to new circumstances.",
    positive: "Versatility, broad perspective, and skill in connecting viewpoints.",
    challenge: "Restlessness, inconsistency, or repeatedly reconsidering a sound decision.",
    career: "Can support varied roles and problem-solving; stable priorities protect depth and completion.",
    relationships: "Flexibility can help partners adjust; clear commitments make change feel reliable.",
    recommendation: "Use a small set of stable routines to anchor exploration and changing interests."
  },
  6: {
    title: "Care and responsibility in focus",
    meaning: "family, harmony, service, and creating comfort",
    personality: "May be highly attentive to the needs of loved ones and shared spaces.",
    positive: "Warmth, loyalty, and ability to create supportive environments.",
    challenge: "Overgiving, perfectionism, or using comfort and spending to manage stress.",
    career: "Can support service and design; explicit boundaries protect time and compensation.",
    relationships: "Care may be expressed generously; mutual responsibility prevents one-sided patterns.",
    recommendation: "Offer support by agreement, budget for comfort, and protect personal time."
  },
  7: {
    title: "Reflection in focus",
    meaning: "analysis, research, introspection, and learning from experience",
    personality: "May seek depth, privacy, and careful understanding before acting.",
    positive: "Research ability, insight, and independent thought.",
    challenge: "Isolation, overthinking, or delaying action until certainty feels complete.",
    career: "Can aid specialist and analytical work; sharing findings keeps insight connected to others.",
    relationships: "Depth can support trust; communicating the need for solitude prevents distance being misread.",
    recommendation: "Set limits on research time and turn reflection into specific, grounded action."
  },
  8: {
    title: "Stewardship in focus",
    meaning: "patience, management, responsibility, and long-range goals",
    personality: "May be strongly oriented toward duty, measurable progress, and lasting outcomes.",
    positive: "Persistence, management skill, and careful handling of resources.",
    challenge: "Excessive seriousness, work-centered identity, or control under uncertainty.",
    career: "Can support leadership and long projects; fair workload and rest sustain performance.",
    relationships: "Reliability can be valued; warmth and flexibility keep duty from displacing connection.",
    recommendation: "Measure wellbeing alongside results and practice delegating responsibility."
  },
  9: {
    title: "Action and compassion in focus",
    meaning: "courage, energy, determination, and concern for others",
    personality: "May feel strongly motivated to act on values and respond to urgent needs.",
    positive: "Courage, initiative, and ability to mobilize effort.",
    challenge: "Impatience, aggression, or burnout from taking on too much.",
    career: "Can help in advocacy and action-oriented work; planning turns urgency into sustainable impact.",
    relationships: "Passion and loyalty can be strong; cooling-off time helps prevent conflict escalation.",
    recommendation: "Choose a sustainable scope of action and pause before high-stakes responses."
  }
};

const getRepeatedNumberMeaning = function (number, frequency) {
  const theme = REPEATED_NUMBER_THEMES[number];
  const count = Number(frequency);
  const tier = count >= 5 ? FREQUENCY_LEVELS[5] : FREQUENCY_LEVELS[count];

  if (!theme || !tier || !Number.isInteger(count) || count < 1) {
    return null;
  }

  return {
    number,
    frequency: count,
    frequencyLabel: tier.label,
    displayValue: String(number).repeat(count),
    interpretationTitle: `${theme.title} · ${tier.label}`,
    coreMeaning: `Traditional Lo Shu readings describe ${tier.meaning}. For ${number}, this emphasizes ${theme.meaning}.`,
    positiveCharacteristics: [theme.positive, tier.positive],
    potentialChallenges: [theme.challenge, tier.challenge],
    personalityEffects: `${theme.personality} ${tier.personality}`,
    careerImplications: theme.career,
    relationshipImplications: theme.relationships,
    practicalRecommendations: [theme.recommendation, tier.recommendation]
  };
};

module.exports = {
  FREQUENCY_LEVELS,
  REPEATED_NUMBER_THEMES,
  getRepeatedNumberMeaning
};
