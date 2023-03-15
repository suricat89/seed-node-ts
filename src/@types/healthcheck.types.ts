export interface ItemToCheckResponse {
  id: string,
  healthy: boolean;
  required: boolean;
  data: unknown | Error;
}

export interface ItemToCheck {
  (...args: unknown[]): Promise<ItemToCheckResponse>;
}
