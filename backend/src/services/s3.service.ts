import fs from 'fs';
import path from 'path';

/**
 * Sube un archivo a Amazon S3 o guarda localmente como fallback
 * @param file - Objeto de archivo de Multer
 * @param folder - Nombre de la carpeta destino (ej. 'habeas_data')
 */
export const uploadFile = async (file: any, folder: string): Promise<string> => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const bucketName = process.env.AWS_S3_BUCKET;
  const region = process.env.AWS_REGION || 'us-east-1';

  if (accessKeyId && secretAccessKey && bucketName) {
    try {
      // Carga dinámica de AWS SDK para evitar errores si no está instalado
      const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
      const s3Client = new S3Client({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey
        }
      });

      const fileExtension = path.extname(file.originalname || '');
      const filename = `${folder}/${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExtension}`;

      // Extraer buffer
      let fileBuffer = file.buffer;
      if (!fileBuffer && file.path) {
        fileBuffer = fs.readFileSync(file.path);
      }

      await s3Client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: fileBuffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
      }));

      return `https://${bucketName}.s3.${region}.amazonaws.com/${filename}`;
    } catch (error) {
      console.error('Error al subir a S3, usando almacenamiento local como fallback:', error);
    }
  }

  // Fallback: Almacenamiento local en disco
  const uploadDir = path.join(process.cwd(), 'uploads', folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileExtension = path.extname(file.originalname || '');
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExtension}`;
  const filePath = path.join(uploadDir, filename);

  let fileBuffer = file.buffer;
  if (!fileBuffer && file.path) {
    fileBuffer = fs.readFileSync(file.path);
  }

  if (fileBuffer) {
    fs.writeFileSync(filePath, fileBuffer);
  } else {
    throw new Error('No se pudo leer el archivo cargado');
  }

  // Retorna la URL relativa para acceder estáticamente
  return `/uploads/${folder}/${filename}`;
};
