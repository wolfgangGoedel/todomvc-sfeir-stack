import 'symbol-observable';
import { TestScheduler } from 'rxjs/testing';
import { State, Action, TodoData, Todo } from '../store/model';
import { testState } from '../utils/storeTests';

import {
  make as makeStore,
  AppReady,
  TodoAdded,
  TodoRemoved,
  DoneSwitched
} from '../store';
import { from } from 'rxjs';
import { distinctUntilChanged, skip } from 'rxjs/operators';

const todo1: TodoData = { description: 'one', done: false };
const todo2: TodoData = { description: 'two', done: false };
const apiAll: Todo[] = [{ id: '2', ...todo2 }, { id: '1', ...todo1 }];

describe('store', () => {
  test('load', () => {
    const scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    scheduler.run(({ hot, cold, expectObservable }) => {
      const actions = hot('a', { a: AppReady() });
      const api = {
        getAll: () => cold('--(r|)', { r: apiAll })
      };

      const store = makeStore(api as any);
      actions.subscribe(store.dispatch);

      const state$ = from(store as any).pipe(
        distinctUntilChanged(),
        skip(1)
      );

      expectObservable(state$).toBe('--s', {
        s: {
          todosMap: { '1': todo1, '2': todo2 },
          todosOrd: ['2', '1']
        }
      });
    });
  });

  test('add', () => {
    testState<Action, State>({
      makeStore,
      api: {
        getAll: ['-(r|)', { r: apiAll }],
        post: ['--(r|)', { r: { id: '3', description: 'three', done: false } }]
      },
      actions: [
        '-i---a',
        {
          i: AppReady(),
          a: TodoAdded('dummy')
        }
      ],
      state: [
        '--i----e',
        {
          i: expect.anything(),
          e: {
            todosMap: {
              '1': todo1,
              '2': todo2,
              '3': { description: 'three', done: false }
            },
            todosOrd: ['2', '1', '3']
          }
        }
      ]
    });
  });

  test('remove', () => {
    testState<Action, State>({
      makeStore,
      api: {
        getAll: ['-(r|)', { r: apiAll }],
        delete: ['--(r|)', { r: true }]
      },
      actions: [
        '-i---d',
        {
          i: AppReady(),
          d: TodoRemoved('2')
        }
      ],
      state: [
        '--i----e',
        {
          i: expect.anything(),
          e: {
            todosMap: {
              '1': todo1
            },
            todosOrd: ['1']
          }
        }
      ]
    });
  });

  test('toggle', () => {
    testState<Action, State>({
      makeStore,
      api: {
        getAll: ['-(r|)', { r: apiAll }],
        patch: ['--(r|)', { r: { id: '1', ...todo1, done: true } }]
      },
      actions: [
        '-i---d',
        {
          i: AppReady(),
          d: DoneSwitched('1')
        }
      ],
      state: [
        '--i--e-e',
        {
          i: expect.anything(),
          e: {
            todosMap: {
              '1': { ...todo1, done: true },
              '2': todo2
            },
            todosOrd: ['2', '1']
          }
        }
      ]
    });
  });
});
