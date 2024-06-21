import React from 'react';

export const PermissionContext = React.createContext({
  arrayPermission: [],
  setArrayPermission: (value: any[]) => {},
});