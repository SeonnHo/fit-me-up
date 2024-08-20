export const sendEmail = async (email: string) => {
  const result = await fetch('/api/user/signup/verify/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));

  return result.authNumber;
};
