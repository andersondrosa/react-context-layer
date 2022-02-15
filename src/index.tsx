import React, { FunctionComponent, ReactNode } from 'react';
import mergeDeepRight from './mergeDeepRight';

const context = React.createContext({});

const useContext = () => {
  const data = React.useContext(context);
  return { data };
};

export type ContextProps = { children?: ReactNode; data: object };

const Context = ({ data, children }: ContextProps) => {
  return <context.Provider value={data}>{children}</context.Provider>;
};

export type ContextLayerProps = {
  children?: ReactNode;
  map?: Function;
  data?: object;
  merge?: boolean;
};

Context.layer = ({ children, data, merge, map }: ContextLayerProps) => {
  const rootData = React.useContext(context);
  const value = !merge
    ? Object.assign({}, rootData, data)
    : mergeDeepRight(rootData, data);
  return (
    <context.Provider value={map ? map(value) : value}>
      {children}
    </context.Provider>
  );
};

export type ConsumerProps = {
  children?: any;
  map?: Function;
};

const Consumer = ({ children: Child, map }: ConsumerProps) => {
  return (
    <context.Consumer>
      {(values: any) => <Child {...(map ? map(values) : values)} />}
    </context.Consumer>
  );
};

export type ConnectProps = {
  data?: object;
  merge?: boolean;
};

const connect = (Component: FunctionComponent, map?: Function) => {
  return ({ data, merge }: ConnectProps) => {
    return (
      <context.Consumer>
        {(values: object) => {
          if (data) {
            values = !merge
              ? Object.assign({}, values, data)
              : mergeDeepRight(values, data);
          }
          return <Component {...(map ? map(values) : values)} />;
        }}
      </context.Consumer>
    );
  };
};

export { Context, useContext, Consumer, connect };
