import React from 'react';
import { Input } from 'antd';

export default function({ placeholder, onSearch }) {
  return (
    <Input.Search placeholder={placeholder} onSearch={onSearch} enterButton />
  );
}
