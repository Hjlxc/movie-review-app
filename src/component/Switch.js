import React from 'react';
import { Switch } from 'antd';

export default function({ checked, onChange }) {
  return <Switch data-testid="switch" checked={checked} onChange={onChange} />;
}
