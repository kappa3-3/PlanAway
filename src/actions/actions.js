export const approved = (isUser) => ({
  type: 'APPROVED',
  isUser,
});

export const denied = (isNotUser) => ({
  type: 'DENIED',
  isNotUser,
});
