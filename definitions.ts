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

  private DB_URL =
    `https://${this.DB_ID}-${this.DB_REGION}.apps.astra.datastax.com/api/graphql/${this.DB_KEYSPACE}/`;


  constructor(config: config){
    this.DB_REGION = config.region
    this.DB_ID = config.id
    this.DB_KEYSPACE = config.keyspace
    this.DB_APPLICATION_TOKEN = config.token
  }

  /*
  public CheckUndefined(){
    if(typeof this.DB_ID != `string` || typeof this.DB_REGION != `string` || typeof this.DB_KEYSPACE != `string` || typeof this.DB_APPLICATION_TOKEN != `string`){
      console.error(`Env Variables Undenined`)

      Deno.exit(1)
    }
  }
  */

  public Show() {
    console.log(`Local: ${this.DB_REGION}`);
    console.log(`Db id: ${this.DB_ID}`);
    console.log(`Keyspace: ${this.DB_KEYSPACE}`);

    if (this.debug === true) {
      console.log(`\nToken: ${this.DB_APPLICATION_TOKEN}`);
    }

    console.log(`\n\nDb connection url: ${this.DB_URL}`);
  }

  private Mount_Fetch: RequestInit = {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      "X-Cassandra-Token": this.DB_APPLICATION_TOKEN,
    },
  };

  private async Fetch(generic_query: string, vars?: graphvars) {
    //console.log(this.Mount_Fetch);

    let Fetch_Params = this.Mount_Fetch;

    Fetch_Params["body"] = JSON.stringify({ query: generic_query, variables: vars });

    //console.log(Fetch_Params["body"])

    let db_response = await fetch(this.DB_URL, Fetch_Params);

    let query_result = await db_response.json();
    console.log(query_result);

    return query_result;
  }

  public async Execute(create_query: string, vars?: graphvars) {
    return await this.Fetch(create_query, vars);
  }
}
