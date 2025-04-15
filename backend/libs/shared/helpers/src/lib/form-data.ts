import 'multer'; // Express.Multer.File

export function multerFileToFormData(file: Express.Multer.File, formData: FormData, name: string): void {
  const { buffer, mimetype, originalname } = file;
  const fileBlob = new Blob([buffer], { type: mimetype });
  const originalFilename = Buffer.from(originalname, 'ascii').toString(); // коректное сохраниние исходного имени

  formData.append(name, fileBlob, originalFilename);
}
