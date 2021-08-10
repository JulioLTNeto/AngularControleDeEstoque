<h3><b>Visão geral do projeto</b></h3>

Projeto feito utilizando o Angular, incluso nele está uma API, para iniciar vá para src/api
abra o prompt de comando com o diretório da pasta e digite "npm start", ele irá automaticamente levantar a api

O banco de dados é feito com MySQL

A ideia do projeto é um sistema simples de controle de estoque, com tabelas para os produtos, fornecedores, categorias, vendas, usuarios e lucros.
Cada tabela terá uma função que será explicada abaixo.</p><br />
<ul>
  <li>produtos: Armazenar os dados dos produtos, salvar a quantidade de tal produto para análise e manipulação futura. a tabela produto se relaciona com a tabela categorias e fornecedores. Só o administrador pode adcionar um novo produto.<b>(Ainda não implementado)</b></li>
  <li>fornecedores: Armazenar os dados dos fornecedores, como locarização, nome e cnpj. Apenas o administrador pode adicionar um novo fornecedor<b>(Ainda não implementado)</b></li>
  <li>categorias: Armazena as cateegorias adcionadas. O administrador do sistema pode adicionar uma nova categoria.<b>(Ainda não implementado)</li></b>
  <li>vendas: Armazena os valores da compra, produto e usuário que realizou o procedimento, alem do preco cobrado do produto. Qualquer usuário pode realizar a operação.<b>(Ainda não implementado)</b></li>
  <li>lucros: Armazena os valores do lucro em determinada faixa de tempo, o processo é feito automaticamente.<b>(Ainda não implementado)</b></li>
  <li>usuarios: Armazena os usuarios, cada usuario tem um nível de privilégio dentro do sistema.<b>(Ainda não implementado)(Só o administrador pode adcionar um novo usuário, alem de removelos)</b></li>
</ul>
  
