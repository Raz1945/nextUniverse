import DigestFetch from 'digest-fetch';
import dotenv from 'dotenv';
dotenv.config({ path: './src/config/.env' });

const { MONGO_PUBLIC_KEY, MONGO_PRIVATE_KEY } = process.env;

// Exporta el cliente digestClient configurado
// Puede ser usado en todos los scripts que llamen a Atlas
export const digestClient = new DigestFetch(MONGO_PUBLIC_KEY, MONGO_PRIVATE_KEY, {
  algorithm: 'MD5'
});
