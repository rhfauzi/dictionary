import { Layout, Menu } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Header: HeaderAntd } = Layout;

export const Header = ({
  onClick,
  selectedKeys,
  items,
  withMenu = true,
  headerStyle = {},
  children = {},
}) => (
    <BaseHeader
      style={{
        padding: 0,
        ...headerStyle,
        position: 'sticky',
        top: 0,
        zIndex: '999',
      }}
    >
      <Container>
        {withMenu && (
          <BaseMenu
            onClick={onClick}
            selectedKeys={selectedKeys}
            mode={'horizontal'}
          >
            {items?.map((data, key) => (
              <BaseMenuItem key={key}>{data.label}</BaseMenuItem>
            ))}
          </BaseMenu>
        )}
        {children}
      </Container>
    </BaseHeader>
);

const BaseHeader = styled(HeaderAntd)`
  && {
    background-color: #2771C7 !important;
    color: white;
  }

  .ant-menu {
    background-color: #2771C7 !important;
    height: 65px;

    .ant-menu-item-selected {
      color: white !important;
      border-bottom: 4px solid #fff;
      
      ::after {
        border-bottom: 0px solid #fff !important;
      }
    }
  }

  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected {
    color: #2bbecb;
  }

  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected::after {
    border-bottom: 2px solid #2bbecb;
  }

  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active {
    color: #2bbecb !important;
  }
`;

const BaseMenu = styled(Menu)`
  width: 100%;
  && {
    color: #888888;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BaseMenuItem = styled(BaseMenu.Item)`
background-color: #2771C7 !important;
color: white;
`;