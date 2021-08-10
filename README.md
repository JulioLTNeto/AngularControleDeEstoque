# ControleDeEstoque

<h3><b>Visão geral do projeto</b></h3>

Projeto feito utilizando o Angular, incluso nele está uma API, para iniciar vá para src/api
abra o prompt de comando com o diretório da pasta e digite "npm start", ele irá automaticamente levantar a api

O banco de dados é feito com MySQL

A ideia do projeto é um sistema simples de controle de estoque, com tabelas para os produtos, fornecedores, categorias, vendas, usuarios e lucros.
Cada tabela terá uma função que será explicada abaixo.</p>
<ul>
  <li><b>produtos:</b> Armazenar os dados dos produtos, salvar a quantidade de tal produto para análise e manipulação futura. a tabela produto se relaciona com a tabela categorias e fornecedores. Só o administrador pode adcionar um novo produto.<b>(Ainda não implementado)</b></li>
  <li><b>fornecedores:</b> Armazenar os dados dos fornecedores, como locarização, nome e cnpj. Apenas o administrador pode adicionar um novo fornecedor<b>(Ainda não implementado)</b></li>
  <li><b>categorias:</b> Armazena as cateegorias adcionadas. O administrador do sistema pode adicionar uma nova categoria.<b>(Ainda não implementado)</li></b>
  <li><b>vendas:</b> Armazena os valores da compra, produto e usuário que realizou o procedimento, alem do preco cobrado do produto. Qualquer usuário pode realizar a operação.<b>(Ainda não implementado)</b></li>
  <li><b>lucros:</b> Armazena os valores do lucro em determinada faixa de tempo, o processo é feito automaticamente.<b>(Ainda não implementado)</b></li>
  <li><b>usuarios:</b> Armazena os usuarios, cada usuario tem um nível de privilégio dentro do sistema.<b>(Ainda não implementado)(Só o administrador pode adcionar um novo usuário, alem de removelos)</b></li>
</ul>
  
<h3>Telas do sistema</h3>
<h4>Tela de Login<b> Versão Atualizada</b></h4>
<a href="https://ibb.co/1LcRk49"><img src="https://i.ibb.co/56ZsPJ5/tela-Login2-0.png" alt="tela-Login2-0" border="0"></a>
<h5>Tela de Login<b> Versão Antiga</b></h5>
<a href="https://ibb.co/pR4ZCx6"><img src="https://i.ibb.co/LJ9648D/tela-Login.png" alt="tela-Login" width="500" border="0"></a>
<h4>Tela Inicial</b></h4>
<a href="https://ibb.co/VShgJjp"><img src="https://i.ibb.co/d23PjWJ/tela-Inicialp1.png" alt="tela-Inicialp1" border="0"></a>
<a href="https://ibb.co/GczMc0L"><img src="https://i.ibb.co/4PhSP7G/tela-Inicialp2.png" alt="tela-Inicialp2" border="0"></a>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
