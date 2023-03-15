/* eslint-disable no-var */
export {};

declare global {
  interface App {
    name: string;
    version: string;
  }

  var __root: string;
  var __app: App;
}
