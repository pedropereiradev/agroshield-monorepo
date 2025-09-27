import 'dotenv/config';

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}

export interface ApiServerConfig {
  port: number;
  host: string;
  riskMargin: number;
  opsCost: number;
  projectProfit: number;
  openMeteoRateLimit: number;
}

export interface ContractsConfig {
  providerUrl: string;
  privateKey: string;
  fuelNodePort: number;
  testnetContractId?: string;
}

export interface AppConfig {
  environment: string;
  apiUrl: string;
}

export interface LandingPageConfig {
  databaseUrl: string;
  apiUrl: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
}

function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getEnvVar(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

function getEnvNumber(name: string, defaultValue: number): number {
  const value = process.env[name];
  return value ? Number(value) : defaultValue;
}

export function getDatabaseConfig(): DatabaseConfig {
  return {
    host: getEnvVar('DB_HOST', 'localhost'),
    port: getEnvNumber('DB_PORT', 5432),
    name: getEnvVar('DB_NAME', 'agroshield'),
    user: getEnvVar('DB_USER', 'postgres'),
    password: getEnvVar('DB_PASSWORD', 'password'),
  };
}

export function getApiServerConfig(): ApiServerConfig {
  return {
    port: getEnvNumber('PORT', 3001),
    host: getEnvVar('HOST', '0.0.0.0'),
    riskMargin: getEnvNumber('RISK_MARGIN', 0.06),
    opsCost: getEnvNumber('OPS_COST', 0.3),
    projectProfit: getEnvNumber('PROJECT_PROFIT', 0.15),
    openMeteoRateLimit: getEnvNumber('OPEN_METEO_RATE_LIMIT', 60),
  };
}

export function getContractsConfig(): ContractsConfig {
  const providerUrl = getEnvVar(
    'VITE_FUELS_PROVIDER_URL',
    'http://127.0.0.1:4000/v1/graphql'
  );

  return {
    providerUrl,
    privateKey: requireEnvVar('VITE_FUELS_PRIVATE_KEY'),
    fuelNodePort: getEnvNumber('VITE_FUEL_NODE_PORT', 4000),
    testnetContractId: process.env.VITE_TESTNET_CONTRACT_ID,
  };
}

export function getAppConfig(): AppConfig {
  return {
    environment: getEnvVar('VITE_DAPP_ENVIRONMENT', 'LOCAL'),
    apiUrl: getEnvVar('VITE_API_URL', 'http://localhost:3000'),
  };
}

export function getLandingPageConfig(): LandingPageConfig {
  return {
    databaseUrl: requireEnvVar('DATABASE_URL'),
    apiUrl: getEnvVar('NEXT_PUBLIC_API_URL', 'http://localhost:3001'),
  };
}

export function getRedisConfig(): RedisConfig {
  return {
    host: getEnvVar('REDIS_HOST', 'localhost'),
    port: getEnvNumber('REDIS_PORT', 6379),
    password: process.env.REDIS_PASSWORD,
  };
}

export function getConfig() {
  return {
    ...process.env,
    REDIS_HOST: getEnvVar('REDIS_HOST', 'localhost'),
    REDIS_PORT: getEnvVar('REDIS_PORT', '6379'),
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  };
}
