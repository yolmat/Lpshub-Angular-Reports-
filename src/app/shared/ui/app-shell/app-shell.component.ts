import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PresentationPreferencesService } from '../../../core/presentation-preferences.service';

@Component({
  selector: 'lps-app-shell', imports: [RouterLink, RouterLinkActive, MatIconModule], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid min-h-screen bg-canvas transition-[grid-template-columns] duration-200 max-md:block" [class.grid-cols-[0_minmax(0,1fr)]]="preferences.sidebarCollapsed()" [class.grid-cols-[240px_minmax(0,1fr)]]="!preferences.sidebarCollapsed()">
      <aside class="flex min-h-screen w-60 flex-col overflow-hidden whitespace-nowrap border-r border-border bg-surface px-[18px] pt-7 pb-5 max-md:hidden" [class.!w-0]="preferences.sidebarCollapsed()" [class.!border-r-0]="preferences.sidebarCollapsed()" [class.!px-0]="preferences.sidebarCollapsed()" id="primary-navigation" aria-label="Navegação principal">
        <a class="block px-2.5 pb-5" routerLink="/relatorios"><img class="block w-[127px]" [src]="preferences.logoPath()" alt="Lopes"></a>
        <div class="grid gap-px px-2.5 pb-5"><strong class="text-base">LpsHub</strong><span class="text-[10px] text-muted">REPORTS</span></div>
        <hr class="m-0 mb-[18px] border-0 border-t border-border">
        <nav class="grid gap-1"><a class="rounded-r-md border-l-4 border-transparent px-[15px] py-[11px] no-underline hover:bg-subtle" routerLink="/relatorios" routerLinkActive="border-brand bg-selected font-semibold" [routerLinkActiveOptions]="{ exact: true }">Relatórios</a><span class="mx-2.5 mt-4 mb-1 text-[9px] text-muted">FINANCEIRO</span><a class="rounded-r-md border-l-4 border-transparent px-[15px] py-[11px] no-underline hover:bg-subtle" routerLink="/relatorios/contas-a-receber/filtros" routerLinkActive="border-brand bg-selected font-semibold">Contas a receber</a><a class="rounded-r-md border-l-4 border-transparent px-[15px] py-[11px] no-underline hover:bg-subtle" href="" (click)="$event.preventDefault()">Contas a pagar</a><a class="rounded-r-md border-l-4 border-transparent px-[15px] py-[11px] no-underline hover:bg-subtle" href="" (click)="$event.preventDefault()">Movimentação</a></nav>
        <div class="mt-auto grid gap-2.5 px-2.5 pt-[18px] text-[11px] text-muted"><hr class="mb-1 border-0 border-t border-border"><span>Ambiente interno</span><span>Dados demonstrativos</span></div>
      </aside>
      <section class="min-w-0">
        <header class="flex min-h-[72px] items-center gap-3 border-b border-border bg-surface px-5 max-md:min-h-[54px] max-md:px-[15px]"><button class="inline-flex min-h-[42px] min-w-[42px] items-center justify-center rounded-md border border-border bg-surface p-2 hover:bg-subtle" type="button" (click)="preferences.toggleSidebar()" [attr.aria-expanded]="!preferences.sidebarCollapsed()" aria-controls="primary-navigation" [attr.aria-label]="preferences.sidebarCollapsed() ? 'Menu' : 'Ocultar'" [attr.title]="preferences.sidebarCollapsed() ? 'Menu' : 'Ocultar'"><mat-icon fontSet="material-symbols-outlined">{{ preferences.sidebarCollapsed() ? 'menu' : 'close_small' }}</mat-icon></button><span class="max-md:hidden">Workspace / Relatórios</span><button class="ml-auto inline-flex min-h-[42px] min-w-[42px] items-center justify-center rounded-md border border-border bg-surface p-2 hover:bg-subtle" type="button" (click)="preferences.toggleTheme()" [attr.aria-label]="preferences.theme() === 'light' ? 'Escuro' : 'Claro'" [attr.title]="preferences.theme() === 'light' ? 'Escuro' : 'Claro'"><mat-icon fontSet="material-symbols-outlined">{{ preferences.theme() === 'light' ? 'light_mode' : 'dark_mode' }}</mat-icon></button><span class="mx-[14px] mr-[34px] text-[11px] text-muted max-md:hidden">Ambiente interno</span><span class="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-black text-[10px] font-bold text-white max-md:h-7 max-md:w-7" aria-label="Perfil AL">AL</span></header>
        <main class="max-w-[1190px] px-[30px] pt-8 pb-6 max-md:px-4 max-md:pt-6"><ng-content /></main>
      </section>
    </div>
  `
})
export class AppShellComponent {
  readonly preferences = inject(PresentationPreferencesService);
  @HostBinding('attr.data-theme') get theme(): string { return this.preferences.theme(); }
}
