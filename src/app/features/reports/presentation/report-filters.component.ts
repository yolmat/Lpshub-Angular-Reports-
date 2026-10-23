import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lps-report-filters',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mb-6">
      <h1 class="mb-2.5 text-[30px] leading-[1.15] font-bold tracking-[-.6px] max-md:text-[25px]">
        Contas a receber
      </h1>
      <a routerLink="/relatorios" class="text-xs text-muted no-underline">‹ Voltar ao catálogo</a>
    </section>
    <form [formGroup]="filters" class="rounded-lg border border-border bg-surface p-[18px]">
      <div>
        <h2 class="mb-1 text-xl leading-tight font-bold">Parâmetros da consulta</h2>
        <p class="mb-[18px] text-muted">Estes filtros definem a consulta antes da geração.</p>
      </div>
      <hr class="mb-4 border-0 border-t border-border" />
      <div class="grid grid-cols-2 gap-x-11 gap-y-[18px] max-md:grid-cols-1">
        <label class="grid gap-2 text-xs font-semibold"
          >Empresas<select
            class="min-h-11 rounded-md border border-border bg-surface px-3 py-2.5 text-foreground"
            formControlName="companies"
          >
            <option>Todas as empresas autorizadas</option>
          </select></label
        ><label class="grid gap-2 text-xs font-semibold"
          >Tipos de documento<select
            class="min-h-11 rounded-md border border-border bg-surface px-3 py-2.5 text-foreground"
            formControlName="documents"
          >
            <option>Nota fiscal de saída; adiantamento</option>
          </select></label
        >
        <fieldset class="grid gap-2 border-0 p-0 text-xs font-semibold">
          <legend class="mb-2 p-0">Data de vencimento</legend>
          <div class="mb-2.5 flex gap-3 overflow-x-auto">
            <button
              type="button"
              class="flex-1 rounded-full bg-subtle px-[13px] py-2 text-left text-xs whitespace-nowrap"
            >
              Data única</button
            ><button
              type="button"
              class="flex-1 rounded-full bg-selected px-[13px] py-2 text-left text-xs whitespace-nowrap"
            >
              Intervalo</button
            ><button
              type="button"
              class="flex-1 rounded-full bg-subtle px-[13px] py-2 text-left text-xs whitespace-nowrap"
            >
              Múltiplas datas
            </button>
          </div>
          <div class="grid grid-cols-2 gap-6 max-md:gap-3">
            <label class="grid gap-2"
              >De<input
                class="min-h-11 rounded-md border border-border bg-surface px-3 py-2.5 text-foreground"
                type="text"
                formControlName="startDate"
                inputmode="numeric" /></label
            ><label class="grid gap-2"
              >Até<input
                class="min-h-11 rounded-md border border-border bg-surface px-3 py-2.5 text-foreground"
                type="text"
                formControlName="endDate"
                inputmode="numeric"
            /></label>
          </div>
        </fieldset>
        <fieldset class="grid gap-2 border-0 p-0 text-xs font-semibold">
          <legend class="mb-2 p-0">Clientes</legend>
          <input
            class="min-h-11 rounded-md border border-border bg-surface px-3 py-2.5 text-foreground"
            formControlName="clients"
          /><span class="mt-1.5">Modo de seleção</span>
          <div class="mb-2.5 flex gap-3">
            <button
              type="button"
              class="flex-1 rounded-full bg-selected px-[13px] py-2 text-left text-xs"
            >
              Específicos</button
            ><button
              type="button"
              class="flex-1 rounded-full bg-subtle px-[13px] py-2 text-left text-xs"
            >
              Por intervalo
            </button>
          </div>
        </fieldset>
        <label class="grid gap-2 text-xs font-semibold"
          >Valor mínimo (BRL)<input
            class="min-h-11 rounded-md border border-border bg-surface px-3 py-2.5 text-foreground"
            formControlName="minimum" /></label
        ><label class="grid gap-2 text-xs font-semibold"
          >Valor máximo (BRL)<input
            class="min-h-11 rounded-md border border-border bg-surface px-3 py-2.5 text-foreground"
            formControlName="maximum"
        /></label>
      </div>
      <p class="mt-5 text-[11px] text-muted">
        Período inclusivo · Códigos de cliente preservam zeros à esquerda.
      </p>
      <p class="mt-5 text-[11px] text-muted">
        A opção Todas respeita as empresas autorizadas para a sessão.
      </p>
    </form>
    <footer
      class="mt-[22px] flex items-center gap-7 max-md:flex-col max-md:items-stretch max-md:gap-3"
    >
      <button
        class="inline-flex min-h-[42px] items-center justify-center rounded-md border border-border bg-surface px-[14px] py-2 font-semibold hover:bg-subtle"
        type="button"
        (click)="filters.reset(defaults)"
      >
        Limpar filtros</button
      ><span class="text-[11px] text-muted">Os filtros serão enviados à API.</span
      ><a
        class="ml-auto inline-flex min-h-[42px] min-w-[150px] items-center justify-center rounded-md bg-primary px-[14px] py-2 font-semibold text-on-primary no-underline max-md:ml-0"
        routerLink="/relatorios/contas-a-receber/resultados"
        >Gerar relatório <span aria-hidden="true">›</span></a
      >
    </footer>
  `,
})
export class ReportFiltersComponent {
  readonly defaults = {
    companies: 'Todas as empresas autorizadas',
    documents: 'Nota fiscal de saída; adiantamento',
    startDate: '01/10/2026',
    endDate: '31/10/2026',
    clients: '000123; 000456',
    minimum: 'R$ 0,00',
    maximum: 'Sem limite',
  };
  readonly filters = new FormGroup({
    companies: new FormControl(this.defaults.companies, { nonNullable: true }),
    documents: new FormControl(this.defaults.documents, { nonNullable: true }),
    startDate: new FormControl(this.defaults.startDate, { nonNullable: true }),
    endDate: new FormControl(this.defaults.endDate, { nonNullable: true }),
    clients: new FormControl(this.defaults.clients, { nonNullable: true }),
    minimum: new FormControl(this.defaults.minimum, { nonNullable: true }),
    maximum: new FormControl(this.defaults.maximum, { nonNullable: true }),
  });
}
