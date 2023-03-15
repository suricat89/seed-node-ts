export {};

declare module 'jsonwebtoken' {
  interface JwtPayload {
    profiles: string[]
  }
}
