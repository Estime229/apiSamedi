import { Injectable } from '@nestjs/common';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GeneratorService {
  async generateWordFile(text: string): Promise<Buffer> {
    // Création du document Word avec texte en dur pour test
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text })],
            }),
          ],
        },
      ],
    });

    // Générer le buffer du fichier Word
    const buffer = await Packer.toBuffer(doc);
    return buffer;
  }

  // Exemple pour sauvegarder le fichier sur le disque
  async saveWordFile(
    text: string,
    fileName = 'document.docx',
  ): Promise<string> {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun(text)],
            }),
          ],
        },
      ],
    });
    const buffer = await Packer.toBuffer(doc);
    const filePath = path.join(process.cwd(), fileName);
    fs.writeFileSync(filePath, buffer);
    return filePath;
  }
}
