export interface IPagination<T> {
  previousPage: IPagination<T> | null;
  nextPage: IPagination<T> | null;
  pageNumber: number;
  page: T[];
}

function createPage<T>(): IPagination<T> {
  return {
    previousPage: null,
    nextPage: null,
    pageNumber: 1,
    page: [],
  };
}

export function createPagination<T>(
  data: T[],
  pageSize: number,
): IPagination<T> {
  const result = createPage<T>();
  let node = result;
  let iteration = 1;
  for (let i = 0; i < data.length; i++) {
    if (iteration > pageSize) {
      node.nextPage = createPage<T>();
      node.nextPage.previousPage = node;
      node.nextPage.pageNumber = node.pageNumber + 1;
      node = node.nextPage;
      iteration = 1;
    }
    node.page.push(data[i]);
    iteration++;
  }
  return result;
}
