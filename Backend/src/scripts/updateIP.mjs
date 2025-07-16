import { getCurrentIP } from '../modules/ipUtils.mjs';
import { addIP } from '../modules/accessListService.mjs';

(async () => {
  console.log('🔍 Obteniendo IP actual...');
  const ip = await getCurrentIP();
  console.log(`🌐 IP detectada: ${ip}`);

  await addIP(ip);
})();
