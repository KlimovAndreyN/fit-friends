import { AxiosError } from 'axios';

import { joinUrl } from './common';

//! возможно на беке есть описание этого типа
export type DataAxiosError = {
  message: string | string[];
  error: string;
  statusCode: number;
}

export function getAxiosErrorMessage(error: AxiosError<DataAxiosError>, showUrl: boolean): string {
  const { response, message, config } = error;
  const messages: string[] = [];

  if (showUrl) {
    const { baseURL, url } = config;

    messages.push(joinUrl(baseURL || '', url || ''));
  }

  if (response && response.data) {
    const { data, statusText } = response;

    if (data) {
      const dataMessage = data.message;

      if (dataMessage) {
        if (Array.isArray(dataMessage)) {
          dataMessage.forEach((item) => messages.push(item));
        } else {
          messages.push(dataMessage);
        }
      }
    }

    messages.push(statusText);
  } else {
    messages.push(message);
  }

  return messages.reverse().join(';\n');
}
