export {};

declare global {
  namespace Express {
    interface AuthorizedUser {
      sub: string;
      profiles: string[];
    }

    export interface Request {
      __authorizedUser: AuthorizedUser;
    }
  }
}
