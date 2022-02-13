import React from 'react';
import mergeDeepRight from './mergeDeepRight';

const context = React.createContext({});

const useContext = () => {
  const data = React.useContext(context);
  return { data };
};

const Context = ({ children, data, merge }: any) => {
  const rootData = React.useContext(context);
  const value = !merge
    ? Object.assign({}, rootData, data)
    : mergeDeepRight(rootData, data);
  return React.createElement(context.Provider, { value }, children);
};

export { Context, useContext };
