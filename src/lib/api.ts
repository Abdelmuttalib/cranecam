export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export function fetchAPI(url: string, options: RequestInit = {}) {
  return fetch(`${BASE_API_URL}${url}`, options).then((res) => res.json());
}

export const apiPaths = {
  getPotreeDate: "/getPotreeDate",
};

export function getPotreeDate() {
  return fetchAPI(apiPaths.getPotreeDate);
}
