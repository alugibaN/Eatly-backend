import { errorUnknown } from "../const"

export class ErrorUnknown extends Error {
  statusCode: number
  constructor(message: string){
    super(message)
    this.statusCode = errorUnknown
  }
}