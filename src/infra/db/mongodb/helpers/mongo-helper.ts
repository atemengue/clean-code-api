import { MongoClient, type Collection } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
  },

  async disconnect (): Promise<void> {
    await this.client.close();
  },
  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection;
    // return Object.assign({}, collectionWithoutId, { id: _id.toString()})
    return {
      name: collectionWithoutId.name,
      email: collectionWithoutId.email,
      password: collectionWithoutId.password,
      id: _id.toString()
    }
  }

}
