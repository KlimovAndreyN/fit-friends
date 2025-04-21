import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    useMultipartFormData?: boolean;
    retry?: boolean;
    notFoundToReject?: boolean;
  }
}
