import { Model } from 'mongoose';
import { AbstractSchema } from './abstract.schema';
import { Logger } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractSchema> {
  protected abstract readonly logger: Logger;

  constructor(private readonly model: Model<TDocument>) {}
}
