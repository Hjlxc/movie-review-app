import React from 'react';
import { Switch } from 'antd';

export default function({ checked, onChange }) {
  return <Switch checked={checked} onChange={onChange} />;
}
