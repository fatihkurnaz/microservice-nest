import { AbstractDocument } from './abstract.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { Logger, NotFoundException } from '@nestjs/common';

//TODO bu sınıfın AbstractSchema'dan türetilmiş tüm class'lar çalışabileceğini söylemek için kullanılır
// ve içerideki tüm "TDocument" lar buna refer eder
export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    //TODO sadece plain object'leri dönmek için
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  // TODO TDocument'in alanlarının isimleri ile filtreleme yapmamızı garanti eder.
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = this.model.findOne(filterQuery).lean<TDocument>(true);
    if (!document) {
      this.logger.warn('Document was not found with query!', filterQuery);
      throw new NotFoundException('Document was not found!');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = this.model
      .findOneAndUpdate(filterQuery, update, { new: true })
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn('Document was not found with query!', filterQuery);
      throw new NotFoundException('Document was not found!');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }
}
