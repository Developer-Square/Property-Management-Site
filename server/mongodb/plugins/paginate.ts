/* eslint-disable no-param-reassign */
import { Schema, Document } from 'mongoose';

export interface QueryResult<T = any> {
  docs: Document<T>[];
  count: number;
}

export interface IPaginationOptions {
  _start?: number;
  _end?: number;
  _sort?: string;
  _order?: number;
}

const paginate = (schema: Schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} docs - Results found
   * @property {number} count - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Pagination options as created by refine
   * @returns {Promise<QueryResult>}
   */
  schema.static('paginate', async function (filter: Record<string, any>, options: IPaginationOptions): Promise<QueryResult> {

    let sortingCriteria: any = { _id: 1 };
    if (options._sort && options._order) {
      sortingCriteria = { [options._sort]: options._order };
    }

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).limit(options._end ?? 10).skip(options._start ?? 0).sort(sortingCriteria).exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [count, docs] = values;
      const result = {
        docs,
        count,
      };
      return Promise.resolve(result);
    });
  });
};

export default paginate;
