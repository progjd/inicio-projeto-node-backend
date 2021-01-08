yarn init -y
yarn add express
yarn add typescrypt -D
yarn add @types/express -D
yarn tsc
node dist/server.js
criar script "build": "tsc" no arquivo package.json & 
script: "dev:sever""ts-node-dev --transpile-only --ignore-watch node_modules src/server/ts" 
deletar a pasta dist
yarn add ts-node-dev -D
yarn add uuidv4
yarn add date-fns
yarn dev:server
yarn add reflect-metadaty
yarn add bcryptjs
yarn add jsonwebtoken
yarn add multer
yarn add express-async-errors



install o docker
docker run --name
sudo docker start id ou nome
install Dbeaver community
yarn add typeorm pg

pastas criadas:(database, migrations)
arquivos criados: (ormconfig.json)
script:{
   "build": "tsc",
    "dev:server": "ts-node-dev --inspect --transpileOnly --ignore-watch node_modules src/server.ts",
    "test": "jest",
    "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
     }


    criando tabelas: (yarn typeorm migration:create -n CreateAppointments)
    yarn typeorm migration:run
    yarn typeorm migration:revert
    yarn typeorm migration:show

    criando model de agendamento(
    import {entity} from 'typeorm'
    descomentar: experimentalDecorators
    emiteDecoratorMetaData

tsconfig.json( "strictPropertyInitialization": false,)
yarn add cors (controla quem pode acessar o nosso site)
yarn add tsconfig-paths -D (para rodar o ts-node com a nova infraestrutura)
yarn add tsyringe(injeção de dependências)
yarn add jest -D (ambiente de teste)
yarn add ts-jest -D
yarn add @types/jest -D
coverage report (porcentagens de testes, linhas)
yarn typeorm migration:create -n CreateUserToken
yarn add nodemailer (gereciador de fake email)
Ethereal(gerenciador email)
yarn add handlebars (variaveis email com nome, idade etc...)