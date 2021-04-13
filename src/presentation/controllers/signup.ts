import {
  Controller,
  HttpRequest,
  HttpResponse,
  EmailValidator,
} from "./../protocols";
import { badRequest, serverError } from "./../helpers/http-helper";
import { MissingParamError, InvalidParamError } from "../errors";
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

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
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
