import { Injectable, computed, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class PresentationPreferencesService {
  private readonly themeState = signal<Theme>(this.read<Theme>('lpshub-theme', 'light'));
  private readonly sidebarState = signal(this.read('lpshub-sidebar-collapsed', false));

  readonly theme = this.themeState.asReadonly();
  readonly sidebarCollapsed = this.sidebarState.asReadonly();
  readonly logoPath = computed(() => this.themeState() === 'dark' ? 'assets/brand/Logo VI.png' : 'assets/brand/Logo VO.png');

  toggleTheme(): void { this.setTheme(this.themeState() === 'light' ? 'dark' : 'light'); }
  setTheme(theme: Theme): void { this.themeState.set(theme); this.write('lpshub-theme', theme); }
  toggleSidebar(): void { const next = !this.sidebarState(); this.sidebarState.set(next); this.write('lpshub-sidebar-collapsed', next); }

  private read<T>(key: string, fallback: T): T {
    try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value) as T; } catch { return fallback; }
  }
  private write<T>(key: string, value: T): void { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Preferences must not block the application. */ } }
}
