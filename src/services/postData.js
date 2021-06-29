import axios from 'axios';

const URL = 'http://193.243.158.230:4500/api/import';

const postData = async data => {
  try {
    await axios.post(
      URL,
      {
        resultArray: data,
      },
      {
        headers: { Authorization: 'test-task' },
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export default postData;
