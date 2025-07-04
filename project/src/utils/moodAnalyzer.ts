import { MoodData, MoodCategory } from '../types';

export const analyzeMood = (moodData: MoodData): MoodCategory => {
  const { stressLevel, energyLevel, currentActivity } = moodData;
  
  // Weighted scoring system
  let stressedScore = 0;
  let calmScore = 0;
  let energeticScore = 0;
  let focusedScore = 0;
  let creativeScore = 0;
  
  // Stress level analysis (1-5 scale)
  if (stressLevel >= 4) {
    stressedScore += 3;
  } else if (stressLevel >= 3) {
    stressedScore += 1;
    calmScore += 1;
  } else if (stressLevel <= 2) {
    calmScore += 2;
  }
  
  // Energy level analysis
  switch (energyLevel) {
    case 'low':
      calmScore += 2;
      break;
    case 'medium':
      calmScore += 1;
      focusedScore += 2;
      break;
    case 'high':
      energeticScore += 3;
      creativeScore += 1;
      break;
  }
  
  // Activity analysis
  switch (currentActivity) {
    case 'studying':
    case 'working':
    case 'reading':
      focusedScore += 3;
      stressedScore += 1;
      break;
    case 'relaxing':
      calmScore += 3;
      break;
    case 'exercising':
      energeticScore += 3;
      break;
    case 'socializing':
      energeticScore += 2;
      creativeScore += 1;
      break;
    case 'creative':
      creativeScore += 3;
      focusedScore += 1;
      break;
    case 'commuting':
      stressedScore += 2;
      break;
    case 'cooking':
      creativeScore += 2;
      calmScore += 1;
      break;
    case 'cleaning':
      focusedScore += 1;
      energeticScore += 1;
      break;
  }
  
  // Determine primary mood
  const scores = { 
    stressed: stressedScore, 
    calm: calmScore, 
    energetic: energeticScore,
    focused: focusedScore,
    creative: creativeScore
  };
  
  const maxScore = Math.max(stressedScore, calmScore, energeticScore, focusedScore, creativeScore);
  const totalScore = stressedScore + calmScore + energeticScore + focusedScore + creativeScore;
  
  let category: 'stressed' | 'calm' | 'energetic' | 'focused' | 'creative';
  if (scores.stressed === maxScore) {
    category = 'stressed';
  } else if (scores.calm === maxScore) {
    category = 'calm';
  } else if (scores.energetic === maxScore) {
    category = 'energetic';
  } else if (scores.focused === maxScore) {
    category = 'focused';
  } else {
    category = 'creative';
  }
  
  const confidence = Math.round((maxScore / totalScore) * 100);
  
  return { category, confidence };
};