const requestApiToGame = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(url);
  const data = await response.json();
  return Promise.resolve(data);
};

export default requestApiToGame;
