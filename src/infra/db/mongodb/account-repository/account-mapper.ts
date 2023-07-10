import { type AccountModel } from '../../../../domain/models/account';

export const map = (account: any): AccountModel => {
  const { _id, ...accountWithoutId } = account;
  // return Object.assign({}, accountWithoutId, { id: _id.toString()})
  return {
    name: accountWithoutId.name,
    email: accountWithoutId.email,
    password: accountWithoutId.password,
    id: _id.toString()
  }
};
