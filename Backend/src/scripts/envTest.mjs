import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve('./src/config/.env');
console.log('🛠️ Intentando cargar el archivo .env desde:', envPath);

dotenv.config({ path: envPath });

// Mostrar valores cargados
console.log('🔑 MONGO_PUBLIC_KEY:', process.env.MONGO_PUBLIC_KEY || '(no definido)');
console.log('🔐 MONGO_PRIVATE_KEY:', process.env.MONGO_PRIVATE_KEY || '(no definido)');
console.log('🆔 MONGO_PROJECT_ID:', process.env.MONGO_PROJECT_ID || '(no definido)');