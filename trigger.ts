
/*
  Copyright © 2022 Felipe Chiozzotto, Heloísa Real, Juliana Sandes, Mateus Vieira, Thiago Soares

  This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses

*/

import CRUD_GRAPHQL from "./definitions.ts";

interface db_return {
  data: {
    usuario_pessoal: {
      values: Array<any>;
    };
  };
}

let instance = new CRUD_GRAPHQL({
  id: Deno.env.get(`DB_ID`) || ``,
  region: Deno.env.get(`DB_REGION`) || ``,
  keyspace: Deno.env.get(`DB_KEYSPACE`) || ``,
  token: Deno.env.get(
    `DB_APPLICATION_TOKEN`,
  ) || ``,
});

instance.debug = true;

//instance.Show();
/*
instance.Execute(`query{
    mytable{    
        values{
            firstname
            lastname
            favorite_color
        }
    }
}`);

let testeInsert = await instance.Execute(
  `query query_one($myname: String) {
    mytable(value: { firstname: $myname, lastname: "Vieira" }){
      values {
        firstname
        lastname
        favorite_color
      }
    }
  }`,
  {
    myname: `Mateus`,
  },
);

console.log(testeInsert.data.mytable.values);

instance.Execute(`mutation ($myname: String){
  insertmytable(
      value: {
          firstname: $myname
          lastname: "by API"
          favorite_color: "black"
      }
  ) {
      value{
          firstname
          lastname
          favorite_color
      }
  }
}`, {
  myname: `NOVO HELLO`
});

let teste: db_return = await instance.Execute(`query{
  mytable{    
      values{
          firstname
          lastname
          favorite_color
      }
  }
}`);

console.log(teste.data.mytable.values);
*/

let teste: db_return = await instance.Execute(`query{
  usuario_pessoal{    
      values{
        id
      }
  }
}`);

console.log(teste.data.usuario_pessoal.values);


let teste2: db_return = await instance.Schema(`mutation DropAnyTable($table: String!){
  drop: dropTable(keyspaceName:"medtempo", tableName: $table)
}`, 
  {
    "table": "usuario_pessoal",

}
)

console.log(teste)