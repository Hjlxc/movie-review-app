import React from 'react';

import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default function({ select, options, onChange }) {
  const menu = (
    <Menu onClick={onChange}>
      {options.map((option) => (
        <Menu.Item key={option}>{option}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {select || 'Sort by Feature'} <DownOutlined />
      </a>
    </Dropdown>
  );
}
