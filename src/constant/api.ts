
export const PAGE_SIZE: number = 1;
export const REQUEST_BASE_URL: string = window.FM_API || process.env.VUE_APP_FM_API || '';
export const REQUEST_AUTH_URL: string = window.FM_AUTH || process.env.VUE_APP_FM_AUTH || '';
export const API_PREFIX_V1: string = `${REQUEST_BASE_URL}/api/v1`;
export const API_PREFIX_V2: string = `${REQUEST_BASE_URL}/api/v2`;
export const API_PREFIX_V3: string = `${REQUEST_BASE_URL}/api/v3`;
export const AUTH_PREFIX_V1: string = `${REQUEST_AUTH_URL}/api/v1`;
export const AUTH_PREFIX_V2: string = `${REQUEST_AUTH_URL}/api/v2`;
