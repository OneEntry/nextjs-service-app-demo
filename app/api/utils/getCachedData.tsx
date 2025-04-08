import 'server-only';

const cache = new Map();

/**
 * Get cached data
 * @param key
 * @param fetchFn
 * @returns
 */
const getCachedData = async (
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchFn: () => Promise<any>,
) => {
  if (cache.has(key)) {
    return cache.get(key);
  }
  const data = await fetchFn();
  cache.set(key, data);
  return data;
};

export default getCachedData;

// Оптимизируем получение словаря
// export const getDictionary = async () => {
//   return getCachedData('dictionary', async () => {
//     // существующая логика
//   });
// };

// Оптимизируем получение меню
// export const getMenuByMarker = async (marker: string) => {
//   return getCachedData(`menu_${marker}`, async () => {
//     // существующая логика
//   });
// };
