import { CashFlow } from '../@types';
import Service from '../Service';
import generateQueryString from '../utils/generateQueryString';

class CashFlowService extends Service {
  static getAllEntries(query: CashFlow.Query)
    : Promise<CashFlow.EntrySummary[]> {
    const queryString: string = generateQueryString(query);
    const uri: string = '/cashflow/entries'.concat(queryString);

    return this.Http.get<CashFlow.EntrySummary[]>(uri)
      .then(this.getData);
  }

  static getExistingEntry(entryId: number): Promise<CashFlow.EntryDetailed> {
    return this.Http.get<CashFlow.EntryDetailed>(
      `/cashflow/entries/${entryId}`
    ).then(this.getData);
  }

  static updateExistingEntry(
    entryId: number,
    entryData: CashFlow.EntryInput
  ): Promise<CashFlow.EntryDetailed> {
    return this.Http.put<CashFlow.EntryDetailed>(
      `/cashflow/entries/${entryId}`,
      entryData
    ).then(this.getData);
  }

  static removeExistingEntry(entryId: number): Promise<{}> {
    return this.Http.delete<{}>(
      `/cashflow/entries/${entryId}`
    ).then(this.getData);
  }

  static insertNewEntry(entryData: CashFlow.EntryInput)
    : Promise<CashFlow.EntryDetailed> {
    return this.Http.post<CashFlow.EntryDetailed>(
      '/cashflow/entries/',
      entryData
    ).then(this.getData);
  }

  static removeEntriesBatch(entriesIds: number[]): Promise<{}> {
    return this.Http.put<{}>(
      '/cashflow/entries/bulk-removals',
      entriesIds
    ).then(this.getData);
  }

  static getAllCategories(query: {
    sort: [keyof CashFlow.CategorySummary, 'asc' | 'desc'];
  }): Promise<CashFlow.CategorySummary[]> {
    const queryString: string = generateQueryString(query);
    const uri: string = '/cashflow/categories'.concat(queryString);

    return this.Http.get<CashFlow.CategorySummary[]>(
      uri
    ).then(this.getData);
  }

  static insertNewCategory(
    categoryData: CashFlow.CategoryInput
  ): Promise<CashFlow.CategoryDetailed> {
    return this.Http.post<CashFlow.CategoryDetailed>(
      '/cashflow/categories',
      categoryData
    ).then(this.getData);
  }

  static getExistingCategory(categoryId: number)
    : Promise<CashFlow.CategoryDetailed> {
    return this.Http.get<CashFlow.CategoryDetailed>(
      `/cashflow/categories/${categoryId}`
    ).then(this.getData);
  }

  static updateExistingCategory(
    categoryId: number,
    categoryData: CashFlow.CategoryInput
  ): Promise<CashFlow.CategoryDetailed> {
    return this.Http.put<CashFlow.CategoryDetailed>(
      `/cashflow/categories/${categoryId}`,
      categoryData
    ).then(this.getData);
  }

  static removeExistingCategory(categoryId: number): Promise<{}> {
    return this.Http.delete<{}>(
      `/cashflow/categories/${categoryId}`
    ).then(this.getData);
  }
}

export default CashFlowService;