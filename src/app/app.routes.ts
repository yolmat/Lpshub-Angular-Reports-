import { Routes } from '@angular/router';
import { ReportCatalogComponent } from './features/reports/presentation/report-catalog.component';
import { ReportFiltersComponent } from './features/reports/presentation/report-filters.component';
import { ReportResultsComponent } from './features/reports/presentation/report-results.component';
import { LoginComponent } from './features/authentication/presentation/login.component';
import { WorkspaceLayoutComponent } from './shared/ui/workspace-layout/workspace-layout.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, title: 'Entrar | LpsHub' },
  { path: '', component: WorkspaceLayoutComponent, children: [
    { path: 'relatorios', component: ReportCatalogComponent, title: 'Relatórios | LpsHub' },
    { path: 'relatorios/contas-a-receber/filtros', component: ReportFiltersComponent, title: 'Filtros | LpsHub' },
    { path: 'relatorios/contas-a-receber/resultados', component: ReportResultsComponent, title: 'Contas a receber | LpsHub' }
  ] },
  { path: '**', redirectTo: 'login' }
];
