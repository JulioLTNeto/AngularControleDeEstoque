Projeto feito utilizando o Angular, incluso nele está uma API, para iniciar vá para src/api
abra o prompt de comando com o diretório da pasta e digite "npm start", ele irá automaticamente levantar a api

O banco de dados é feito com MySQL

A ideia do projeto é um sistema simples de controle de estoque, com tabelas para os produtos, fornecedores, categorias, vendas, usuarios e lucros.
Cada tabela terá uma função que será explicada abaixo.</p><br />

  <p>• produtos: Armazenar os dados dos produtos, salvar a quantidade de tal produto para análise e manipulação futura. a tabela produto se relaciona com a tabela categorias e fornecedores. Só o administrador pode adcionar um novo produto.(Ainda não implementado)</p><br />
  
  <p>• fornecedores: Armazenar os dados dos fornecedores, como locarização, nome e cnpj. Apenas o administrador pode adicionar um novo fornecedor(Ainda não implementado)</p><br />
  
  <p>• categorias: Armazena as cateegorias adcionadas. O administrador do sistema pode adicionar uma nova categoria.(Ainda não implementado)</p><br />
  
  <p>• vendas: Armazena os valores da compra, produto e usuário que realizou o procedimento, alem do preco cobrado do produto. Qualquer usuário pode realizar a operação.(Ainda não implementado)</p><br />
  
  <p>• lucros: Armazena os valores do lucro em determinada faixa de tempo, o processo é feito automaticamente.(Ainda não implementado)</p><br />
  
  <p style="text-indent: 30px">• usuarios: Armazena os usuarios, cada usuario tem um nível de privilégio dentro do sistema.(Ainda não implementado)(Só o administrador pode adcionar um novo usuário, alem de removelos)</p><br />
  
