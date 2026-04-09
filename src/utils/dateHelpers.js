export const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const getTargetDate = (dayName) => {
  const today = new Date();
  const todayIdx = today.getDay();
  const targetIdx = DAYS.indexOf(dayName.toLowerCase());
  
  let diff = targetIdx - todayIdx;
  if (diff > 0) diff -= 7; 
  
  const d = new Date(today);
  d.setDate(today.getDate() + diff);
  return d;
};

export const formatLocalDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const getTargetDateStr = (dayName) => formatLocalDate(getTargetDate(dayName));
