import React, { useEffect, useState} from 'react';
import { inputValue } from '../redux/actions';
import { BoxProps } from '../types';
import Input from './Input';

export const Box = ({ value, column, row, isSolved, addInputValue }: BoxProps) => {
  const [isFixed, setIsFixed] = useState<boolean>(false);
  useEffect(() => setIsFixed(value ? true : false), []);

  const handleChange = (value: string) => {
		const range = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const val = parseInt(value);
		const isDeleted = value === '';

		if (range.indexOf(val) > -1 || isDeleted) {
			addInputValue(row, column, isDeleted ? 0 : val);
		}
	}

  return (
    <td>
      <Input
				value={value}
        isFixed={isFixed}
        isSolved={isSolved}
				handleChange={handleChange}
      />
		</td>
  )
}

export default Box;