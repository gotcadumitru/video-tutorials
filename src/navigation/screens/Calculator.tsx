import { Text } from '@react-navigation/elements';
import { StaticScreenProps } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

type Props = StaticScreenProps<{}>;

type Operator = '+' | '-' | '×' | '÷' | null;

const buttonColors = {
  number: '#333333',
  operator: '#FF9500',
  function: '#505050',
  equals: '#FF9500',
};

const textColors = {
  number: '#FFFFFF',
  operator: '#FFFFFF',
  function: '#FFFFFF',
  equals: '#FFFFFF',
};


export function Calculator({}: Props) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumberPress = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperatorPress = (op: Operator) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operator) {
      const result = calculateResult(previousValue, currentValue, operator);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperator(op);
    setShouldResetDisplay(true);
  };

  const calculateResult = (prev: number, current: number, op: Operator): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operator && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculateResult(previousValue, currentValue, operator);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperator(null);
      setShouldResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setShouldResetDisplay(false);
  };

  const handlePlusMinus = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };
const Button = ({
  value,
  onPress,
  type = 'number',
  span = 1,
}: {
  value: string;
  onPress: () => void;
  type?: 'number' | 'operator' | 'function' | 'equals';
  span?: number;
}) => {
  return (
    <TouchableOpacity
      style={{
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        backgroundColor: buttonColors[type],
        width: span === 2 ? '48%' : '22.5%',
        borderRadius: span === 2 ? 40 : 80,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={{
          fontWeight: '400',
          color: textColors[type],
          fontSize: type === 'function' ? 32 : 36,
          ...(span === 2 && {
            alignSelf: 'flex-start',
            marginLeft: 32,
          }),
        }}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
};

  
  return (
    <View style={{
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 16,
      backgroundColor: '#000000'
    }}>
      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}>
        <Text style={{
          fontSize: 80,
          fontWeight: '300',
          color: '#FFFFFF'
        }}>
          {display.length > 9 ? parseFloat(display).toExponential(5) : display}
        </Text>
      </View>

      <View style={{
        gap: 12,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <Button value="C" onPress={handleClear} type="function" />
          <Button value="±" onPress={handlePlusMinus} type="function" />
          <Button value="%" onPress={handlePercent} type="function" />
          <Button value="÷" onPress={() => handleOperatorPress('÷')} type="operator" />
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <Button value="7" onPress={() => handleNumberPress('7')} />
          <Button value="8" onPress={() => handleNumberPress('8')} />
          <Button value="9" onPress={() => handleNumberPress('9')} />
          <Button value="×" onPress={() => handleOperatorPress('×')} type="operator" />
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <Button value="4" onPress={() => handleNumberPress('4')} />
          <Button value="5" onPress={() => handleNumberPress('5')} />
          <Button value="6" onPress={() => handleNumberPress('6')} />
          <Button value="-" onPress={() => handleOperatorPress('-')} type="operator" />
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <Button value="1" onPress={() => handleNumberPress('1')} />
          <Button value="2" onPress={() => handleNumberPress('2')} />
          <Button value="3" onPress={() => handleNumberPress('3')} />
          <Button value="+" onPress={() => handleOperatorPress('+')} type="operator" />
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <Button value="0" onPress={() => handleNumberPress('0')} span={2} />
          <Button value="." onPress={handleDecimal} />
          <Button value="=" onPress={handleEquals} type="equals" />
        </View>
      </View>
    </View>
  );
}

