// src/lib/melhorenvio.ts
import { createHttpClient, withCircuitBreaker } from '@/lib/httpClient';

const melhorEnvioClient = createHttpClient({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://api.melhorenvio.com.br'
    : 'https://sandbox.melhorenvio.com.br',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.MELHORENVIO_API_TOKEN}`
  },
  timeout: 10000
});

// Wrap post in circuit breaker
export const calculateShipment = withCircuitBreaker(
  (payload: any) => melhorEnvioClient.post('/me/shipment/calculate', payload)
);

export default melhorEnvioClient;
