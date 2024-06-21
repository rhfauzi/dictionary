import React from 'react';
import { Dropdown } from 'antd';

const MenuLogout = ({ children, menu }) => <Dropdown overlay={menu}>{children}</Dropdown>;

export { MenuLogout };
