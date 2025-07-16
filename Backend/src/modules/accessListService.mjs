import { digestClient } from './atlasClient.mjs';
import { formatCIDR } from './ipUtils.mjs';
import dotenv from 'dotenv';
dotenv.config({ path: './src/config/.env' });



const { MONGO_PROJECT_ID } = process.env;
const BASE_URL = `https://cloud.mongodb.com/api/atlas/v2/groups/${MONGO_PROJECT_ID}/accessList`;

const HEADERS = {
  Accept: 'application/vnd.atlas.2024-08-05+json',
  'Content-Type': 'application/json',
};

// Obtener lista actual de IPs
export async function getAccessList() {
  const res = await digestClient.fetch(BASE_URL, { headers: HEADERS });
  const json = await res.json();
  return json.results || [];
}

// Verificar si ya existe la IP
export async function ipExists(ip) {
  const currentList = await getAccessList();
  return currentList.some(
    (entry) => entry.ipAddress === ip || entry.cidrBlock === formatCIDR(ip)
  );
}

// Agregar nueva IP si no existe
export async function addIP(ip) {
  if (await ipExists(ip)) {
    console.log(`⚠️ La IP ${ip} ya está registrada. No se requiere actualización.`);
    return false;
  }

  const payload = [{
    cidrBlock: `${ip}/32`,
    comment: `Agregada automáticamente el ${new Date().toLocaleString()}`
  }];

  const res = await digestClient.fetch(BASE_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(payload)
  });

  const json = await res.json();

  if (res.ok) {
    console.log('✅ IP agregada correctamente:', json);
    return true;
  } else {
    console.error('❌ Error al agregar IP:', {
      status: res.status,
      reason: json.reason,
      detail: json.detail
    });
    return false;
  }
}

// Eliminar una IP
export async function deleteIP(ip) {
  const url = `${BASE_URL}/${ip}`;
  const res = await digestClient.fetch(url, {
    method: 'DELETE',
    headers: HEADERS,
  });

  if (res.ok) {
    console.log(`🗑️ IP ${ip} eliminada correctamente`);
    return true;
  } else {
    const error = await res.json();
    console.error('❌ Error al eliminar:', error);
    return false;
  }
}

// Limpiar IPs vacías, duplicadas o excedentes
export async function cleanAccessList({ keepLatest = 2 } = {}) {
  const accessList = await getAccessList();

  // Ordenar por fecha de creación implícita (asumimos orden de llegada)
  const sorted = [...accessList].reverse();

  const toRemove = [];

  // Mantener solo las últimas N entradas con comentarios
  const preserved = sorted
    .filter((entry) => entry.comment)
    .slice(0, keepLatest)
    .map((entry) => entry.ipAddress);

  for (const entry of accessList) {
    const ip = entry.ipAddress;
    if (!ip) continue;

    const isPreserved = preserved.includes(ip);
    const isEmptyComment = !entry.comment;

    if (!isPreserved || isEmptyComment) {
      toRemove.push(ip);
    }
  }

  if (toRemove.length === 0) {
    console.log('✅ No hay IPs que limpiar');
    return;
  }

  console.log(`🗑️ Eliminando ${toRemove.length} IPs obsoletas...`);
  for (const ip of toRemove) {
    await deleteIP(ip);
  }
}

// Agregar una IP manual desde consola
// npm run atlas:add-ip -- 201.222.100.50 "Nueva IP remota"
export async function forceAddIP(ip, comment = '') {
  const payload = [{
    cidrBlock: `${ip}/32`,
    comment
  }];

  const res = await digestClient.fetch(BASE_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(payload)
  });

  const json = await res.json();

  if (res.ok) {
    console.log(`✅ IP ${ip} agregada forzadamente.`);
  } else {
    console.error('❌ Error al agregar:', json);
  }

  return json;
}
