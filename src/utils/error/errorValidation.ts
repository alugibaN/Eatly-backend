import { badRequest } from "../const"

export class ErrorValidation  extends Error {
  statusCode:number
  
  constructor(messages: string){
    super(messages)
    this.statusCode = badRequest
  }
}
