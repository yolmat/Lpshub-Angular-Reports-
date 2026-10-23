# LpsHub Reports / Projeto de design Lopes

Preparado em 22/10/2026. Base: conversa “Proposta AGENTS.md” e arquivos da marca fornecidos.

## O que está pronto localmente

- 33 telas e estados desktop/mobile, 3 wireframes e foundations.
- 24 componentes de origem com variantes: Button (5), Input (4), Chip (4), Alert (4), Checkbox (3), Table (2), Navigation (1), Pagination (1).
- 5 áreas de processos: jornada, geração, Matchcode, refinamento/exportação e arquitetura.
- Protótipo HTML navegável offline, previews PNG, SVGs e tokens JSON.
- Gerador de componentes, variáveis, telas e conexões nativas para Figma Design; formas e conectores nativos para FigJam.

Os arquivos ainda não foram criados numa conta Figma. O gerador precisa ser executado no editor, ou a conexão Figma deve ser concluída para continuar por esta conversa. Este pacote não é um arquivo .fig.

## Revisão imediata

Abra `Prototipo.html` no navegador. O seletor superior permite revisar todos os estados; “Mostrar cliques” destaca as áreas interativas. A aba Fluxos mostra os 5 diagramas; Design System mostra as foundations. A navegação usa estados preparados: campos não aceitam edição e a exportação não produz uma planilha real.

## Criar no Figma Design e no FigJam

1. Extraia este pacote. Instale no computador os arquivos originais de Lopes Sans (Regular, Medium, SemiBold, Bold) e Born Ready Upright fornecidos pelo responsável. Use o Figma desktop para que as fontes locais estejam acessíveis.
2. No Figma, abra um arquivo de Design e importe `figma-plugin/manifest.json` como plugin de desenvolvimento. Se o editor solicitar um ID, crie um plugin local e mantenha o ID gerado pelo Figma no manifesto.
3. Execute “LpsHub Reports • Lopes”. Ele adiciona seis seções na página atual: Leia-me, Foundations, Components, Wireframes, Interfaces e protótipo, Handoff. Não apaga conteúdo existente. As telas contêm instâncias nativas; os botões se conectam a destinos de protótipo. Se executado novamente, cria outra cópia.
4. Abra um arquivo FigJam e execute o mesmo plugin. Ele acrescenta 5 áreas com formas, decisões e conectores editáveis na página atual, abaixo do conteúdo existente.
5. No Design, inicie a apresentação pelo fluxo “Jornada principal” ou “Mobile”. Renomeie e mova os arquivos para o projeto da equipe desejado.

O gerador foi verificado estaticamente e com simulação local das chamadas. A execução no editor Figma depende da conexão/ambiente do usuário e ainda precisa ser validada ali. Desfazer está disponível no editor caso uma execução seja interrompida. O plugin funciona sem rede; não envia arquivos, credenciais ou dados SAP.

## Requisitos e decisões preservadas

- Angular 21, Feature-Based, Modular Monolith e Clean Architecture simplificada.
- Report Engine orientado a metadados; datas únicas/intervalos/múltiplas datas, BRL, empresas/Todas, clientes específicos/intervalos, documentos e Matchcode.
- Separação explícita entre consulta à API e refinamento do resultado carregado.
- Busca global e por coluna, filtros tipados, ordenação, organização de colunas e XLSX.
- Autenticação existente por cookies HttpOnly; não há novo login.
- Registro resumido obrigatório de toda alteração de código feita pela IA.

Relatórios do catálogo, empresas, clientes, títulos, totais e documentos são exemplos. Contratos de API, permissões, limites, operadores, opções e regras financeiras não foram inventados como implementação. A jornada representa uma hipótese de design; não é resultado de pesquisa com usuários.

## Marca e acessibilidade

- Paleta oficial: #EB194B, #FFFFFF, #000000, #FF9169, #FFBE55, #46DCAA, #55E1E6, #91BEFF.
- Neutros, tamanhos, espaçamentos e estados são propostas de produto, separadas das prescrições do manual.
- Branco sobre #EB194B tem contraste calculado de 4,40:1. Por isso botões pequenos usam preto/branco e texto pequeno sobre branco usa preto; vermelho permanece na marca e em destaques grandes.
- Logos oficiais sem redesenho ou recoloração. Os arquivos VO/VI são visualmente horizontais; HO/HI, verticais. Nomes originais preservados. As versões brancas têm transparência.
- A margem de segurança deve ser pelo menos o raio do círculo do símbolo.
- Lopes Sans nos dados e controles. Born Ready Upright apenas em títulos pontuais.
- Navegação de teclado, foco visível, rótulos persistentes e alternativa ao arraste são critérios de implementação. A prévia possui hotspots de teclado; acessibilidade completa deve ser validada no produto implementado.

## Fontes e licenças

O pacote não redistribui nem converte fontes. Lopes Sans contém metadados SIL Open Font License 1.1. Born Ready traz Desktop EULA 1.7.0; o protótipo usa imagens e não incorpora essa fonte como webfont. O plugin carrega as fontes originais já disponíveis ao editor. Confirmar licenciamento adequado antes da aplicação web Angular.

## Fontes técnicas do gerador

- https://developers.figma.com/docs/plugins/manifest/
- https://developers.figma.com/docs/plugins/api/properties/figma-loadfontasync/
- https://developers.figma.com/docs/plugins/working-with-variables/
- https://developers.figma.com/docs/plugins/api/properties/nodes-reactions/
- https://developers.figma.com/docs/plugins/api/properties/figma-combineasvariants/
- https://developers.figma.com/docs/plugins/api/ConnectorNode/

## Pendências para finalizar na conta

Conectar o Figma, executar o gerador ou transferir as telas pela integração disponível, conferir fontes/layout no editor e compartilhar os links dos arquivos Design e FigJam. As conexões atuais são navegação entre estados preparados; hover, edição de campos, datas dinâmicas, busca real, arraste e XLSX são requisitos de implementação, não operações reais do protótipo.

## Dark mode / atualização 22/10/2026

Adicionado por solicitação expressa do usuário. As 33 telas agora possuem versão escura, incluindo mobile, modais e estados; 24 variantes escuras de componentes complementam as 24 claras. O protótipo oferece o botão Tema no cabeçalho de revisão e Claro/Escuro no cabeçalho das telas, preservando a etapa atual. A preferência é salva quando o navegador permite. Darkmode.html inicia em escuro. O gerador Figma inclui 66 telas e 48 componentes de origem com Theme=Light/Dark, duas foundations e tokens escuros. Os novos neutros são decisões de produto; a paleta oficial e os logos originais permanecem preservados.

## Sidebar recolhível

No desktop, use Ocultar no cabeçalho para recolher a barra e Menu para restaurar. O conteúdo ocupa a largura liberada. A preferência é mantida durante navegação e troca de tema, e salva no navegador quando permitido. No mobile, Menu abre o painel lateral; Fechar menu o oculta. Os estados correspondentes também estão no gerador para Figma.
