# Histórico de alterações feitas por IA

### 2026-10-23 02:44:00 -03:00 — Preparação do versionamento da aplicação

- Autor: IA — /root.
- Arquivos/áreas: `.gitignore`.
- Alteração: incluídos os diretórios locais `.angular` e `dist` nas exclusões do Git.
- Motivo: impedir o versionamento de cache e artefatos gerados pelo build.
- Validação: `git status` revisado antes do commit.

### 2026-10-23 02:37:00 -03:00 — Correção da rota inicial

- Autor: IA — /root.
- Arquivos/áreas: `src/app/app.routes.ts`.
- Alteração: movido o redirecionamento da raiz para o nível superior das rotas, antes do layout interno.
- Motivo: a rota `/` ativava o shell do workspace sem conteúdo, pois o redirecionamento estava como filho do layout.
- Validação: `npm run build` concluído com sucesso; acesso a `/` validado com redirecionamento para `/login`.

### 2026-10-23 02:30:00 -03:00 — Tela de login responsiva

- Autor: IA — /root.
- Arquivos/áreas: rotas, layout do workspace e `features/authentication/presentation/login.component.ts`.
- Alteração: incluída tela de login clara/escura, responsiva e sem sidebar, com formulário tipado, validação de campos, mostrar/ocultar senha, estado de envio preparado e mensagem genérica de erro.
- Motivo: implementar a interface de login a partir dos previews fornecidos e separar a rota pública do shell interno.
- Validação: `npm run build` concluído com sucesso; revisão visual local em claro e escuro, além de validação de campos obrigatórios e alternância Mostrar/Ocultar senha.
- Impactos/pendências: não existe serviço, guard, interceptor nem contrato HTTP de autenticação neste repositório. Por isso, a tela não efetua login, não redireciona após sucesso e não trata expiração de sessão; a integração depende do contrato real da aplicação.

### 2026-10-23 02:18:00 -03:00 — Ícone de abertura no catálogo

- Autor: IA — /root.
- Arquivos/áreas: `src/app/features/reports/presentation/report-catalog.component.ts`.
- Alteração: substituído o caractere `›` do link de abertura pelo `mat-icon` `arrow_outward`.
- Motivo: alinhar a ação do catálogo ao conjunto de ícones Angular Material adotado.
- Validação: não executada; alteração pontual de template.

### 2026-10-23 02:08:00 -03:00 — Ícones Angular Material no cabeçalho

- Autor: IA — /root.
- Arquivos/áreas: `package.json`, `src/index.html` e `src/app/shared/ui/app-shell/app-shell.component.ts`.
- Alteração: adicionados Angular Material e `mat-icon`; controles de menu/sidebar e tema agora usam `menu`, `close_small`, `dark_mode` e `light_mode`.
- Motivo: substituir os nomes dos controles pelos ícones Material Symbols solicitados, mantendo rótulos acessíveis via `aria-label` e `title`.
- Validação: `npm run build` concluído com sucesso.

### 2026-10-23 02:02:00 -03:00 — Carregamento das fontes oficiais

- Autor: IA — /root.
- Arquivos/áreas: `angular.json` e `src/styles.css`.
- Alteração: configurada a cópia de `src/assets` para a distribuição e declaradas as fontes oficiais Lopes Sans por peso/estilo e Born Ready Upright com `@font-face`.
- Motivo: os TTFs fornecidos não estavam mapeados como ativos Angular nem eram referenciados por CSS, então o navegador usava o fallback.
- Validação: `npm run build` concluído com sucesso; todos os TTFs foram confirmados em `dist/lpshub-reports/browser/assets/fonts`.

### 2026-10-23 01:53:00 -03:00 — Correção de texto no tema escuro

- Autor: IA — /root.
- Arquivos/áreas: `src/styles.css`.
- Alteração: aplicada explicitamente a cor de texto do token semântico ao host que recebe `data-theme`.
- Motivo: o tema era alternado no componente Angular, enquanto o `body` mantinha a cor clara herdada, deixando textos pretos no tema escuro.
- Validação: `npm run build` concluído com sucesso.

### 2026-10-23 01:50:00 -03:00 — Migração de SCSS para Tailwind CSS

- Autor: IA — /root.
- Arquivos/áreas: `package.json`, `angular.json`, `.postcssrc.json`, `src/styles.css` e componentes de apresentação.
- Alteração: removido o stylesheet SCSS e migrados os estilos de layout e componentes para utilitários Tailwind CSS v4, preservando os tokens de tema Lopes no CSS global do Tailwind.
- Motivo: substituir completamente SCSS por Tailwind CSS conforme solicitado.
- Validação: `npm run build` concluído com sucesso; nenhuma fonte `.scss` permaneceu fora de dependências e artefatos de build.

### 2026-10-23 01:35:02 -03:00 — Fundação visual Angular do LpsHub Reports

- Autor: IA — /root.
- Arquivos/áreas: configuração Angular, `src/app`, `src/styles.scss` e `package.json`.
- Alteração: criada uma aplicação Angular 21 standalone com shell reutilizável, temas claro/escuro persistidos, sidebar desktop recolhível, catálogo, formulário demonstrativo de filtros e tabela de resultados com busca local.
- Motivo: implementar as referências visuais fornecidas sem criar autenticação ou contratos de API fictícios.
- Validação: inspeção visual dos previews de referência e da prévia local realizada; `npm install` e build de produção Angular concluídos com sucesso.
- Impactos/pendências: não há fontes web licenciadas no pacote; a tipografia usa fallback até a licença/arquivos adequados serem disponibilizados. Integração de API, Matchcode e exportação XLSX permanecem fora deste escopo visual.

### 2026-10-23 08:50:19 -03:00 — Padronização automática de formatação

- Autor: IA — /root.
- Arquivos/áreas: fontes em `src`, configurações raiz, `package.json`, `package-lock.json` e documentação operacional.
- Alteração: adicionado Prettier 3.7.4, scripts `format` e `format:check`, configuração compartilhada e aplicada a todo o código e às configurações textuais do projeto; referências visuais em `design/` foram preservadas.
- Motivo: padronizar a formatação do código conforme solicitado.
- Validação: `npm run format`, `npm run format:check` e `npm run build` concluídos com sucesso.
