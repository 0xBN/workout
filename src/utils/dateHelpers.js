export const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const getTargetDate = (dayName) => {
  const today = new Date();
  const targetIdx = DAYS.indexOf(dayName.toLowerCase());

  if (targetIdx === -1) return today;

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const d = new Date(startOfWeek);
  d.setDate(startOfWeek.getDate() + targetIdx);
  return d;
};

export const formatLocalDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const getTargetDateStr = (dayName) => formatLocalDate(getTargetDate(dayName));
