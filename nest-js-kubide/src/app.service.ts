import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Object {
    return { message: 'Welcome!', status: 200, ok: true };
  }
}
