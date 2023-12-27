export type SessionCookie = {
  name: string;
  value: string;
  attributes: {
    path: string;
    expires: number;
    httpOnly: boolean;
  };
};
