# LpsHub Reports — Guia de design

Versão 1.3 · 23/10/2026 · Interface em português brasileiro.

## 1. Objetivo e referências

Orientar a implementação e a evolução do sistema interno de relatórios SAP Business One em Angular 21, mantendo a identidade Lopes e os comportamentos definidos no protótipo.

Referências deste projeto:

- Conversa “Proposta AGENTS.md”: requisitos e decisões de arquitetura.
- `LOPES_ManualdaMarca_12jun20.pdf`: identidade da marca, especialmente páginas 14–20, 31–36 e 38–43.
- Fontes e logos oficiais fornecidos pelo responsável.
- Protótipo LpsHub Reports: login, temas claro/escuro e sidebar controlada por botão.
- `design-tokens.json`: valores exportados para o pacote de design.

Distinga as origens: cores oficiais, tipografia e regras do logo vêm do manual; neutros, espaçamentos, componentes, dark mode e navegação são decisões de produto. O tema escuro e a sidebar recolhível foram solicitados expressamente pelo usuário.

Este guia complementa as instruções do projeto. Antes de implementar, inspecione o repositório, seus componentes, contratos e dependências. Não transforme exemplos do protótipo em regras de negócio ou contratos de API.

## 2. Direção visual

- Interface limpa, funcional e voltada à leitura de relatórios.
- Vermelho Lopes como assinatura e destaque; superfícies neutras para trabalho prolongado.
- Hierarquia por tipografia, espaçamento e agrupamento, evitando decoração excessiva.
- Rótulos persistentes, mensagens objetivas e ações com nomes claros.
- Mesma organização, recursos e hierarquia nos temas claro e escuro.
- Não introduzir gradientes, novas cores de marca ou outra família tipográfica sem solicitação.
- Não criar gráficos, indicadores ou totais financeiros sem necessidade e origem dos dados definidas.

## 3. Paleta oficial

| Token de marca | Valor |
|---|---|
| Vermelho | `#EB194B` |
| Branco | `#FFFFFF` |
| Preto | `#000000` |
| Laranja | `#FF9169` |
| Amarelo | `#FFBE55` |
| Verde | `#46DCAA` |
| Celeste | `#55E1E6` |
| Azul | `#91BEFF` |

Priorize a paleta principal. Use as cores complementares com propósito, em ambiente que também apresente o vermelho Lopes. Estados devem combinar cor com texto ou ícone.

## 4. Tokens semânticos dos temas

Centralize os valores e faça os componentes consumirem papéis semânticos. Não aplique inversão de cores à tela inteira e não recolora imagens por filtros CSS.

| Papel | Claro | Escuro |
|---|---|---|
| Fundo da aplicação | `#F7F7F7` | `#111113` |
| Superfície de painel, cabeçalho e sidebar | `#FFFFFF` | `#1C1C20` |
| Superfície secundária | `#F1F1F1` | `#27272D` |
| Texto principal | `#000000` | `#F5F5F7` |
| Texto secundário | `#575757` | `#B9B9C3` |
| Borda padrão | `#DCDCDC` | `#50505A` |
| Superfície selecionada | `#FFF0F4` | `#351821` |
| Fundo de ação primária | `#000000` | `#F5F5F7` |
| Texto de ação primária | `#FFFFFF` | `#111113` |
| Hover da ação primária | `#333333` | `#D4D4D8` |

Os neutros escuros são decisões de produto, não novas cores institucionais.

Branco sobre `#EB194B` tem contraste aproximado de 4,40:1. Não usar essa combinação em texto pequeno que exija 4,5:1. No projeto, botões primários usam preto/branco ou claro/escuro; o vermelho permanece na marca e nos destaques grandes. Texto pequeno de erro deve continuar legível, acompanhado de indicação explícita e borda quando necessário.

Preserve texto escuro sobre chips claros de sucesso/aviso, inclusive no dark mode. Não converter automaticamente todo texto para branco.

## 5. Tipografia

- **Lopes Sans**: navegação, formulários, botões, mensagens, tabelas e texto contínuo.
- **Born Ready Upright**: apenas títulos e destaques pontuais; nunca dados tabulares, campos ou parágrafos longos.
- Use os pesos oficiais fornecidos. A família contém Thin, Light, Regular, Medium, SemiBold, Bold e ExtraBold, com itálicos correspondentes.
- Não substituir Lopes Sans por Be Vietnam.
- Não simular pesos ou estilos que não estejam disponíveis.
- Use ícones vetoriais para controles. A fonte fornecida não contém todos os símbolos Unicode; não aceitar quadrados de glifos ausentes nem tratar os símbolos provisórios do protótipo como iconografia final.

Escala de referência:

| Uso | Tamanho / entrelinha |
|---|---|
| Título de página | 30 / 45 px, Bold |
| Título de seção | 20–24 / 30–36 px, Bold |
| Corpo e controles | 14 / 21 px |
| Rótulo | 13 / 20 px, SemiBold |
| Dados de tabela | 12 / 18 px como referência de implementação |
| Legenda | 11 / 16,5 px |
| Destaque gestual | 38 px ou mais, conforme espaço |

O protótipo contém algumas células de 11 px para estudo de densidade. Priorize leitura no produto real e valide a densidade com dados representativos.

As fontes não são redistribuídas pelo pacote. Born Ready foi fornecida com licença Desktop; confirmar licença adequada antes de incorporar como webfont no Angular. O protótipo usa imagens para preservar a aparência sem incorporar a fonte comercial como webfont.

## 6. Logos

Selecione o ativo pelo desenho e pelo fundo, preservando o nome original:

| Arquivo | Orientação visual conferida | Versão |
|---|---|---|
| `Logo VO.png` | Horizontal | Original vermelha |
| `Logo VI.png` | Horizontal | Invertida branca |
| `Logo HO.png` | Vertical | Original vermelha |
| `Logo HI.png` | Vertical | Invertida branca |

Os nomes recebidos divergem da orientação visual. Não renomear os originais silenciosamente. Se criar aliases de implementação, documente o mapeamento.

- Logo vermelho sobre fundos claros; branco oficial sobre fundos escuros.
- Preservar proporção, transparência e opacidade original.
- Manter área livre igual ou superior ao raio do círculo do símbolo.
- Não reconstruir com texto, recolorir, distorcer, rotacionar ou reorganizar elementos.
- Usar o símbolo isolado somente em ambiente que também apresente a assinatura completa.
- Ao ocultar a sidebar, manter a assinatura completa no cabeçalho.

## 7. Layout e responsividade

Referências de desenho: desktop de 1440 px, sidebar de 240 px e cabeçalho de 72 px; mobile de 390 px de largura. Esses valores orientam o layout e não autorizam transformar a página em imagem ou canvas.

- Base de espaçamento: 4 px; escala 4, 8, 12, 16, 24, 32, 48 e 64 px.
- Raio: controles 6 px; cards 8 px; diálogos 12 px.
- Controles principais com altura de referência entre 44 e 48 px. Botões compactos do cabeçalho aparecem com 36 px no estudo; garantir área de toque adequada na implementação.
- Conteúdo em agrupamentos claros, com cabeçalhos e ações previsíveis.
- Dimensionar formulários por espaço disponível; reduzir colunas antes de comprimir rótulos e valores.
- Tabelas largas podem rolar horizontalmente. Não esconder colunas ou ações essenciais sem indicar como acessá-las.
- Não tornar toda a página horizontalmente rolável para acomodar a tabela.
- Preservar posicionamento e funcionamento dos controles ao mudar tema ou sidebar.

## 8. Sidebar recolhível

### Desktop

1. A sidebar começa visível quando não há preferência salva.
2. O botão **Ocultar**, no cabeçalho, recolhe a sidebar.
3. O conteúdo utiliza a largura liberada, com redistribuição do layout; não esticar fontes, logos ou ícones.
4. O botão **Menu** permanece visível e restaura a sidebar.
5. Manter a tela, os filtros, a ordenação e o tema durante a alternância.
6. Preservar a preferência durante a navegação e salvá-la quando o armazenamento local estiver disponível.

### Mobile

- A navegação começa fechada e abre como painel sobre o conteúdo pelo botão **Menu**.
- Oferecer **Fechar menu**, fechamento por Escape e por clique no fundo, devolvendo o foco ao acionador.
- Conter o foco dentro do painel enquanto estiver aberto e impedir interação com o fundo.
- Fechar o painel ao selecionar um destino.
- Manter o acionador acessível sem depender de hover.

No produto, implementar semântica de navegação, `aria-expanded`, associação ao painel e foco visível. O painel mobile é um overlay; o desktop recolhível redistribui a área do conteúdo. O protótipo demonstra estados preparados e não comprova todas as interações de acessibilidade.

## 9. Troca de tema

- Oferecer controle claro de tema no cabeçalho.
- Aplicar o tema a superfícies, bordas, textos, modais, controles e tabela.
- Preservar a tela atual, a sidebar e os valores preenchidos ao trocar.
- Salvar a preferência quando possível; falhas de armazenamento não podem impedir o uso.
- Evitar clarão de tema incorreto durante a inicialização.
- Logos oficiais devem acompanhar o tema, preservando suas cores e proporções.
- Não usar dark mode como justificativa para reduzir contraste ou retirar estados de foco.

## 10. Componentes e estados

Reutilize componentes existentes compatíveis antes de criar novos. O pacote possui 24 componentes de origem por tema, totalizando 48:

| Família | Estados / responsabilidade |
|---|---|
| Button | Primary, Primary Hover, Disabled, Secondary e Ghost |
| Input | Default, Focus, Error e Disabled |
| Chip | Selected, Neutral, Success e Warning |
| Alert | Info, Success, Warning e Error |
| Checkbox | Unchecked, Checked e Mixed |
| Table | Header e Row |
| Navigation | Item selecionado |
| Pagination | Navegação de páginas |

Complementos de comportamento exigidos no produto:

- Botões: padrão, hover, foco, carregamento e desabilitado; evitar envio duplicado.
- Campos: rótulo permanente, ajuda, erro próximo e valor preservado.
- Diálogos: título, fechamento, confirmação clara e retorno do foco.
- Tabelas: ordenação perceptível, estado vazio, quantidade de linhas e alcance da busca.
- Alertas: mensagem com próximo passo, sem depender apenas de cor.
- Preferir auto layout, componentes e tokens a duplicações soltas.

## 11. Telas e navegação

Fluxo principal:

`Login → Catálogo → Configurar filtros → Matchcode opcional → Revisar lista → Aplicar seleção → Gerar → Resultado → Refinar/organizar → Confirmar exportação → Sucesso`.

Cobrir também:

- Datas únicas, por intervalo e múltiplas datas.
- Seleção de empresas e tipos de documento.
- Clientes específicos, múltiplos e por intervalo.
- Carregamento, validação de período, ausência de resultados e falha na consulta.
- Sessão expirada com retorno à tela de login ligada ao fluxo de autenticação existente.
- Busca por coluna, filtro por data e organização de colunas.
- Exportação coerente com o conjunto filtrado, inclusive após refinamento.

Contas a receber é o relatório demonstrativo. Nomes, empresas, clientes, documentos e valores do protótipo são fictícios. Não apresentar categorias demonstrativas como funcionalidades prontas nem encaminhar todo relatório para o mesmo relatório real.

### Login

- Referências: `previews/00.png`, `dark-00.png`, `00e.png`, `dark-00e.png`, `00m.png` e `dark-00m.png`. O login não exibe sidebar.
- Campos obrigatórios **Usuário** e **Senha**, botão **Mostrar/Ocultar senha** e ação **Entrar**. Não oferecer cadastro nem recuperação de senha nesta interface.
- Implementar submissão por teclado, foco visível, rótulos associados, estado de envio e bloqueio de submissão duplicada. O estado `00e` demonstra uma mensagem genérica de falha; não indicar qual credencial estava incorreta.
- Após sucesso, navegar ao catálogo. Em sessão expirada, retornar ao login; preservar destino anterior apenas se a política atual do produto permitir.
- Reutilizar o serviço, o guard e o contrato de autenticação existentes. A sessão permanece em cookie HttpOnly; não expor o cookie nem persistir senha ou token no armazenamento local.
- O botão Entrar do protótipo só navega para a próxima tela. Ele não autentica. O estado de erro é selecionável no protótipo e no pacote Figma.

## 12. Filtros, Matchcode e resultados

### Antes de gerar: consulta à API

- Datas de calendário: única, intervalo inclusivo e múltiplas datas, inclusive de anos distintos.
- Valores em BRL, com apresentação separada da representação exigida pela API.
- Empresas com opção Todas limitada às autorizações existentes.
- Clientes específicos, múltiplos ou por intervalo, conforme contrato.
- Tipos de documento disponíveis para o relatório.
- Campos e modos definidos pelos metadados do Report Engine.

Validar intervalos e modos incompatíveis. Preservar zeros à esquerda. Não inventar valores especiais para Todas, limites, endpoints ou campos. Não deslocar datas sem horário por conversão de fuso.

### Matchcode

- Aceitar colagem de planilhas com linhas e tabulações.
- Mostrar valores reconhecidos, duplicados e erros antes da aplicação.
- Permitir corrigir, remover, cancelar e limpar; nunca descartar entradas silenciosamente.
- Preservar códigos como texto e seus zeros iniciais.
- Separadores adicionais e limites dependem do contrato.
- Aplicar valores estruturados; não enviar o texto bruto da área de colagem.

### Depois de gerar: resultado carregado

- Busca global, busca específica por coluna e filtros compatíveis com o tipo do dado.
- Ordenação por valores reais; valores monetários e datas não são comparados pelo texto formatado.
- Reordenação de colunas com alternativa por teclado.
- Informar quantidade exibida e quantidade carregada.
- Manter o resultado original separado do estado de visualização.
- Alterações locais não disparam nova consulta, salvo relatório com processamento remoto explicitamente definido.
- Se o carregamento for parcial, informar esse alcance; não sugerir busca na base inteira.

### XLSX

Exportar todas as linhas após os filtros do resultado, na ordenação e disposição de colunas exibidas, incluindo linhas fora da página atual. Confirmar a quantidade correta. Preservar códigos como texto, valores monetários como números e datas sem deslocamento. Não truncar silenciosamente nem gerar CSV com extensão XLSX. Evitar interpretação de conteúdo externo como fórmula.

## 13. Acessibilidade e conteúdo

- Alvo de implementação: contraste de texto normal de pelo menos 4,5:1; texto grande e elementos gráficos relevantes de pelo menos 3:1.
- Verificar as combinações reais, inclusive bordas necessárias para identificar campos e estados de foco; os PNGs não comprovam conformidade.
- Navegação por teclado, ordem de foco coerente e foco visível, sem armadilhas.
- Preferir elementos HTML semânticos, rótulos associados e nomes acessíveis.
- Usar tabela semântica quando adequada; ordenação, filtros e paginação devem ser anunciáveis.
- Comunicar carregamento e conclusão sem deslocar o foco indevidamente.
- Não depender de cor, hover ou arraste como único meio de interação.
- Preservar filtros após falhas e diferenciar erro de consulta vazia.
- Não exibir credenciais, cookies ou payloads financeiros completos em mensagens ou logs.

## 14. Limites técnicos e de implementação

- Angular 21; Feature-Based + Modular Monolith + Clean Architecture simplificada.
- Separar presentation, application, domain e infrastructure conforme necessidade real.
- Domínio sem dependência de Angular ou HTTP; shared não depende de features.
- Report Engine com metadados tipados e registro conhecido de componentes/adaptadores; nunca executar código recebido da API.
- Preferir componentes standalone, Reactive Forms tipados, Signals para estado de interface e RxJS para fluxos assíncronos, conforme a base existente.
- Autenticação por cookies HttpOnly já resolvida: conectar a nova interface de login ao fluxo existente e não criar armazenamento local de tokens.
- Apenas preferências de apresentação, como tema e sidebar, podem usar armazenamento local neste escopo.
- O navegador acessa a API da aplicação; não recebe credenciais SAP nem consulta o Service Layer diretamente.
- Usar HTML/CSS e componentes funcionais na implementação. Os PNGs, SVGs e hotspots do pacote servem de referência visual, não de interface final.
- Escolher bibliotecas de tabela, ícones e XLSX após conferir as dependências e licenças existentes.

## 15. Validação e registro das alterações

Para cada entrega, verificar o fluxo afetado em claro/escuro, desktop/mobile e sidebar aberta/fechada. Conferir logos, fontes, legibilidade, sobreposições, teclado e preservação de estado. Executar as verificações existentes pertinentes à alteração e declarar apenas as que realmente ocorreram.

Testar regras críticas quando alteradas: filtros e payloads, datas, BRL, Matchcode, ordenação e escopo de exportação. Não conectar dados fictícios à API por suposição.

Toda alteração de código feita pela IA deve ter um registro resumido no local de log existente do projeto. Se não houver, usar um arquivo de alterações acordado no repositório. Registrar:

```text
Data:
O que mudou:
Por quê:
Arquivos afetados:
Validações realizadas e resultado:
Pendências ou limitações:
```

Não incluir segredos ou dados pessoais nesse registro. Ao concluir, informar o comportamento entregue, a validação realizada e as limitações relevantes.

## 16. Estado do material entregue

O pacote contém 36 estados de tela em cada tema, incluindo três estados de login. As 33 telas internas por tema têm alternativas de sidebar/menu, totalizando 138 quadros geráveis, 48 componentes de origem, 4 wireframes, 2 foundations e 5 áreas de processos para FigJam.

O gerador produz camadas, componentes, variantes, variáveis e conexões de navegação no editor. É um plugin de desenvolvimento, não um arquivo `.fig`. Sua execução real e revisão no Figma permanecem pendentes; verificações locais e simulações não substituem essa etapa.

O protótipo local navega entre estados preparados. Não implementa consultas SAP, edição real dos filtros, arraste real ou geração real de XLSX. Esses comportamentos são requisitos do produto, não funcionalidades comprovadas pelo protótipo.
