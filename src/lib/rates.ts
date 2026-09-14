import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import bundled from '../data/rates-2026.json';
import type { RateConfig } from '../types';

const CACHE_KEY = 'kalkulaph.rates.v1';
const CHECK_KEY = 'kalkulaph.rates.lastCheck';
export const bundledRates = bundled as RateConfig;

export function validRates(value: unknown): value is RateConfig {
  const r = value as RateConfig;
  return !!r && r.schemaVersion === 1 && Number.isInteger(r.effectiveYear) && r.effectiveYear >= 2025 &&
    r.sss?.employeeRate > 0 && r.philHealth?.rate > 0 && r.tax?.annualBrackets?.length >= 6 && Array.isArray(r.sources);
}

export async function loadRates(): Promise<RateConfig> {
  const cached = await AsyncStorage.getItem(CACHE_KEY);
  if (cached) { try { const value = JSON.parse(cached); if (validRates(value) && value.effectiveYear >= bundledRates.effectiveYear) return value; } catch {} }
  return bundledRates;
}

export async function refreshRates(force = false): Promise<{ rates: RateConfig; updated: boolean; message: string }> {
  const current = await loadRates();
  const url = Constants.expoConfig?.extra?.ratesUrl as string | undefined;
  if (!url) return { rates: current, updated: false, message: 'Using verified bundled rates.' };
  const last = Number(await AsyncStorage.getItem(CHECK_KEY) || 0);
  if (!force && Date.now() - last < 86400000) return { rates: current, updated: false, message: 'Rates checked within the last 24 hours.' };
  try {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const candidate = await response.json();
    if (!validRates(candidate) || candidate.effectiveYear < current.effectiveYear) throw new Error('Invalid or older rate table');
    await AsyncStorage.multiSet([[CACHE_KEY, JSON.stringify(candidate)], [CHECK_KEY, String(Date.now())]]);
    return { rates: candidate, updated: candidate.effectiveYear > current.effectiveYear, message: `Verified ${candidate.effectiveYear} rates loaded.` };
  } catch (error) {
    return { rates: current, updated: false, message: `Update unavailable. Safe offline rates retained (${String(error)}).` };
  }
}
