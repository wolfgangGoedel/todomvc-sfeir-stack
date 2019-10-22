import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Todo } from '../store/state';

const API_ROOT = '//localhost:3001/api/tasks';

export const loadAll = () => ajax.getJSON<Todo[]>(API_ROOT);

export const addNew = (description: string) =>
  ajax
    .post(API_ROOT, { description }, { 'Content-Type': 'application/json' })
    .pipe(map(r => r.response as Todo));

export const patch = (
  id: string,
  patch: Partial<Pick<Todo, 'description' | 'done'>>
) =>
  ajax
    .patch(`${API_ROOT}/${id}`, patch, { 'Content-Type': 'application/json' })
    .pipe(map(r => r.response as Todo));
