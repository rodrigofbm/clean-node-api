import { Controller } from "./../protocols/controller";
import { badRequest, serverError } from "./../helpers/http-helper";
import { MissingParamError, InvalidParamError } from "../errors";
import { HttpRequest, HttpResponse } from "./../protocols/http";
import { EmailValidator } from "../protocols/email-validator";
export class SignUpController implements Controller {
  constructor(private emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredParams = [
        "name",
        "email",
        "password",
        "passwordConfirmation",
      ];

      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new MissingParamError(param));
        }
      }
      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError("email"));
      }

      return {
        statusCode: 200,
        body: "success",
      };
    } catch (error) {
      return serverError();
    }
  }
}
