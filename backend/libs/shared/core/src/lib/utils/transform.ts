import dayjs from 'dayjs';

import { DateFormat } from '../constants/date-format';

//! нужно ли
export function transformTags({ value }): string[] {
  // когда запрос в fit, то преобразует entity[]
  // а когда запрос из api, то преобразует string[]
  return value.map(
    (item: { title: string } | string) => {
      if (typeof item === 'string') {
        return item;
      }

      return item.title;
    });
}

//! нужно ли
export function transformDate({ value }): string {
  //!
  console.log('transformDate', value);

  return dayjs(value).format(DateFormat.ONLY_DATE);
}
