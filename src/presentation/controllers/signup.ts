import { InvalidParamError } from '../errors/invalid-param -error';
import { MissingParamError } from '../errors/missing-param';
import { badRequest, serverError } from '../helpers/http-helper';
import { type EmailValidator } from '../protocols/email.validator';
import { type HttpRequest, type HttpResponse } from '../protocols/http';
import { type Controller } from './../protocols/controller';

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

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
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
