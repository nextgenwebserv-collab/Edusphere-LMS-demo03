// Simulated Redis-style in-memory cache with TTL + pub/sub.
// In production this maps to Upstash Redis; here it mirrors the interface
// for live classroom counts, leaderboard caching, and session state.

type Listener = (value: unknown) => void;

class RedisMock {
  private store = new Map<string, { value: unknown; expiresAt: number | null }>();
  private channels = new Map<string, Set<Listener>>();

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return null;
    }
    return entry.value as T;
  }

  set(key: string, value: unknown, ttlSeconds?: number) {
    this.store.set(key, {
      value,
      expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null,
    });
  }

  incr(key: string): number {
    const current = (this.get<number>(key) ?? 0) + 1;
    this.set(key, current);
    return current;
  }

  decr(key: string): number {
    const current = Math.max(0, (this.get<number>(key) ?? 0) - 1);
    this.set(key, current);
    return current;
  }

  publish(channel: string, value: unknown) {
    const listeners = this.channels.get(channel);
    if (listeners) listeners.forEach((fn) => fn(value));
  }

  subscribe(channel: string, listener: Listener): () => void {
    if (!this.channels.has(channel)) this.channels.set(channel, new Set());
    this.channels.get(channel)!.add(listener);
    return () => this.channels.get(channel)?.delete(listener);
  }

  flush() {
    this.store.clear();
  }
}

export const redis = new RedisMock();

// Live classroom participant counter helpers
export const classroomKeys = {
  activeCount: 'classroom:active_count',
  raisedHands: 'classroom:raised_hands',
  leaderboard: 'cache:leaderboard',
};

export function joinClassroom() {
  const count = redis.incr(classroomKeys.activeCount);
  redis.publish('classroom:events', { type: 'join', count });
  return count;
}

export function leaveClassroom() {
  const count = redis.decr(classroomKeys.activeCount);
  redis.publish('classroom:events', { type: 'leave', count });
  return count;
}

export function getActiveClassroomCount() {
  return redis.get<number>(classroomKeys.activeCount) ?? 0;
}
