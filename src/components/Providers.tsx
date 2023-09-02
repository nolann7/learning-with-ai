type ProvidersPropType = {
  children: React.ReactNode;
};

export const Provider = ({ children }: ProvidersPropType) => {
  return <div>{children}</div>;
};
