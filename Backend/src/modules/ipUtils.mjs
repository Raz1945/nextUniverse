import axios from 'axios';

// Obtiene tu IP pública
// La convierte en formato CIDR para Atlas
export async function getCurrentIP() {
  try {
    const { data } = await axios.get('https://api.ipify.org?format=json');
    return data.ip;
  } catch {
    return '127.0.0.1';
  }
}

export function formatCIDR(ip) {
  return `${ip}/32`;
}