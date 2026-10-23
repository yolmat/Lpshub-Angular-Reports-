import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface ReportCard { category: string; title: string; description: string; available: boolean; }
@Component({ selector: 'lps-report-catalog', imports: [RouterLink, MatIconModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
  <section class="mb-[26px]"><p class="mb-2 text-[11px] text-muted">SAP Business One / Relatórios</p><h1 class="mb-3 text-[30px] leading-[1.15] font-bold tracking-[-.6px] max-md:text-[25px]">Seus relatórios, em um só lugar</h1><p class="m-0 text-muted">Consulte, analise e compartilhe os dados da sua operação.</p><p class="mt-2 mb-5 font-accent text-[34px] text-brand max-md:text-[28px]">Decisões com confiança</p></section>
  <label class="block"><span class="sr-only">Buscar relatório</span><input class="min-h-11 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground placeholder:text-muted" #search type="search" placeholder="Buscar relatório por nome ou descrição" (input)="query.set(search.value)"></label>
  <div class="my-5 mb-8 flex gap-3 overflow-x-auto max-md:gap-[7px]" role="group" aria-label="Categoria"><button class="min-w-[102px] rounded-full bg-selected px-[13px] py-2 text-left text-xs">Todos</button><button class="min-w-[102px] rounded-full bg-subtle px-[13px] py-2 text-left text-xs">Financeiro</button><button class="min-w-[102px] rounded-full bg-subtle px-[13px] py-2 text-left text-xs">Comercial</button><button class="min-w-[102px] rounded-full bg-subtle px-[13px] py-2 text-left text-xs">Operacional</button></div>
  <section class="grid grid-cols-2 gap-[22px] max-md:grid-cols-1">@for (report of filteredReports(); track report.title) { <article class="min-h-[195px] rounded-lg border border-border bg-surface p-[22px]"><span class="text-[10px] text-muted">{{ report.category }}</span><h2 class="my-[14px] text-xl leading-tight font-bold">{{ report.title }}</h2><p class="mb-6 text-muted">{{ report.description }}</p>@if (report.available) { <a class="inline-flex min-h-[42px] items-center justify-center gap-1 rounded-md border border-border bg-surface px-[14px] py-2 font-semibold no-underline hover:bg-subtle" routerLink="/relatorios/contas-a-receber/filtros">Abrir relatório <mat-icon class="!h-[18px] !w-[18px] !text-[18px]" fontSet="material-symbols-outlined" aria-hidden="true">arrow_outward</mat-icon></a> } @else { <button class="inline-flex min-h-[42px] cursor-not-allowed items-center justify-center rounded-md border border-border bg-surface px-[14px] py-2 font-semibold opacity-55" disabled>Em breve</button> }</article> }</section>
  <p class="mt-7 text-[11px] text-muted">Modelo de catálogo. Relatórios e permissões dependem da API.</p>
` })
export class ReportCatalogComponent {
  readonly query = signal('');
  readonly reports: readonly ReportCard[] = [
    { category: 'FINANCEIRO', title: 'Contas a receber', description: 'Títulos, vencimentos e saldos por cliente.', available: true },
    { category: 'FINANCEIRO', title: 'Contas a pagar', description: 'Compromissos e valores por fornecedor.', available: false },
    { category: 'FINANCEIRO', title: 'Movimentação financeira', description: 'Visão dos movimentos por empresa.', available: false },
    { category: 'COMERCIAL', title: 'Documentos de venda', description: 'Consulte documentos e clientes.', available: false }
  ];
  filteredReports = () => { const term = this.query().trim().toLocaleLowerCase('pt-BR'); return term ? this.reports.filter((report) => `${report.title} ${report.description}`.toLocaleLowerCase('pt-BR').includes(term)) : this.reports; };
}
