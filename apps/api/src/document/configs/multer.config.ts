import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (_, file, callback) => {
      const uniqueName = `${randomUUID()}${extname(file.originalname)}`;
      callback(null, uniqueName);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (
    _: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (extname(file.originalname) !== '.pdf') {
      return callback(
        new BadRequestException('Only PDF files are allowed'),
        false,
      );
    }

    callback(null, true);
  },
};
