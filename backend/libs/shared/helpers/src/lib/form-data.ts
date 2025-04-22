import 'multer'; // Express.Multer.File
import { fixEncoding } from './common';

export function multerFileToFormData(file: Express.Multer.File, name: string): FormData {
  const { buffer, mimetype, originalname } = file;
  const fileBlob = new Blob([buffer], { type: mimetype });
  const formData = new FormData();

  formData.append(name, fileBlob, fixEncoding(originalname));

  return formData;
}
