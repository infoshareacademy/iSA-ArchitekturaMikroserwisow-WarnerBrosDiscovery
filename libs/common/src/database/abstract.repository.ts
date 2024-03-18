import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractSchema } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractSchema> {
  protected abstract readonly logger: Logger;

  constructor(private readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const doc = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await doc.save()).toJSON() as TDocument;
  }

  async findOne(query: FilterQuery<TDocument>) {
    const doc = await this.model.findOne(query).lean<TDocument>(true);

    if (!doc) {
      this.logger.warn(
        `Document not found with query ${JSON.stringify(query)}`,
      );
      throw new NotFoundException('Document not found');
    }

    return doc;
  }

  async find(query: FilterQuery<TDocument>) {
    return this.model.find(query).lean<TDocument[]>(true);
  }

  async findOneAndUpdate(
    query: FilterQuery<TDocument>,
    document: UpdateQuery<TDocument>,
  ) {
    const doc = await this.model
      .findOneAndUpdate(query, document, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!doc) {
      this.logger.warn(
        `Document not found with query ${JSON.stringify(query)}`,
      );
      throw new NotFoundException('Document not found');
    }

    return doc;
  }

  async deleteOne(query: FilterQuery<TDocument>) {
    return await this.model.findOneAndDelete(query).lean<TDocument>(true);
  }
}
