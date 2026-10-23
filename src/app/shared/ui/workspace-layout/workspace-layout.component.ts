import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppShellComponent } from '../app-shell/app-shell.component';

@Component({
  selector: 'lps-workspace-layout',
  imports: [AppShellComponent, RouterOutlet],
  template: '<lps-app-shell><router-outlet /></lps-app-shell>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceLayoutComponent {}
