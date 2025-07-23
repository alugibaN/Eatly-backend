import { errorFind } from "../const";

export class ErrorFind extends Error {
  statusCode: number;
  constructor(messages: string) {
    super(messages);
    this.statusCode = errorFind;
  }
}
