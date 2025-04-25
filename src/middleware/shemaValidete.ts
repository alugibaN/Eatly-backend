import { Request, Response, NextFunction } from "express"
import { z, ZodError, ZodIssue } from 'zod'

// const formatZodIssue = (issue: ZodIssue): string => {
//     const { path, message } = issue
//     const pathString = path.join('.')

//     return `${pathString}: ${message}`
// }

// // Format the Zod error message with only the current error
// export const formatZodError = (error: ZodError): string | undefined => {
//     const { issues } = error

//     if (issues.length) {
//         const currentIssue = issues[0]

//         return formatZodIssue(currentIssue)
//     }
// }


export const validateUserParams = (schema: z.ZodType) => async (req:Request, res:Response, next:NextFunction) => {
  // try {
  //   const use = schema.safeParse(req.body);
  //   if (!use.success) {
  //     console.log(use.error.issues);
  //     const error: any = new Error("Validation Error");
  //     error.statusCode = 400;
  //     error.errors = use.error.issues;
  //     return next(error); 
  //   }
  //   req.body = use.data;
    next();
  // } catch (err) {
  //   if (err instanceof z.ZodError) {
  //     console.log(err.issues);
  //     const error: any = new Error("Validation Error");
  //     error.statusCode = 400;
  //     error.errors = err.issues;
  //     return next(error);
  //   }
  //   console.log(222);
  //   next(err);
  // }
};


// if(!use.success){
//   let str =''
//   let mm = use.error.errors.forEach((acc:string,el:Error) => str+=el["message"])
//    console.log(str)
//   }    // if(!use.success)   console.log(use.error.issues);
      // throw new Error("Error")
      //  console.log(use.error.flatten())