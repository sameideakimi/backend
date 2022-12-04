// @ts-check
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://kimi:353e6593@cluster0.9igl8eb.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const user = client.db('kdt4').collection('user');

  user.deleteMany({}, (err, deleteResult) => {
    if (deleteResult?.acknowledged) {
      user.insertMany(
        [
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
        ],
        (err, insertResult) => {
          if (insertResult?.acknowledged) {
            user.updateMany(
              { age: { $gte: 5 } },
              { $set: { name: '5살 이상' } },
              (err, updateManyResult) => {
                if (updateManyResult?.acknowledged) {
                  const findCursor = user.find({});
                  findCursor.toArray((err, data) => {
                    console.log(data);
                    client.close();
                  });
                }
              }
            );
          }
        }
      );
    }
  });
});
