# AGENTS.md — LpsHub Reports Angular

## 1. Objetivo e escopo

Desenvolver o sistema interno de relatórios SAP Business One em Angular 21, com componentes reutilizáveis, contratos explícitos com a API e identidade visual Lopes.

Decisões obrigatórias:

- Arquitetura Feature-Based, Modular Monolith e Clean Architecture simplificada.
- Report Engine orientado a metadados.
- Filtros pré-geração enviados à API.
- Filtros pós-geração aplicados aos resultados disponíveis.
- Autenticação existente por cookies HttpOnly.
- Identidade visual conforme o Manual da Marca Lopes.

Não migrar a versão principal do Angular, substituir a arquitetura ou redesenhar a autenticação sem solicitação explícita.

## 2. Organização e dependências

Organizar o código por funcionalidades de negócio.

| Área proposta | Responsabilidade |
| --- | --- |
| `core` | Configuração global, comunicação HTTP e integração com a sessão existente |
| `shared/ui` | Componentes visuais genéricos e identidade visual |
| `shared/utils` | Funções puras de uso transversal |
| `report-engine` | Metadados, filtros dinâmicos, tabela e exportação |
| `features/<feature>` | Páginas, regras e integrações específicas de cada funcionalidade |

Dentro de uma funcionalidade, criar as camadas conforme a necessidade:

- `domain`: modelos e regras puras, sem dependência de Angular ou HTTP.
- `application`: casos de uso, coordenação e contratos necessários.
- `infrastructure`: implementação HTTP, DTOs e adaptadores.
- `presentation`: componentes, páginas, formulários e estado de interface.

Regras de dependência:

- A apresentação utiliza a camada de aplicação.
- A infraestrutura implementa os contratos necessários à aplicação.
- O domínio não importa infraestrutura ou apresentação.
- Funcionalidades não importam detalhes internos umas das outras.
- `shared` não depende de funcionalidades.
- Não criar interfaces, repositórios ou camadas que apenas repassem chamadas sem benefício concreto.
- Não transformar `core` ou `shared` em depósitos de código sem responsabilidade definida.

O monólito modular corresponde a uma aplicação única com limites internos claros. Não implica utilizar `NgModule` para representar cada módulo de negócio.

## 3. Normas de código Angular e TypeScript

- Utilizar TypeScript em modo estrito.
- Preferir componentes standalone e carregamento de rotas por funcionalidade.
- Utilizar Signals para estado síncrono de interface e valores derivados.
- Utilizar RxJS para fluxos assíncronos, cancelamento e composição de requisições.
- Adotar Reactive Forms tipados para os formulários dinâmicos.
- Utilizar `HttpClient` e concentrar comportamentos transversais em interceptadores funcionais.
- Evitar assinaturas aninhadas e liberar assinaturas vinculadas ao ciclo de vida.
- Manter templates declarativos e componentes com responsabilidades claras.
- Não executar processamento pesado repetidamente a partir de expressões do template.
- Evitar `any`; validar dados externos antes de utilizá-los.
- Não introduzir APIs experimentais sem necessidade documentada.

Convenções:

- Arquivos e diretórios em `kebab-case`.
- Variáveis e funções em `lowerCamelCase`.
- Tipos e classes em `PascalCase`.
- Identificadores técnicos em inglês; textos de interface em português brasileiro.
- Preservar exatamente os nomes dos campos dos contratos externos.
- Comentar decisões e regras de negócio; evitar comentários que apenas repitam o código.

## 4. Report Engine

Cada relatório deve ser descrito por uma definição tipada contendo, conforme necessário:

- Identificador, título e descrição.
- Adaptador de consulta e contrato da API.
- Filtros, modos de seleção e validações.
- Mapeamento entre formulário e payload.
- Colunas, tipos, formatação e ordenação inicial.
- Recursos de tabela e exportação.

Os metadados devem utilizar tipos discriminados e um registro conhecido de componentes e adaptadores.

Não utilizar `eval`, execução de código recebido da API ou nomes arbitrários de componentes enviados pelo servidor.

O Engine deve oferecer o comportamento comum. Regras específicas pertencem à definição ou ao adaptador do relatório.

Não implementar um interpretador genérico de SQL ou transferir cálculos contábeis da API para o navegador.

## 5. Filtros pré-geração

Os filtros pré-geração definem a consulta enviada à API.

| Tipo | Comportamento obrigatório |
| --- | --- |
| Datas | Data unitária, intervalo inclusivo e múltiplas datas não contíguas, inclusive de anos diferentes |
| Valores | Entrada e exibição em BRL, conforme precisão e representação exigidas pela API |
| Empresas | Seleção conforme contrato, incluindo opção “Todas” |
| Clientes | Seleção específica, múltipla e por intervalo, quando suportadas pelo relatório |
| Documentos | Seleção dos tipos disponibilizados pelo contrato |
| Matchcode | Colagem de listas para preenchimento e envio de valores à API |

Regras:

- Os modos de seleção devem ser explícitos.
- Não enviar modos incompatíveis simultaneamente quando o contrato os tratar como alternativas.
- Não inventar nomes de campos, operadores ou valores especiais.
- A opção “Todas” deve ser convertida conforme o contrato; nunca presumir que a API aceita essa palavra.
- Distinguir ausência, `null`, lista vazia e zero conforme a API.
- Preservar códigos e zeros à esquerda.
- Validar limites inicial e final segundo as regras do relatório.
- Representar datas sem horário como datas de calendário, evitando deslocamento por fuso.
- Separar apresentação monetária da representação enviada à API.
- Não realizar cálculos financeiros com arredondamento implícito.

Enviar os filtros pela API da aplicação. O navegador não deve acessar diretamente o Service Layer nem receber credenciais SAP.

## 6. Matchcode

O Matchcode deve:

- Aceitar valores colados de planilhas e listas.
- Reconhecer quebras de linha e tabulações.
- Aceitar separadores adicionais somente quando previstos para o campo.
- Remover espaços externos sem alterar o conteúdo significativo.
- Preservar zeros à esquerda.
- Apresentar os valores reconhecidos e os erros antes da aplicação.
- Permitir corrigir, remover e limpar entradas.
- Informar duplicidades; remover duplicados apenas quando não alterar a semântica do filtro.
- Aplicar limites definidos pelo contrato ou pela capacidade documentada da aplicação.
- Enviar valores estruturados, nunca o texto bruto da colagem.

Para datas, utilizar formatos explicitamente aceitos e rejeitar interpretações ambíguas. Não depender do parsing automático de datas do JavaScript.

## 7. Tabelas e filtros pós-geração

Toda tabela de relatório deve oferecer:

- Busca global.
- Busca específica por coluna.
- Filtros compatíveis com o tipo de cada coluna.
- Ordenação tipada.
- Reordenação de colunas.
- Exportação XLSX.

Regras:

- Manter o resultado original separado do estado de visualização.
- Comparar números e datas pelos valores reais, não pelos textos formatados.
- Definir o comportamento de valores nulos.
- Combinar os filtros de maneira previsível e informar a quantidade de registros exibidos.
- Manter filtros pré-geração e pós-geração visualmente distintos.
- Não disparar uma nova consulta por alterações locais, salvo quando o relatório declarar processamento remoto.
- Se apenas parte dos dados estiver carregada, informar esse alcance e não apresentar a busca local como pesquisa da base completa.
- Preservar corretamente as linhas durante ordenação e reordenação.

Paginação e virtualização são decisões de apresentação e desempenho. Não devem ocultar a existência de resultados ou alterar silenciosamente o escopo da consulta.

## 8. Exportação XLSX

O padrão é exportar o conjunto completo resultante dos filtros pós-geração, na ordenação e disposição de colunas exibidas, incluindo registros fora da página visível.

- Preservar códigos como texto.
- Exportar valores monetários como números com formatação BRL.
- Preservar datas sem deslocamento de calendário.
- Distinguir células vazias de valores zero.
- Tratar conteúdo externo como dados, impedindo sua interpretação involuntária como fórmula.
- Não gerar CSV com extensão `.xlsx`.
- Informar quando o volume ultrapassar a capacidade da exportação.
- Não truncar resultados silenciosamente.

A biblioteca XLSX será definida após inspeção das dependências e licenças do projeto.

## 9. Integração e autenticação

A autenticação por cookies HttpOnly já está resolvida.

- Reutilizar o fluxo e os endpoints existentes.
- Não criar armazenamento de tokens em `localStorage` ou `sessionStorage`.
- Não tentar ler cookies HttpOnly pelo JavaScript.
- Configurar o envio de credenciais somente para os destinos previstos.
- Preservar os mecanismos existentes de proteção das requisições.
- Tratar expiração da sessão conforme o contrato atual.
- Não repetir automaticamente operações de escrita.
- Não registrar senhas, cookies, credenciais ou payloads financeiros completos no console.

Permissões e acesso por empresa devem ser validados pela API. Controles de interface não substituem autorização no servidor.

## 10. Identidade visual Lopes

O documento `LOPES_ManualdaMarca_12jun20.pdf` é a referência obrigatória de identidade visual.

As regras abaixo derivam especialmente das páginas 14–20, 31–36 e 38–43. Requisitos de interação e acessibilidade deste projeto complementam o manual; não devem ser atribuídos a ele.

### Tipografia

- Utilizar Lopes Sans na interface, formulários, tabelas, navegação e textos.
- Utilizar Born Ready Upright apenas em títulos e destaques pontuais.
- Não utilizar Born Ready em dados tabulares, campos ou textos longos.
- Utilizar apenas os pesos efetivamente fornecidos.
- Não substituir Lopes Sans por Be Vietnam, apesar da origem descrita no manual.
- Conferir nomes internos, pesos e permissões antes de converter ou distribuir as fontes em formato web.

### Cores

| Papel | Cor | Hexadecimal |
| --- | --- | --- |
| Principal | Vermelho | `#EB194B` |
| Principal | Branco | `#FFFFFF` |
| Principal | Preto | `#000000` |
| Complementar | Laranja | `#FF9169` |
| Complementar | Amarelo | `#FFBE55` |
| Complementar | Verde | `#46DCAA` |
| Complementar | Celeste | `#55E1E6` |
| Complementar | Azul | `#91BEFF` |

- Priorizar a paleta principal.
- Utilizar as cores secundárias como complemento, em ambiente onde o vermelho esteja presente.
- Centralizar as cores em tokens.
- Não introduzir uma paleta alternativa, gradientes ou tema escuro por iniciativa própria.
- Não criar tonalidades de interação sem justificar sua relação com a identidade e verificar legibilidade.
- Comunicar estados também por texto ou ícone.

### Logos

Preservar a convenção informada pelo responsável:

| Arquivo | Versão declarada |
| --- | --- |
| `Logo HI.png` | Horizontal invertida, branca |
| `Logo VI.png` | Vertical invertida, branca |
| `Logo HO.png` | Horizontal original |
| `Logo VO.png` | Vertical original |

Antes da implementação, conferir a orientação visual dos arquivos devido à divergência observada nos metadados.

- Utilizar os arquivos oficiais, preservando proporções.
- Selecionar a versão apropriada ao fundo e ao contraste.
- Respeitar margem de segurança igual ou superior ao raio do círculo existente no símbolo.
- Não rotacionar, distorcer, recolorir, alterar opacidade ou reorganizar elementos.
- Não reconstruir o logo com texto, CSS ou ícones.
- Utilizar o símbolo isolado somente em ambiente que também apresente a assinatura completa.
- Não confundir a versão branca invertida com uma autorização geral para aplicação monocromática.

### Linguagem visual

- Priorizar leitura e operação dos relatórios.
- Utilizar grafismos gestuais apenas quando servirem ao conteúdo.
- Não utilizar fotografias ilustrativas do manual como ativos do sistema.
- Componentes de terceiros devem receber a identidade Lopes; o tema padrão da biblioteca não define a aparência do produto.

## 11. Experiência e acessibilidade

- Utilizar rótulos persistentes, instruções objetivas e erros próximos aos campos.
- Garantir navegação por teclado e foco visível.
- Oferecer alternativa acessível ao arraste de colunas.
- Verificar contraste das combinações efetivamente utilizadas.
- Apresentar estados de carregamento, vazio, erro e sucesso.
- Preservar os filtros preenchidos quando uma consulta falhar.
- Distinguir “nenhum resultado” de falha na consulta.
- Evitar requisições duplicadas e resultados antigos sobrescrevendo consultas recentes.
- Permitir uso em telas menores sem esconder ações essenciais.

## 12. Validação e conclusão das alterações

Para cada alteração:

- Inspecionar os arquivos e comandos existentes antes de editar.
- Respeitar o escopo solicitado e preservar alterações do usuário.
- Executar build, verificações de tipos, lint e testes aplicáveis que existam no projeto.
- Não declarar verificações que não foram executadas.
- Testar regras críticas: payloads, datas, intervalos, Matchcode, precisão monetária e exportação.
- Revisar visualmente componentes alterados, incluindo logos e fontes.
- Registrar o resumo obrigatório da alteração conforme a seção 14.
- Informar comportamento entregue, validação realizada e limitações relevantes.

Não adicionar bibliotecas, frameworks de estado ou abstrações extensas sem avaliar primeiro os recursos existentes.

## 13. Pendências antes da implementação

- Conferir visualmente a correspondência entre nomes e orientações dos logos.
- Inspecionar os arquivos internos e as condições de uso das fontes.
- Identificar caminhos definitivos dos ativos no projeto.
- Inspecionar o repositório e seus comandos.
- Confirmar contratos de cada relatório e significado de “Todas”.
- Definir bibliotecas de componentes, tabela e XLSX conforme requisitos, dependências e licenças.

Essas pendências não autorizam substituir ativos oficiais ou presumir contratos.

## 14. Registro obrigatório das alterações feitas por IA

Qualquer alteração de código feita por uma IA deve ter um registro resumido e persistente das modificações. A tarefa só estará concluída após a inclusão desse registro.

- Utilizar o arquivo de histórico de alterações de IA já existente no projeto. Se não houver um local definido, utilizar `docs/ai-changes.md`, criando-o na primeira alteração de código autorizada.
- Acrescentar uma entrada por tarefa ou conjunto coerente de alterações, incluindo todos os arquivos e comportamentos afetados. Não é necessário registrar cada edição intermediária.
- Preservar as entradas anteriores; não sobrescrever o histórico.
- Registrar criações, modificações, remoções e refatorações de código, assim como alterações de configuração ou dependências que afetem o sistema.
- Manter o registro curto, objetivo e em português brasileiro. Não copiar diffs completos, código ou raciocínio interno da IA.
- Não incluir credenciais, cookies, dados pessoais ou dados financeiros sensíveis.
- O resumo da resposta final deve acompanhar o registro persistente, sem substituí-lo.

Cada entrada deve conter:

- Data e hora com fuso horário explícito.
- Autor: IA e identificação do agente, quando disponível, sem inventar informações.
- Arquivos ou áreas afetadas.
- O que foi modificado, em poucas frases.
- Por que a mudança foi necessária.
- Validações executadas e respectivos resultados; indicar explicitamente quando não executadas.
- Impactos ou pendências relevantes, quando houver.

Modelo resumido:

```markdown
### <data e hora com fuso> — <título da alteração>

- Autor: IA — <agente, quando disponível>.
- Arquivos/áreas: <caminhos ou áreas afetadas>.
- Alteração: <resumo do que mudou>.
- Motivo: <objetivo ou problema resolvido>.
- Validação: <verificações e resultados, ou não executadas>.
- Impactos/pendências: <somente quando houver>.
```
