# Aula 1 - Introdução #

- Instalar [Visual Studio Code](https://code.visualstudio.com/) - Editor de código multi-linguagem.

- Criar uma pasta chamada jogoemjs e entrar nela.

- Criar os arquivos index.html
    - script.js em uma pasta chamada js.
    - style.css em uma pasta chamada css.

- Abrir a pasta jogoemjs no vscode.

- Criar uma pasta chamada img e uma chamada sfx em jogoemjs no vscode

- Criar estrutura html5 no index.html

- Adicionar caminhos para adicionar script.js, style.css na estrutura index.html

```html
<link rel="stylesheet" href="./css/style.css">
```

- Dentro de styles.css adicionaremos o seguinte código:

```css
canvas { 
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
}
```

- Dentro de script.js vamos começar codar

- Vamos criar váriaveis:

```js
var canvas, ctx, ALTURA, LARGURA, frames = 0
```

- Vamos criar funções:

```js
function main(){}
```

- Dentro dos {} de main() vamos inserir o seguinte código

```js
ALTURA = window.innerHeight; // Detecta a altura do navegador
LARGURA = window.innerWidth; // Detecta a largura do navegador
if (LARGURA >= 500) { // Verifica se a largura da janela é maior ou igual a 500
	LARGURA = 600; // se isso for verdade a largura é redefinida e é atríbuido o valor de 600
	ALTURA = 600;  // A altura também é redefinida para 600
}

// Aqui começa a criação da tela do jogo, 
// O canvas é como se fosse um paint, onde podemos programar a pintura.
// Ou seja por meio de código a gente pode pintar.

// Criaremos agora o elemento canvas
canvas = document.createElement("canvas");
// Definiremos uma largura e altura para o canvas
canvas.width = LARGURA;
canvas.height = ALTURA;
// Criaremos uma borda para o canvas, é opcional, mas como não há nada desenhado 
canvas.style.border = "1px solid #000";

// é importante definir que o contexto será 2d,   
ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

```
