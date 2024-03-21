import axios from 'axios'

const languages = {
  "Python": 71,
  "Javascript": 63,
  "Java": 62,
  "C++": 52,
}

const getResult = async (stdin, code, language) => {
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {
      base64_encoded: 'true',
      wait: 'true',
      fields: '*'
    },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': 'c4481ad4dfmsh5342332d1cc218bp14b00bjsnaf87451d95ee',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    data: {
      language_id: Number(languages[language]),
      source_code: `${code}`,
      stdin: `${stdin}`
    }
  }
  try {
    const response = await axios.request(options);
    return response.data
  } catch (error) {
    return error
  }
}

export default getResult