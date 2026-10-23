import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PresentationPreferencesService } from '../../../core/presentation-preferences.service';

type SubmissionState = 'idle' | 'submitting' | 'error';

@Component({
  selector: 'lps-login',
  imports: [ReactiveFormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="min-h-screen bg-canvas text-foreground" [attr.data-theme]="preferences.theme()">
      <section class="grid min-h-screen grid-cols-[minmax(360px,5fr)_minmax(0,7fr)] max-md:block">
        <aside
          class="flex min-h-screen flex-col border-r-4 border-brand bg-black p-[52px] text-white max-md:min-h-0 max-md:border-r-0 max-md:border-b-4 max-md:p-6"
        >
          <img class="w-[178px] max-md:w-[172px]" src="assets/brand/Logo VI.png" alt="Lopes" />
          <div class="mt-auto mb-auto max-md:mt-8 max-md:mb-8">
            <p class="font-accent text-[38px] leading-none text-brand max-md:text-[29px]">
              Decisões com confiança
            </p>
            <h1 class="mt-8 text-xl font-semibold max-md:hidden">Relatórios SAP Business One</h1>
            <p class="mt-3 text-sm text-white/80 max-md:hidden">
              Informação certa, no momento de decidir.
            </p>
          </div>
          <div class="border-t border-[#50505A] pt-3 text-[11px] text-white/80 max-md:hidden">
            LpsHub Reports · Ambiente interno
          </div>
        </aside>
        <section
          class="relative flex min-h-screen items-center justify-center bg-surface px-8 py-20 max-md:min-h-0 max-md:bg-canvas max-md:px-4 max-md:py-5"
        >
          <button
            class="absolute top-[14px] right-[calc(25%-8px)] inline-flex min-h-[36px] min-w-[84px] items-center justify-center rounded-md border border-border bg-surface px-3 text-xs font-semibold hover:bg-subtle max-md:top-5 max-md:right-5"
            type="button"
            (click)="preferences.toggleTheme()"
            [attr.aria-label]="themeLabel()"
          >
            <mat-icon
              class="!mr-1 !h-4 !w-4 !text-base"
              fontSet="material-symbols-outlined"
              aria-hidden="true"
              >{{ preferences.theme() === 'light' ? 'light_mode' : 'dark_mode' }}</mat-icon
            >{{ themeLabel() }}
          </button>
          <form class="w-full max-w-[406px]" [formGroup]="form" (ngSubmit)="submit()" novalidate>
            <h2 class="text-[30px] leading-[1.15] font-bold tracking-[-.6px] max-md:text-[26px]">
              Bem-vindo ao LpsHub
            </h2>
            <p class="mt-3 text-sm text-muted">Entre com suas credenciais corporativas.</p>
            <div class="mt-10 grid gap-6">
              <label class="grid gap-2 text-[13px] font-semibold"
                >Usuário<input
                  class="min-h-[38px] rounded-md border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted"
                  type="text"
                  formControlName="username"
                  autocomplete="username"
                  placeholder="Seu usuário"
                  [attr.aria-invalid]="showFieldError('username')"
                /><span
                  class="text-xs font-normal text-brand"
                  [class.invisible]="!showFieldError('username')"
                  >Informe o usuário.</span
                ></label
              >
              <label class="grid gap-2 text-[13px] font-semibold"
                >Senha
                <div class="relative">
                  <input
                    class="min-h-[38px] w-full rounded-md border border-border bg-surface py-2 pr-20 pl-3 text-sm text-foreground placeholder:text-muted"
                    [type]="passwordVisible() ? 'text' : 'password'"
                    formControlName="password"
                    autocomplete="current-password"
                    placeholder="Sua senha"
                    [attr.aria-invalid]="showFieldError('password')"
                  /><button
                    class="absolute inset-y-0 right-0 px-3 text-xs font-semibold text-muted hover:text-foreground"
                    type="button"
                    (click)="passwordVisible.set(!passwordVisible())"
                  >
                    {{ passwordVisible() ? 'Ocultar' : 'Mostrar' }}
                  </button>
                </div>
                <span
                  class="text-xs font-normal text-brand"
                  [class.invisible]="!showFieldError('password')"
                  >Informe a senha.</span
                ></label
              >
            </div>
            @if (submissionState() === 'error') {
              <div
                class="mt-2 rounded-md border border-brand bg-selected px-3 py-2 text-sm"
                role="alert"
              >
                <strong class="block">Não foi possível entrar.</strong
                ><span class="text-xs text-muted">Confira os dados e tente novamente.</span>
              </div>
            }
            <button
              class="mt-7 inline-flex min-h-[34px] w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-semibold text-on-primary enabled:hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
              type="submit"
              [disabled]="submissionState() === 'submitting'"
            >
              @if (submissionState() === 'submitting') {
                <mat-icon
                  class="animate-spin"
                  fontSet="material-symbols-outlined"
                  aria-hidden="true"
                  >progress_activity</mat-icon
                ><span class="ml-2">Entrando…</span>
              } @else {
                Entrar
              }
            </button>
            <p class="mt-6 text-[11px] text-muted">Acesso interno · Sessão protegida</p>
            @if (contractMissing()) {
              <p class="mt-3 text-xs text-muted">
                A integração de autenticação ainda não foi configurada nesta aplicação.
              </p>
            }
          </form>
        </section>
      </section>
    </main>
  `,
})
export class LoginComponent {
  readonly preferences = inject(PresentationPreferencesService);
  readonly passwordVisible = signal(false);
  readonly submissionState = signal<SubmissionState>('idle');
  readonly submitted = signal(false);
  readonly contractMissing = signal(false);
  readonly themeLabel = computed(() => (this.preferences.theme() === 'light' ? 'Escuro' : 'Claro'));
  readonly form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  showFieldError(controlName: 'username' | 'password'): boolean {
    return this.submitted() && this.form.controls[controlName].invalid;
  }

  submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      return;
    }
    // Não há contrato/serviço de autenticação neste repositório para chamar com segurança.
    this.contractMissing.set(true);
  }
}
