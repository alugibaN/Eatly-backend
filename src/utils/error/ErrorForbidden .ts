import { errorForbidden } from "../const";

export class ErrorForbidden extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = errorForbidden;
  }
}
