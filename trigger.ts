import CRUD_GRAPHQL from "./definitions.ts";

interface db_return {
  data: {
    mytable: {
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
