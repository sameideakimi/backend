// @ts-check
const { MongoClient, ServerApiVersion, FindCursor } = require('mongodb');

const uri =
  'mongodb+srv://kimi:353e6593@cluster0.9igl8eb.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  await client.connect();
  const member = client.db('ket4').collection('member');

  // 나는 일단 초기화 하였음.
  const deleteResult = await member.deleteMany({});
  if (!deleteResult.acknowledged) throw new Error('삭제이상');

  // 5명 정보 삽입 후 전체데이터 출력
  const insertManyResult = await member.insertMany([
    {
      id: 'tetz',
      name: '이효석',
      isMarried: false,
      age: 38,
    },
    {
      id: 'eric',
      name: '김성재',
      isMarried: true,
      age: 38,
    },
    {
      id: 'ailee',
      name: '이재연',
      isMarried: false,
      age: 35,
    },
    {
      id: 'alex',
      name: '하승호',
      isMarried: false,
      age: 34,
    },
    {
      id: 'uncle',
      name: '박동희',
      isMarried: true,
      age: 38,
    },
  ]);

  if (!insertManyResult.acknowledged) throw new Error('도큐먼트 삽입 실패');

  const findCuusor = member.find({});
  const data = await FindCursor.toArray();
  console.log(data);

  // 새로운 회원 id: ted인 방성민 추가
  const insertOneResult = await member.insertOne({
    id: 'ted',
    name: '방성민',
    isMarried: false,
    age: 37,
  });
  if (!insertOneResult.acknowledged) throw new Error('도큐먼트 삽입 실패');

  // id가 ted인 애를 결혼한애로 바꿈
  const updateOneResult = await member.updateOne(
    { id: 'ted' },
    { $set: { isMarried: true } }
  );
  if (!updateOneResult.acknowledged) throw new Error('도큐먼트 수정 실패');

  // 방금 그 하나만 출력
  const data = await member.findOne({ id: 'ted' });
  console.log(data);

  // 결혼한애들을 출력함
  const isMarriedResult = await member.findOne({ id: { $eq: 'ted' } });
  console.log(isMarriedResult);

  // 조건 출력(38세 이상이면서 결혼을 한 사람)
  const findCursor = member.find({
    $and: [{ age: { $gte: 38 } }, { isMarried: true }],
  });
  const data = await findCursor.toArray();
  console.log(data);

  // 조건 출력(36세 이하이거나 결혼을 한 사람)
  const findCursor = member.find({
    $or: [{ age: { $lte: 36 } }, { isMarried: true }],
  });
  const data = await findCursor.toArray();
  console.log(data);

  // updateTime 적용
  const updateManyResult = await member.updateMany(
    {},
    { $set: { updateTime: new Date(Date.now()) } }
  );
  if (!updateManyResult.acknowledged) throw new Error('전체 데이터 수정 실패');
  const findCursor = member.find({});
  const data = await findCursor.toArray();
  console.log(data);

  client.close();
}

main();
