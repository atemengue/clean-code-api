import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';
import { type Controller, type EmailValidator, type HttpRequest, type HttpResponse } from '../protocols';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requireFields = ['email', 'name', 'password', 'passwordConfirmation']
      for (const field of requireFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, passwordConfirmation } = httpRequest.body;
      if (password != passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }

    // if (!httpRequest.body.name) {
    //   return badRequest(new MissingParamError('name'))
    // }
    // if (!httpRequest.body.email) {
    //   return badRequest(new MissingParamError('email'))
    // }
  }
}
