export class ErrorValidation  extends Error {
  statusCode:number
  
  constructor(messages: string){
    super(messages)
    this.statusCode = 400
  }
}

module.exports = ErrorValidation