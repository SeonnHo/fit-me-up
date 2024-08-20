export const credentialsSignUp = async (values: any) => {
  const { confirmPassword, ...body } = values;

  const result = await fetch('/api/user/signup', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));

  return result;
};

export const oauthSignUp = async (values: any) => {
  const { id, nickname } = values;

  const body = JSON.stringify({ id, nickname });

  const result = await fetch('/api/user/signup/oauth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));

  return result;
};
