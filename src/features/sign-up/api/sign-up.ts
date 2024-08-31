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

export const oauthSignUp = async ({
  oauthId,
  email,
  nickname,
  provider,
}: {
  oauthId: string;
  email: string;
  nickname: string;
  provider: string;
}) => {
  const body = JSON.stringify({ oauthId, email, nickname, provider });

  const result = await fetch('/api/user/signup/oauth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));

  return result;
};
