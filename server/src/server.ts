//Rota: Endereço completo da req
//Recurso: Qual entidade estamos acessando do sistema

//POST http://localhost:3333/users = cria um usuario
//GET http://localhost:3333/users = listar usuarios
//GET http://localhost:3333/users/4 = buscar usuario com id 5

//Request param: Parametros que vem na propria rota que identificam um recurso ex :id
//Query param: parametros geralmente opcionais separados por ? para filtros e paginação
//Request Body: Parametros para criação/atualização de info

//knexjs -- transofmra tudo em js, ou seja facilita por saber tudo na mesma lang
//e por também caso migre de db vai seguir funcionando mesmo q mude a lang do banco

//ao inves de sql normal: SELECT * FROM users WHERE name = 'diego';
//vira tudo em js: knew('users').where('name', 'diego').select('*');
import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(errors());

app.listen(3333);