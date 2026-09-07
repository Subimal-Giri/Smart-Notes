import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns';

export const formatDate = (input) => {
  if (!input) return '';

  const d = new Date(input);

  if (isToday(d)) {
    return `Today, ${format(d, 'h:mm a')}`;
  }

  if (isYesterday(d)) {
    return `Yesterday, ${format(d, 'h:mm a')}`;
  }

  return format(d, 'MMM d, yyyy');
};

export const formatDateLong = (input) => {
  if (!input) return '';

  return format(new Date(input), 'MMMM d, yyyy');
};

export const formatRelative = (input) => {
  if (!input) return '';

  return formatDistanceToNow(new Date(input), { addSuffix: true });
};

