export const checkNicknameDuplication = async (nickname: string) => {
  const result = await fetch('/api/user/check/nickname', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nickname),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));

  return result;
};

export const checkEmailDuplication = async (email: string) => {
  const result = await fetch('/api/user/check/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));

  return result;
};
