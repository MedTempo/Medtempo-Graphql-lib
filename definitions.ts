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


type graphvars = any

export interface config {
  region: string,
  id: string
  keyspace: string
  token: string
}

export default class CRUD_GRAPHQL {
  public debug = false;
  public DB_REGION: string

  private DB_ID: string
  private DB_KEYSPACE: string
  private DB_APPLICATION_TOKEN: string

  private DB_URL: string
  private Mount_Fetch: RequestInit 


  constructor(config: config){
    this.DB_REGION = config.region
    this.DB_ID = config.id
    this.DB_KEYSPACE = config.keyspace
    this.DB_APPLICATION_TOKEN = config.token

    this.DB_URL = `https://${this.DB_ID}-${this.DB_REGION}.apps.astra.datastax.com/api/graphql/${this.DB_KEYSPACE}/`;


    this.Mount_Fetch = {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
        "X-Cassandra-Token": this.DB_APPLICATION_TOKEN,
      },
    };


    this.CheckUndefined()
  }

  
  public CheckUndefined(){
    if( this.DB_ID == `` ||  this.DB_REGION == `` ||  this.DB_KEYSPACE == `` ||  this.DB_APPLICATION_TOKEN == ``){
      console.error(`Env Variables Undenined`)

      Deno.exit(1)
    }
  }
  

  public Show() {
    console.log(`Local: ${this.DB_REGION}`);
    console.log(`Db id: ${this.DB_ID}`);
    console.log(`Keyspace: ${this.DB_KEYSPACE}`);

    if (this.debug === true) {
      console.log(`\nToken: ${this.DB_APPLICATION_TOKEN}`);
    }

    console.log(`\n\nDb connection url: ${this.DB_URL}`);
  }

  private async Fetch(generic_query: string, vars?: graphvars) {
    //console.log(this.Mount_Fetch);

    let Fetch_Params = this.Mount_Fetch;

    Fetch_Params["body"] = JSON.stringify({ query: generic_query, variables: vars });

    console.log(Fetch_Params["body"])

    let db_response = await fetch(this.DB_URL, Fetch_Params);

    let query_result = await db_response.json();
    console.log(query_result);

    return query_result;
  }

  public async Execute(create_query: string, vars?: graphvars) {
    return await this.Fetch(create_query, vars);
  }
}
