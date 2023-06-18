import React, { useState } from "react";
import { Input, Text } from '@chakra-ui/react'
import { CURRENCIES } from '../src/constants.js' ;

const flag = 1;

export const App: React.FC = () => {
  const [locale] = useState<string>(CURRENCIES[flag].locale);
  const [currencyCode] = useState<string>(CURRENCIES[flag].currency);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [number, setNumber] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");

  const validate = (num: string) => {
    return /^[.,0-9]+$/.test(num);
  }

  const checkIfEmpty = (n: string) => {
    if (!n) {
      setCurrency('');
      setNumber('');
      return true;
    }
    return false;
  }

  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsInvalid(false);

    const {
      target: { value }
    } = event;
    if (checkIfEmpty(value)) {return;}

    const newValue = new Intl.NumberFormat(
      locale, 
      { style: 'currency', currency: currencyCode }
    ).format(value);
    
    if (newValue.toString().includes("NaN")) {
      setIsInvalid(true);
      setCurrency(number);
      return;
    }

    setCurrency(newValue);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;

    if (checkIfEmpty(value)) {return;}

    const lastChar = value[value.length - 1];
    const pass = validate(lastChar);
       
    if (!pass) {return;}
    setCurrency(value);
    setNumber(value);
  };

  return (
    <div>
      <div style={{ display: 'flex', padding: '130px' }}>
        <Input 
          value={currency}
          onChange={(e) => onChange(e)}
          onFocus={() => setCurrency(number)}
          onBlur={(e) => onBlur(e)}
          placeholder="Enter an amount"
          isInvalid={isInvalid}
          errorBorderColor='crimson'
        />
      </div>
      
      <div style={{ marginLeft: '130px' }}>
      {
        currency && (
          <Text fontSize="3xl">{currency}</Text>
        )
      }
      </div>
    </div>
  )
}
