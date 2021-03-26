import { badRequest } from './../helpers/http-helper'
import { MissingParamError } from './../errors/missing-param.error'
import { HttpRequest, HttpResponse } from './../protocols/http'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']

    for (const param of requiredParams) {
      if (!httpRequest.body[param]) {
        return badRequest(new MissingParamError(param))
      }
    }

    return {
      statusCode: 200,
      body: 'success'
    }
  }
}
