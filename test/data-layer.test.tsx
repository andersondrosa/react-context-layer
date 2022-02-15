import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Context, Consumer, connect } from '../src/index';

import { assoc, pick, pipe } from 'ramda';
// import { path } from 'ramda';
// import { mergeDeepLeft } from 'ramda';

describe('it', () => {
  it('should works', () => {
    const div = document.createElement('div');

    const Log = (values: any) => {
      console.log(values);
      return <></>;
    };

    const LogWiFi = connect(Log);

    ReactDOM.render(
      <Context data={{ data: { name: 'init' } }}>
        <LogWiFi />
        <Context.layer data={{ data: { name2: 'Foo' }, last: 'data' }} merge>
          <LogWiFi />
          <Consumer map={(x: any) => ({ ...x, other: 'true' })}>{Log}</Consumer>
          <Context.layer data={{ data: { name: 'Bar' } }} merge>
            <Context.layer
              map={pipe(
                assoc('other-name', 'NAME'),
                assoc('other-label', 'LABEL')
              )}
            >
              <Consumer map={pick(['other-name', 'last'])}>{Log}</Consumer>
              <LogWiFi data={{ data: { name2: 'OKOK' } }} merge />
            </Context.layer>
          </Context.layer>
          <LogWiFi />
        </Context.layer>
        <LogWiFi merge data={{ data: { name2: 'ok' } }} />
      </Context>,
      div
    );
  });
});

// describe('it', () => {
//   it('should works', () => {
//     const div = document.createElement('div');

//     const Json = () => {
//       const { data } = useContext();
//       console.log(data);
//       return <div>{JSON.stringify(data)}</div>;
//     };

//     ReactDOM.render(
//       <Context data={{ data: { name: 'ninja' } }} merge>
//         <Json />
//         <Context data={{ data: { samurai: 'Jack' } }} merge>
//           <Json />
//         </Context>
//         <Json />
//       </Context>,
//       div
//     );
//   });
// });
