import 'symbol-observable';
import { TestScheduler } from 'rxjs/testing';
import { State, Action } from '../store/model';

import { make as makeStore, AppReady, TodoAdded } from '../store';
import { from } from 'rxjs';
import { distinctUntilChanged, skip } from 'rxjs/operators';

describe('store', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('load', () => {
    scheduler.run(({ hot, cold, expectObservable }) => {
      const actions = hot('a', { a: AppReady() });
      const api = {
        getAll: () =>
          cold('--(r|)', { r: [{ id: '1', description: 'one', done: false }] })
      };

      const store = makeStore(api as any);
      actions.subscribe(store.dispatch);

      const state$ = from(store as any).pipe(
        distinctUntilChanged(),
        skip(1)
      );

      expectObservable(state$).toBe('--s', {
        s: {
          todosMap: { '1': { description: 'one', done: false } },
          todosOrd: ['1']
        }
      });
    });
  });

  const testState = (config: {
    actions: [string, { [marble: string]: Action }];
    state: [string, { [marble: string]: State }];
    api: { [func: string]: [string, { [marble: string]: any }] };
  }) =>
    scheduler.run(h => {
      const [actionMarbles, actionValues] = config.actions;
      const action$ = h.hot(actionMarbles, actionValues);
      const api = Object.fromEntries(
        Object.entries(config.api).map(([func, [marbles, mconf]]) => [
          func,
          () => h.cold(marbles, mconf)
        ])
      );
      const store = makeStore(api as any);
      action$.subscribe(store.dispatch);
      const state$ = from(store as any).pipe(
        distinctUntilChanged(),
        skip(1)
      );
      const [stateMarbles, stateValues] = config.state;
      h.expectObservable(state$).toBe(stateMarbles, stateValues);
    });

  test('add', () =>
    testState({
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
          i: {
            todosMap: { '1': { description: 'one', done: false } },
            todosOrd: ['1']
          },
          e: {
            todosMap: {
              '1': { description: 'one', done: false },
              '2': { description: 'two', done: false }
            },
            todosOrd: ['1', '2']
          }
        }
      ],
      api: {
        getAll: [
          '-(r|)',
          { r: [{ id: '1', description: 'one', done: false }] }
        ],
        post: ['--(r|)', { r: { id: '2', description: 'two', done: false } }]
      }
    }));
});
