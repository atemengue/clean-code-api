import { type AddAccount } from '../../../domain/usecases/add-account';
import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError } from '../../helpers/http-helper';
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols';
import { type EmailValidator } from './signup-protocols';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const { name, email, password, passwordConfirmation } = httpRequest.body;

    try {
      const requireFields = ['email', 'name', 'password', 'passwordConfirmation']
      for (const field of requireFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = this.addAccount.add({
        name,
        email,
        password
      });

      return {
        statusCode: 200,
        body: account
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
