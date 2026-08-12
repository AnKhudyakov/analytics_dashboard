const backendUrl = import.meta.env.VITE_API_URL;

if (!backendUrl) {
  throw new Error('Environment variable VITE_API_URL is not defined.');
}

export const config = { backendUrl };
