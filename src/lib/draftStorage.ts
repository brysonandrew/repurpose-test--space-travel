// src/lib/wizardDraftStorage.ts
import type { WizardState } from '@/lib/wizardState';

const STORAGE_KEY = 'wizard_draft_v1';

export function saveWizardDraft(state: WizardState) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function loadWizardDraft(): WizardState | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as WizardState;
  } catch {
    return undefined;
  }
}

export function clearWizardDraft() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}