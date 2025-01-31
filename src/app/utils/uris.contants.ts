import { isDevMode } from '@angular/core';

const host = isDevMode() ? 'http://localhost:4000' : 'otherdomain.com';
const apiVersion = '/api/v1';
const basePath = host + apiVersion;
export class UriConstants {
  public static readonly HOST = host;
  public static readonly MESSAGES = basePath + '/messages';
  public static readonly USER_LOGIN = basePath + '/users/auth';
  public static readonly USER_REGISTER = basePath + '/users/store';
  public static readonly USERS = basePath + '/users';
}
