import { mongodb } from "@fastify/mongodb"
import { randomUUID } from 'crypto'
import { productsFixture } from "./fixtures/products"
import { discountsFixture } from "./fixtures/discounts"
import { FastifyInstance } from "fastify"
import { launchServer } from "../src/server"

const mongoHost = process.env.MONGO_HOST ?? '127.0.0.1:27017'

const getMongoDatabaseName = () => `test-${randomUUID()}`

const getMongoURL = (databaseName: string) => `mongodb://${mongoHost}/${databaseName}`

export const setupTest = async (): Promise<FastifyInstance> => {
  const databaseName = getMongoDatabaseName()
  const mongoURL = getMongoURL(databaseName)

  const client = await mongodb.MongoClient.connect(mongoURL)
  const database = client.db(databaseName)
  const productsCollection = database.collection('products')
  const discountsCollection = database.collection('discounts')

  await productsCollection.deleteMany({})
  await productsCollection.insertMany(productsFixture)
  await discountsCollection.deleteMany({})
  await discountsCollection.insertMany(discountsFixture)
  await client.close()

  return launchServer({ mongoURL })
}