// @ts-check
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://kimi:353e6593@cluster0.9igl8eb.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  await client.connect();
  const user = client.db('ket4').collection('user');
  const deleteResult = await user.deleteMany({});
  if (!deleteResult.acknowledged) throw new Error('삭제이상');

  const insertResult = await user.insertMany([
    {
      name: 'paroro',
      age: 5,
    },
    {
      name: 'crong',
      age: 6,
    },
    {
      name: 'loopy',
      age: 4,
    },
  ]);

  if (!insertResult.acknowledged) throw new Error('삽입이상');

  //   const data = await user.findOne({ name: 'loopy' });
  //   console.log(data);

  //   const data = await user.find({ age: { $gte: 5}}).toArray(); 아래 두줄을 이렇게 한줄로 할수도 있음
  const dataCursor = user.find({ age: { $gte: 5 } });
  const data = await dataCursor.toArray();
  console.log(data);

  client.close();
}

main();
