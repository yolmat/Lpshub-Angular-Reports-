# Importar o projeto no Figma

Este pacote contém um **plugin de desenvolvimento** que gera o projeto dentro do editor. Não é um arquivo `.fig`; não arraste o ZIP para a tela inicial do Figma.

## Figma Design

1. Extraia o ZIP para uma pasta no computador.
2. Instale as fontes originais Lopes Sans Regular, Medium, SemiBold e Bold, além de Born Ready Upright, fornecidas separadamente. Reabra o Figma desktop para disponibilizá-las.
3. Abra um arquivo de Figma Design, preferencialmente vazio para a primeira importação.
4. Acesse **Plugins → Development → Import plugin from manifest…** e selecione `figma-plugin/manifest.json`.
5. Execute o plugin **LpsHub Reports • Lopes** pelo menu de desenvolvimento.
6. Esta versão não usa dados privados de plugin, portanto essa geração não depende de ID no manifesto. Se o próprio editor exigir um ID para registrar o plugin, crie um plugin local no Figma e preserve o ID gerado por ele; não invente um ID.
7. Aguarde a criação das seis seções: Leia-me, Foundations, Components, Wireframes, Interfaces e protótipo, Handoff.
8. Inicie a apresentação pelo fluxo **Jornada principal**, **Dark mode**, **Mobile** ou **Mobile Dark**.

São gerados 132 quadros: 33 estados em cada tema e suas alternativas de sidebar/menu; 48 componentes de origem com variantes, cores e espaçamentos como variáveis, estilos de texto, 3 wireframes e 2 foundations.

No desktop, **Ocultar** recolhe a sidebar e **Menu** a restaura. No mobile, **Menu** abre o painel e **Fechar menu** o fecha. As conexões demonstram estados preparados; a implementação real de persistência e responsividade pertence ao produto.

O plugin acrescenta conteúdo e não remove objetos existentes. Rodá-lo novamente cria outra cópia. Em caso de execução interrompida, revise o conteúdo gerado e use Desfazer no editor se necessário.

## FigJam

Abra um arquivo FigJam e execute o mesmo plugin pelo menu de desenvolvimento. Ele acrescenta 5 áreas com formas e 36 conectores editáveis: jornada do analista, geração, Matchcode, refinamento/exportação e arquitetura.

## Guia para implementação

Use `designer.md` como referência de identidade, temas, componentes, sidebar, filtros, Matchcode, tabela, exportação, acessibilidade e critérios de validação. Os valores estão em `design-tokens.json`; os logos originais ficam em `assets/`.

## Limites e verificação

- Não há fonte comercial incorporada ao pacote; use os arquivos originais e confira a licença antes da aplicação web.
- O gerador funciona sem rede e não acessa SAP nem credenciais.
- O código e as referências foram conferidos localmente e por simulação. A execução e revisão no editor Figma ainda precisam ocorrer.
- O pacote completo de revisão contém os HTMLs, PNGs e SVGs; esta exportação compacta contém o gerador e os documentos necessários para a importação.

## Atualizar após o erro de setPluginData

Extraia o pacote corrigido e importe novamente o `figma-plugin/manifest.json` dessa pasta, para que o Figma execute o novo `code.js`. Não é necessário editar o código nem acrescentar um ID apenas para resolver esse erro. Antes de repetir a geração, desfaça ou remova somente os objetos da tentativa interrompida se não quiser manter cópias parciais.

## Atualizar após o erro de fonte Inter Medium

A revisão v2 carrega a fonte atual de cada texto ou estilo antes de substituí-la pela fonte oficial Lopes. Isso inclui as fontes padrão de estilos, formas e conectores do FigJam. A aparência final continua usando Lopes Sans e Born Ready Upright.

Extraia o ZIP v2 em uma nova pasta e importe o manifesto dessa pasta. Confirme que o plugin aponta para o `code.js` atualizado; executar o registro que ainda aponta para a pasta antiga repetirá o erro anterior.
