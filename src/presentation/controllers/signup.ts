import { MissingParamError } from '../errors/missing-param';
import { badRequest } from '../helpers/http-helper';
import { type HttpRequest, type HttpResponse } from '../protocols/http';
import { type Controller } from './../protocols/controller';

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requireFields = ['email', 'name', 'password']
    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    // if (!httpRequest.body.name) {
    //   return badRequest(new MissingParamError('name'))
    // }
    // if (!httpRequest.body.email) {
    //   return badRequest(new MissingParamError('email'))
    // }
  }
}
