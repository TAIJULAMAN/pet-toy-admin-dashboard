export const Url = import.meta.env.DEV ? "/" : import.meta.env.VITE_BASE_URL;

export const url = `${Url}api/v1/`;
export const imgUrl = `${Url}api/v1`;
export const getBaseUrl = () => url;