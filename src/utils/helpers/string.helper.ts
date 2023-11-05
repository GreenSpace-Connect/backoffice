import dayjs from 'dayjs';

export const convertToIdr = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number);
};

export const formatDate = (date?: string, format?: string) => {
  if (!date) return '';
  if (!format) format = 'DD MMMM YYYY';

  return dayjs(date).format(format);
};
