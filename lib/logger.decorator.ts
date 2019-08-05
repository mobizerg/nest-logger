import { Inject } from '@nestjs/common';
import { getToken } from './logger.helper';

export function InjectLogger(name?: string): ParameterDecorator {
  return Inject(getToken(name));
}
