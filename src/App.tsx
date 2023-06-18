import React, { useState } from "react";
import { Input, Text } from '@chakra-ui/react'

const validate = (num: string) => {
  return /^[.,0-9]+$/.test(num);
}

const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});

export const App: React.FC = () => {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [number, setNumber] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");


  const checkIfEmpty = (n: string) => {
    if (!n) {
      setCurrency('');
      setNumber('');
      return true;
    }
    return false;
  }

  const onFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(number);
  };

  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsInvalid(false);

    const {
      target: { value }
    } = event;
    if (checkIfEmpty(value)) {return;}

    const newValue = formatter.format(value);
    
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
    <div style={{ padding: '130px' }}>
      <Input 
        value={currency}
        onChange={(e) => onChange(e)}
        onFocus={(e) => onFocus(e)}
        onBlur={(e) => onBlur(e)}
        placeholder="Enter an amount"
        isInvalid={isInvalid}
        errorBorderColor='crimson'
      />
      <br/><br/>
      {
        currency && (
          <Text fontSize="3xl">{currency}</Text>
        )
      }
    </div>
  )
}
