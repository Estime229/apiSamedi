import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

export const initializeFirebase = (configService: ConfigService) => {
  if (!admin.apps.length) {
    const privateKey = configService
      .get('file.FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n')
      .replace(/"/g, '');

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: configService.get('file.FIREBASE_PROJECT_ID'),
        clientEmail: configService.get('file.FIREBASE_CLIENT_EMAIL'),
        privateKey: privateKey,
      }),
      storageBucket: configService.get('file.FIREBASE_STORAGE_BUCKET'),
    });
  }
  return admin;
};
