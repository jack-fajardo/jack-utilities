import React, { useState, useRef, useEffect } from "react";
import { Input, Text } from '@chakra-ui/react'

const CURRENCY_CODE = '$';
const MAX_NO_OF_DECIMAL = 2;

const format = (num: string) => {
  return num.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const App: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const _input = useRef<React.RefObject<HTMLInputElement>>(null);
  const _cursor = useRef<number>(0);

  useEffect(() => {
    setCursor();
  }, [value]);

  const getCursor = (oldValue?: string, newValue?: string) => {
    const {
      current: { selectionStart }
    } = _input;
    const { length: newLength } = newValue || 0;
    const { length: oldLength } = oldValue || 0;
    const cursorCalc = newLength - oldLength + selectionStart;
    const cursorStart = selectionStart <= newLength ? selectionStart : 0;
    _cursor.current =
      cursorCalc >= 0 && cursorCalc <= newLength ? cursorCalc : cursorStart;
  };

  const setCursor = () => {
    const {
      current: { selectionStart, value: inputValue }
    } = _input;
    let cursor = _cursor.current;
    if (selectionStart < cursor && inputValue !== value) {
      cursor -= 1;
    }
    _input.current.value = value;
    _input.current.selectionEnd = cursor;
    _input.current.selectionStart = cursor;
  };

  const processData = (input?: string, blur: boolean) => {
    if (!input) return '';
    if (input.indexOf(".") >= 0) {
      const decimalPos = input.indexOf(".");
      let leftSide = input.substring(0, decimalPos);
      let rightSide = input.substring(decimalPos);
      leftSide = format(leftSide);
      rightSide = format(rightSide);
      if (blur) {
        rightSide += "00";
      }
      rightSide = rightSide.substring(0, MAX_NO_OF_DECIMAL);
      return leftSide + "." + rightSide;
    }
    
    if (blur) {
      return format(input) + '.00';
    }

    return format(input);
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, blur: boolean) => {
    const {
      target: { value }
    } = event;
    const formatted = processData(value, blur);
    getCursor(value, formatted);
    setValue(formatted);
  };

  return (
    <div style={{ padding: '130px' }}>
      <Input 
        ref={_input} 
        value={value}
        onChange={(e) => onChange(e, false)}
        onBlur={(e) => onChange(e, true)} 
        placeholder="Enter an amount"
      />
      <br/><br/>
      {
        value && (
          <Text fontSize="3xl">{CURRENCY_CODE} {value}</Text>
        )
      }
    </div>
  )
}
