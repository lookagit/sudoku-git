import React from 'react';
import { InputProps } from '../types';

const Input = ({ isFixed, isSolved, handleChange, value }: InputProps) => (
  <input
    style={{ backgroundColor: "#FFF" }}
    className={isFixed ? 'fixed' : isSolved ? 'result' : ''}
    disabled={isFixed || isSolved}
    value={value ? value : ''}
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event.target.value)}
  />
)

export default Input;