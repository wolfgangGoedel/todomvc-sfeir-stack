import 'symbol-observable';
import { TestScheduler } from 'rxjs/testing';
import * as action from '../store/actions';
import { State } from '../store/state';

import { make as makeStore, Api } from '../store';
import { from } from 'rxjs';
import { distinctUntilChanged, skip } from 'rxjs/operators';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';

describe('store', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('load', () => {
    scheduler.run(({ hot, cold, expectObservable }) => {
      const actions = hot('a', { a: action.appReady() });
      const api = {
        loadAll: () =>
          cold('--(r|)', { r: [{ id: '1', description: 'one', done: false }] })
      };

      const store = makeStore(api as any);
      actions.subscribe(store.dispatch);

      const state$ = from(store as any).pipe(
        distinctUntilChanged(),
        skip(1)
      );

      expectObservable(state$).toBe('--s', {
        s: { todos: { '1': { id: '1', description: 'one', done: false } } }
      });
    });
  });

  const testState = (config: {
    actions: [string, { [marble: string]: action.Action }];
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
        { i: action.appReady(), a: action.todoAdded('dummy') }
      ],
      state: [
        '--i----e',
        {
          i: { todos: { '1': { id: '1', description: 'one', done: false } } },
          e: {
            todos: {
              '1': { id: '1', description: 'one', done: false },
              '2': { id: '2', description: 'two', done: false }
            }
          }
        }
      ],
      api: {
        loadAll: [
          '-(r|)',
          { r: [{ id: '1', description: 'one', done: false }] }
        ],
        addNew: ['--(r|)', { r: { id: '2', description: 'two', done: false } }]
      }
    }));
});
