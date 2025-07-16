import DigestFetch from 'digest-fetch';
import dotenv from 'dotenv';
dotenv.config({ path: './src/config/.env' });



const {
  MONGO_PUBLIC_KEY,
  MONGO_PRIVATE_KEY,
  MONGO_PROJECT_ID
} = process.env;

const client = new DigestFetch(MONGO_PUBLIC_KEY, MONGO_PRIVATE_KEY, { algorithm: 'MD5' });

const HEADERS = {
  'Accept': 'application/vnd.atlas.2024-08-05+json',
  'Content-Type': 'application/json'
};

async function testAccessDigest() {
  try {
    console.log('🔍 Verificando visibilidad del proyecto...');
    const groupsRes = await client.fetch('https://cloud.mongodb.com/api/atlas/v2/groups', {
      headers: HEADERS
    });

    const status = groupsRes.status;
    const json = await groupsRes.json();

    if (!groupsRes.ok) {
      throw new Error(`HTTP ${status}: ${json.detail || json.reason || 'Respuesta no autorizada'}`);
    }

    if (!Array.isArray(json.results)) {
      throw new Error('La propiedad "results" no está presente o no es un array');
    }

    const project = json.results.find(p => p.id === MONGO_PROJECT_ID);

    if (!project) {
      console.log('❌ La API Key no tiene acceso al proyecto especificado.');
      return;
    }

    console.log(`✅ Proyecto visible: ${project.name}`);

    console.log('\n📋 Intentando listar Access List...');
    const accessRes = await client.fetch(`https://cloud.mongodb.com/api/atlas/v2/groups/${MONGO_PROJECT_ID}/accessList`, {
      headers: HEADERS
    });

    const accessJson = await accessRes.json();

    if (!accessRes.ok) {
      throw new Error(`Access List error HTTP ${accessRes.status}: ${accessJson.detail || accessJson.reason || 'Error desconocido'}`);
    }

    console.log('✅ Access List obtenida:', accessJson.results || []);
  } catch (error) {
    console.error('\n❌ Error detectado:', error.message);
  }
}

testAccessDigest();
