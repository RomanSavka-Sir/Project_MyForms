export const getPayload = (user: { email: string; id: number }) => {
  return { email: user.email, id: user.id };
};
