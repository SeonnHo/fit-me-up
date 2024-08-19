export const signUp = async (values: any) => {
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
