import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Injectable()
export class FileService implements OnModuleInit {
  private storage: admin.storage.Storage;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    try {
      const privateKey = this.configService
        .get('file.FIREBASE_PRIVATE_KEY')
        .replace(/\\n/g, '\n');

      const serviceAccount = {
        projectId: this.configService.get('file.FIREBASE_PROJECT_ID'),
        privateKey: privateKey,
        clientEmail: this.configService.get('file.FIREBASE_CLIENT_EMAIL'),
      };

      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount,
          ),
          storageBucket: this.configService.get('file.FIREBASE_STORAGE_BUCKET'),
        });
      }

      this.storage = admin.storage();
      console.log('✅ Firebase Storage initialized successfully');
    } catch (error) {
      console.error('❌ Firebase initialization error:', error);
      throw new Error('Failed to initialize Firebase');
    }
  }

  async uploadFile(file: MulterFile): Promise<string> {
    try {
      const bucket = this.storage.bucket();
      const fileName = `uploads/${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      await fileUpload.save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      });

      await fileUpload.makePublic();
      return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    } catch (error) {
      console.error('Upload error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack,
      });
      throw new Error(`Upload failed: ${error.message}`);
    }
  }
}
