/**
 * Offline-first lead queue. Save to localStorage BEFORE the fetch so a tab-close
 * or JS error mid-submit never loses a lead. Namespaced per coach.
 */
const QUEUE_KEY = "clearmind-clearlife-pending-leads";
const SYNC_LOCK_MS = 30_000;

export type PendingLead = {
  pendingId: string;
  payload: Record<string, unknown>;
  email?: string;
  createdAt: number;
  retryCount: number;
  lastError?: string;
  syncingAt?: number; // lock timestamp
};

function read(): PendingLead[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  } catch {
    return [];
  }
}

function write(leads: PendingLead[]) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(leads));
  } catch {
    /* private mode / quota — nothing we can do, don't throw */
  }
}

export function generatePendingId(): string {
  const rand = Math.floor(performance.now() * 1000).toString(36) + Math.floor(performance.timeOrigin).toString(36);
  return `cmcl_${Date.now().toString(36)}_${rand}`;
}

export function savePendingLead(lead: Omit<PendingLead, "createdAt" | "retryCount">) {
  const leads = read();
  if (leads.some((l) => l.pendingId === lead.pendingId)) return;
  leads.push({ ...lead, createdAt: Date.now(), retryCount: 0 });
  write(leads);
}

export function getPendingLeads(): PendingLead[] {
  return read();
}

export function removePendingLead(pendingId: string) {
  write(read().filter((l) => l.pendingId !== pendingId));
}

export function updatePendingLead(pendingId: string, patch: Partial<PendingLead>) {
  write(read().map((l) => (l.pendingId === pendingId ? { ...l, ...patch } : l)));
}

/** Returns true if the lock was acquired (not already syncing within the window). */
export function markLeadSyncing(pendingId: string): boolean {
  const leads = read();
  const lead = leads.find((l) => l.pendingId === pendingId);
  if (!lead) return false;
  const now = Date.now();
  if (lead.syncingAt && now - lead.syncingAt < SYNC_LOCK_MS) return false;
  lead.syncingAt = now;
  write(leads);
  return true;
}

export function clearLeadSyncingLock(pendingId: string) {
  updatePendingLead(pendingId, { syncingAt: undefined });
}
