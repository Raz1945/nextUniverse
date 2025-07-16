import { cleanAccessList } from '../modules/accessListService.mjs';

(async () => {
  console.log('🧼 Limpiando Access List de MongoDB Atlas...');
  await cleanAccessList({ keepLatest: 2 });
})();