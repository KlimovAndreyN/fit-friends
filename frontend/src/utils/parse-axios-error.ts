import { AxiosError } from 'axios';

//! возможно на беке есть описание этого типа
export type DataAxiosError = {
  message: string | string[];
  error: string;
  statusCode: number;
}

export function getAxiosErrorMessage(error: AxiosError<DataAxiosError>): string {
  const { response, message, config: { baseURL, url } } = error;
  const messages: string[] = [];

  messages.push([baseURL, url].join(''));

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

  if (!baseURL) {
    messages.push('EMPTY baseURL, check the console!');
  }

  return messages.reverse().join(';\n');
}
