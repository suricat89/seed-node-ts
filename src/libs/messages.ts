export type MessagesEnum = keyof typeof messages;

export const messages = {
  unknownError: 'Unknown error',
  authorization1: 'Missing \'Authorization\' header',
  authorization2: 'Missing \'Bearer\' from token',
  authorization3: 'User cannot access this resource'
};
