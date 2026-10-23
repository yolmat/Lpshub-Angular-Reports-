# Adicionar o login ao projeto LpsHub Reports

Esta atualização acrescenta a interface de entrada ao design anterior. Ela não cria cadastro, recuperação de senha nem um segundo mecanismo de autenticação. O botão **Entrar** do protótipo apenas demonstra a navegação; a validação real deve usar o fluxo de sessão por cookie HttpOnly que já existe na aplicação.

## Ver as telas

- Abra `Prototipo.html#screen-00` para o login claro de desktop.
- Abra `Darkmode.html#screen-00` para o login escuro de desktop.
- No seletor do protótipo, escolha `00e Login / erro` para a mensagem de falha ou `00m Login / mobile` para a versão pequena.
- Referências isoladas: `previews/00.png`, `previews/dark-00.png`, `previews/00e.png`, `previews/dark-00e.png`, `previews/00m.png` e `previews/dark-00m.png`. As camadas SVG correspondentes estão em `telas-svg/`.

## Incorporar ao Figma Design já criado

1. Extraia o pacote atualizado em uma pasta nova e importe o novo `figma-plugin/manifest.json` como plugin de desenvolvimento.
2. Abra um arquivo **temporário** de Figma Design e execute o plugin ali. Ele gera a versão atual completa, incluindo as seis variantes de login. Isso evita duplicar todo o design no arquivo anterior.
3. Copie os quadros `00 Login`, `00e Login / erro`, `00m Login / mobile` e os correspondentes `Dark / ...` da seção **Interfaces e protótipo** para o arquivo do projeto já criado.
4. Confira as fontes e os vínculos dos componentes após a cópia. Se o Figma não mantiver os vínculos de instâncias, remapeie para os componentes já existentes no arquivo de destino.
5. Ligue `Entrar` ao catálogo existente e a ação da tela de sessão expirada ao novo login. Crie um ponto de início de protótipo em `00 Login` e outro em `Dark / 00 Login` se quiser apresentar os temas separadamente.

O plugin completo acrescenta seis seções a cada execução. Se o arquivo anterior ainda não tiver sido importado, basta usar o novo pacote nele uma vez. As conexões não validam credenciais.

## Incorporar ao Angular 21 no VS Code

1. Se o design anterior já está no repositório, extraia `LpsHub-Reports-Login-para-VSCode.zip` na pasta `design/` e mescle a pasta `LpsHub-Reports/`. Ele contém apenas as novas referências e os guias atualizados. Para instalar todo o design do zero, extraia o pacote completo de revisão em `design/`. O pacote compacto do plugin Figma não inclui os PNGs de referência.
2. Abra o repositório no VS Code e peça ao Codex para ler `design/LpsHub-Reports/designer.md`, `design/LpsHub-Reports/design-tokens.json` e as seis imagens do login antes de alterar código.
3. Faça o Codex localizar o serviço de autenticação existente, o guard, o redirecionamento de sessão expirada e as rotas atuais. Implemente a página de login como feature da aplicação, reutilizando o serviço e o contrato real já encontrados. A requisição deve permitir o cookie HttpOnly conforme a configuração existente; o navegador não deve guardar token de sessão em `localStorage`.
4. Exiba os campos **Usuário** e **Senha**, o botão **Mostrar/Ocultar senha**, a ação **Entrar**, validação de campos obrigatórios, indicador de envio e mensagem genérica de falha. Não inclua links de cadastro ou recuperação de senha.
5. Em sucesso, navegue ao catálogo de relatórios; em falha, mantenha o usuário informado sem revelar se o identificador existe. Na expiração de sessão, redirecione ao login conforme o guard existente. Preserve o tema claro/escuro; a sidebar não aparece nesta página.
6. Compare a implementação com os PNGs em desktop e mobile, valide teclado/foco/rótulos e registre um resumo da alteração no log do projeto.

Prompt para colar no Codex do VS Code, com o repositório Angular aberto:

> Adicione ao projeto Angular 21 a tela de login desenhada em `design/LpsHub-Reports/previews/00.png`, `dark-00.png`, `00e.png`, `dark-00e.png`, `00m.png` e `dark-00m.png`. Leia `designer.md` e `design-tokens.json` dessa pasta. Antes de implementar, inspecione as rotas, os guards, os componentes e o serviço de autenticação existentes. Reutilize exclusivamente o contrato real e a sessão por cookie HttpOnly já implementados; não invente endpoint nem armazene tokens no navegador. Faça a tela responsiva e compatível com os dois temas, sem sidebar, cadastro ou recuperação de senha. Implemente rótulos, validação, Mostrar/Ocultar senha, estado de envio e erro genérico. Redirecione para o catálogo após sucesso e para o login quando a sessão expirar. Verifique os fluxos afetados e registre no log do projeto o que mudou, por quê, arquivos e validações.

Se ainda não houver autenticação de entrada implementada no repositório, o Codex deve preparar a interface e apontar o contrato que falta, sem fingir uma chamada de API válida. O protótipo e os PNGs são referências visuais; a interface final deve usar HTML/CSS e componentes Angular acessíveis.
