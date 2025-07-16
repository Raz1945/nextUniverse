import { forceAddIP } from '../modules/accessListService.mjs';

const ip = process.argv[2]; // IP desde CLI
const comment = process.argv[3] || '';

if (!ip) {
  console.log('❌ Debes ingresar una IP. Ejemplo:\n$ npm run atlas:add-ip -- 123.123.123.123 "VPN dev server"');
  process.exit(1);
}

await forceAddIP(ip, comment);
