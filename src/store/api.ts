import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Todo, Api } from './model';

export const make = (baseUrl: string): Api => {
  const idUrl = (id: string) => `${baseUrl}/${id}`;

  return {
    getAll: () => ajax.getJSON(baseUrl),

    post: todo =>
      ajax
        .post(baseUrl, todo, { 'Content-Type': 'application/json' })
        .pipe(map(r => r.response)),

    patch: (id, patch) =>
      ajax
        .patch(idUrl(id), patch, {
          'Content-Type': 'application/json'
        })
        .pipe(map(r => r.response as Todo)),

    delete: id => ajax.delete(idUrl(id)).pipe(map(_ => undefined))
  };
};
