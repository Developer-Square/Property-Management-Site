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
  projectBy?: string;
  populate?: string;
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
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {string} [options.projectBy] - Fields to hide or include (default = '')
   * @returns {Promise<QueryResult>}
   */
  schema.static(
    'paginate',
    async function (
      filter: Record<string, any>,
      options: IPaginationOptions
    ): Promise<QueryResult> {
    let sortingCriteria: any = { _id: 1 };
    if (options._sort && options._order) {
      sortingCriteria = { [options._sort]: options._order };
    }

    let project: string = '';
    if (options.projectBy) {
      const projectionCriteria: string[] = [];
      options.projectBy.split(',').forEach((projectOption) => {
        const [key, include] = projectOption.split(':');
        projectionCriteria.push((include === 'hide' ? '-' : '') + key);
      });
      project = projectionCriteria.join(' ');
    } else {
      project = '-__v';
    }

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).limit(options._end ?? 10).skip(options._start ?? 0).sort(sortingCriteria).select(project);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption: any) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a: string, b: string) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.exec();

      return Promise.all([countPromise, docsPromise]).then((values) => {
        const [count, docs] = values;
        const result = {
          docs,
          count,
        };
        return Promise.resolve(result);
      });
    }
  );
};

export default paginate;
