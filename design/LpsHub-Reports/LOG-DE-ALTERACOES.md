# Registro resumido de alterações / IA

Data: 22/10/2026. Escopo: proposta de design LpsHub Reports, sem alterações no repositório Angular ou em uma conta Figma.

## O que mudou e por quê

- Criados 33 estados de interface, 3 wireframes e foundations para materializar os requisitos da conversa Proposta AGENTS.md.
- Criados 24 componentes de origem e gerador de variantes/instâncias, variáveis e conexões nativas para permitir revisão editável no Figma.
- Criadas 5 áreas de processos com jornada, geração, Matchcode, refinamento/XLSX e arquitetura para o FigJam.
- Criado protótipo HTML com navegação por estados preparados e previews com as fontes originais, para revisão antes da conexão.
- Mantidos logos oficiais e nomes originais. Corrigida a seleção de orientação pelo desenho: VO/VI horizontais, HO/HI verticais.
- Ajustados contraste de controles e texto pequeno, caracteres ausentes na fonte, filtros por coluna e contagens das exportações filtradas.

## Arquivos afetados

`figma-plugin/manifest.json`, `figma-plugin/code.js`, `Prototipo.html`, `design-tokens.json`, `telas-svg/`, `previews/`, `assets/`, `Visao-geral.png`, `LEIA-ME.md` e o pacote ZIP. Scripts intermediários permanecem em work/.

## Validação realizada

- Inspecionados manual, nomes internos e pesos das fontes, licença fornecida e versões transparentes dos logos.
- Revisão visual das telas principais, mobile, validação, busca por coluna e diagrama de Matchcode em PNG.
- Verificação de sintaxe do gerador; referências de componentes e destinos conferidas.
- Execução simulada das chamadas do gerador para Design/FigJam: 24 componentes e 36 conectores de FigJam.
- Navegação das 33 telas e abas do protótipo verificada em simulação local do DOM.
- Contraste branco/vermelho calculado em 4,40:1; botões pequenos adotam preto/branco.

## Pendências e limites

- A integração Figma segue sem instalação/conexão confirmada na última consulta. Nenhum arquivo foi criado na conta do usuário.
- A execução real do plugin e a revisão no editor Figma ainda não ocorreram. A simulação local não substitui essa validação.
- A tentativa de abrir o protótipo em navegador automatizado não concluiu: Chromium do runtime não estava instalado e o Edge encerrou sob o ambiente restrito. Os PNGs foram conferidos diretamente.
- O protótipo demonstra navegação entre estados; não consulta SAP, não edita dados e não gera XLSX real.

## Atualização / Dark mode / 22/10/2026

O quê: 33 telas escuras, 24 variantes de componentes, foundations e tokens escuros; seletor de tema com persistência e manutenção da navegação. Logo oficial branco nos fundos escuros.

Por quê: solicitação explícita do usuário para criar também o dark mode.

Arquivos: Prototipo.html, Darkmode.html, design-tokens.json, figma-plugin/code.js, previews/dark-*.png, telas-svg/dark-*.svg, DS-Dark e pacote ZIP.

Validação: referências de navegação e componentes, sintaxe, simulação local de navegação/geração e revisão visual dos PNGs. Conferido contraste dos pares de texto e superfícies do tema. A execução no editor Figma permanece pendente.

## Atualização / Sidebar / 22/10/2026

O quê: botão Ocultar/Menu no desktop, conteúdo expandido ao recolher a sidebar e preferência salva durante a navegação e entre sessões quando permitido. No mobile, Menu abre um painel sobre a tela e Fechar menu o oculta. Claro/escuro e tela atual são preservados.

Por quê: solicitação do usuário para controlar a visibilidade da barra lateral.

Arquivos: Prototipo.html, Darkmode.html, figma-plugin/code.js, previews/sidebar-*.png, telas-svg/sidebar-*.svg, LEIA-ME.md e ZIP.

Validação: estados de abrir/fechar, navegação, temas e persistência em simulação local; revisão visual dos layouts expandidos e do menu mobile. Figma ainda depende de execução no editor.

## Correção v2 / carregamento de fontes padrão / 22/10/2026

O quê: carregamento aguardado e com cache das fontes atuais e de destino antes de alterar textos e estilos. Aplicado a textos comuns, rótulos de instâncias, estilos de texto, formas e conectores FigJam.

Por quê: nós criados pelo Figma podem usar Inter Medium, que ainda não estava carregada antes da troca para a fonte Lopes. O carregamento das fontes oficiais sozinho não cobria esse caso.

Arquivos: figma-plugin/code.js, COMO-IMPORTAR.md, LOG-DE-ALTERACOES.md e ZIPs; fontes intermediárias em work/plugin-runtime.js e work/verify_project.cjs.

Validação: cenário anterior reproduz o erro Inter Medium na simulação; cenário corrigido completa a geração de Design e FigJam com checagem de fontes carregadas. Conferidas sintaxe e integridade dos ZIPs. Não houve substituição visual das fontes oficiais. A execução real no editor continua pendente.

## Correção / importação sem ID de plugin / 22/10/2026

O quê: removidas as duas chamadas de setPluginData do gerador. As referências das telas continuam em memória para criar as conexões; os metadados privados não eram consumidos. Ajustada a mensagem de erro para falar em conteúdo acrescentado, não em páginas criadas.

Por quê: a importação de desenvolvimento sem ID de plugin falhava ao tentar gravar dados privados.

Arquivos: figma-plugin/code.js, COMO-IMPORTAR.md, LOG-DE-ALTERACOES.md e ZIPs; fontes intermediárias em work/plugin-runtime.js e work/verify_project.cjs.

Validação: verificação de sintaxe e simulação do gerador com setPluginData configurado para lançar o mesmo erro do Figma. Conferidas a ausência dessas chamadas, as referências de navegação e a integridade dos pacotes. A execução real no editor ainda precisa ser repetida.

## Exportação Figma + designer.md / 22/10/2026

O quê: pacote compacto atualizado para importar pelo plugin de desenvolvimento, guia COMO-IMPORTAR.md e designer.md consolidado para orientar a implementação. O guia também foi incluído no pacote completo de revisão.

Por quê: solicitação explícita do usuário para levar o projeto ao Figma e usar o design como base no Codex.

Arquivos: designer.md, COMO-IMPORTAR.md, LOG-DE-ALTERACOES.md e ZIPs completo/compacto.

Validação: existência dos arquivos, manifesto, sintaxe do gerador, quantidades de quadros/componentes e integridade dos ZIPs. Não houve alteração do layout nesta exportação. A execução no editor Figma continua pendente.
