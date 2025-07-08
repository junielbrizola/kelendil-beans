// src/lib/httpClient.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import CircuitBreaker from 'opossum';

// Create an Axios instance with retry logic
export function createHttpClient(config: AxiosRequestConfig): AxiosInstance {
  const client = axios.create(config);
  axiosRetry(client, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: error => axiosRetry.isNetworkOrIdempotentRequestError(error)
  });
  return client;
}

// Wrap HTTP calls with a circuit breaker
type HttpFunction = (...args: any[]) => Promise<any>;
export function withCircuitBreaker<T extends HttpFunction>(
  fn: T,
  options: {
    timeout?: number;
    errorThresholdPercentage?: number;
    resetTimeout?: number;
  } = {}
): T {
  const breaker = new CircuitBreaker((...args: any[]) => fn(...args), {
    timeout: options.timeout ?? 5000,
    errorThresholdPercentage: options.errorThresholdPercentage ?? 50,
    resetTimeout: options.resetTimeout ?? 30000
  });
  return ((...args: any[]) => breaker.fire(...args)) as T;
}
