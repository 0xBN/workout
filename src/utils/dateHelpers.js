export const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const getTargetDateStr = (dayName) => {
  const today = new Date();
  const todayIdx = today.getDay();
  const targetIdx = DAYS.indexOf(dayName.toLowerCase());
  
  let diff = targetIdx - todayIdx;
  if (diff > 0) diff -= 7; 
  
  const d = new Date(today);
  d.setDate(today.getDate() + diff);
  
  // This format (M/D/YYYY) usually matches Google Sheets default.
  // If your sheet uses YYYY-MM-DD, change this to d.toISOString().split('T')[0]
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};
