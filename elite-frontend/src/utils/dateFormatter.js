const arabicMonths = [
  'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const arabicDays = [
  'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
];

export function formatDateArabic(date) {
  const d = new Date(date);
  const day = arabicDays[d.getDay()];
  const month = arabicMonths[d.getMonth()];
  
  return `${day}، ${d.getDate()} ${month} ${d.getFullYear()}`;
}
