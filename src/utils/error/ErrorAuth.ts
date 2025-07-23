import { errorAuth} from "../const";

export class ErrorAuth extends Error {
  statusCode: number;
  constructor(messages: string){
    super(messages)
    this.statusCode = errorAuth
  }
}

