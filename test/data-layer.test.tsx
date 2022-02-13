import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Context, useContext } from '../src/index';

describe('it', () => {
  it('should works', () => {
    const div = document.createElement('div');

    const Json = () => {
      const { data } = useContext();
      console.log(data);
      return <div>{JSON.stringify(data)}</div>;
    };

    ReactDOM.render(
      <Context data={{ data: { name: 'ninja' } }} merge>
        <Json />
        <Context data={{ data: { samurai: 'Jack' } }} merge>
          <Json />
        </Context>
        <Json />
      </Context>,
      div
    );
  });
});
