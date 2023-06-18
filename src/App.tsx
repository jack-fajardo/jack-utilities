import React, { useState } from "react";
import { Input, Text } from '@chakra-ui/react'

const CURRENCY_CODE = '$';

const format = (num: string) => {
  return num.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

export const App: React.FC = () => {
  const [number, setNumber] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");

  const onFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(number);
  };

  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    const newValue = formatter.format(value);

    setCurrency(newValue);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;

    setCurrency(value);
    setNumber(value);
  };

  return (
    <div style={{ padding: '130px' }}>
      <Input 
        value={currency}
        onChange={(e) => onChange(e)}
        onFocus={(e) => onFocus(e)}
        onBlur={(e) => onBlur(e)}
        placeholder="Enter an amount"
      />
      <br/><br/>
      {
        currency && (
          <Text fontSize="3xl">{CURRENCY_CODE} {currency}</Text>
        )
      }
    </div>
  )
}
