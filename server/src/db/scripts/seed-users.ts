import { makeQuery } from '../../common/promisified-db-query';

export const seedUsers = async () => {
  try {
    const results = await makeQuery(
      'INSERT INTO Users (user_name, email, user_password) VALUES ("Bob", "Bob@gmail.com", "dasdas6d7asd67as6d")'
    );
    console.log('Success! ', results);
  } catch (err) {
    throw err;
  }
};
