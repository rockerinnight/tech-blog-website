export interface User {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string | null;
    image: string;
  };
}
