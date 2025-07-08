// src/lib/mercadopago.ts
import { createHttpClient, withCircuitBreaker } from '@/lib/httpClient';

const mercadopagoClient = createHttpClient({
  baseURL: 'https://api.mercadopago.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
  },
  timeout: 10000
});

// Wrap post in circuit breaker
export const checkoutPreferences = withCircuitBreaker(
  (body: any) => mercadopagoClient.post('/checkout/preferences', body)
);

export default mercadopagoClient;
