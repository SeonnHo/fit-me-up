import { connectDB } from '../api/database';

async function getNextSequence(name: string) {
  const database = connectDB.db('fit_me_up');
  const counterCollection = database.collection('counters');

  const result = await counterCollection.findOneAndUpdate(
    { sequenceName: name },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: 'after' }
  );

  try {
    if (result) {
      return result.seq;
    } else {
      throw new Error('result 없음');
    }
  } catch (error) {
    console.log(error);
  }
}

export { getNextSequence };
