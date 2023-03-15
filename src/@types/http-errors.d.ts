export {};
import {MessagesEnum} from '@libs/messages';

declare module 'http-errors' {
  interface HttpErrorConstructor<N extends number = number> {
    (msg?: MessagesEnum): HttpError<N>;
    new (msg?: MessagesEnum): HttpError<N>;
  }
}
