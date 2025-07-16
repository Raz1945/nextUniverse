import { getCurrentIP } from '../modules/ipUtils.mjs';
import { addIP, cleanAccessList } from '../modules/accessListService.mjs';
import { spawn } from 'child_process';

(async () => {
  console.log('🔍 Detectando IP actual...');
  const ip = await getCurrentIP();
  console.log(`🌐 IP actual: ${ip}`);

  const added = await addIP(ip);

  if (added) {
    console.log('🧼 Ejecutando limpieza de Access List...');
    await cleanAccessList({ keepLatest: 2 });
  } else {
    console.log('🔁 Saltando limpieza porque la IP ya existía.');
  }

  console.log('\n🚀 Iniciando backend con nodemon...\n');

  spawn('nodemon', ['app.js'], {
    stdio: 'inherit',
    shell: true,
  });
})();
