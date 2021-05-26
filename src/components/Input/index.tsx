import React, {
  useMemo,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useField } from '@unform/core';

import styles from '../../styles.json';

import { Container, TextInput } from './style';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {};
  textarea?: Boolean;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, containerStyle = {}, textarea, ...rest },
  ref,
) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputElementRef = useRef<any>(null);

  const [isFocus, setIsFocus] = useState(false);

  const iconColor = useMemo(() => {
    if (isFocus) {
      return styles.secondary;
    } else if (error) {
      return '#c53030';
    } else {
      return 'rgba(255, 255, 255, 0.5)';
    }
  }, [error, isFocus]);

  const handleIsInputFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleIsInputBlur = useCallback(() => {
    setIsFocus(false);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isFocus={isFocus}
      isError={!!error}
      style={containerStyle}
      textarea={!!textarea}
    >
      <Icon name={icon} size={20} color={iconColor} />

      <TextInput
        ref={inputElementRef}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        defaultValue={defaultValue}
        onFocus={handleIsInputFocus}
        onBlur={handleIsInputBlur}
        onChangeText={(value) => (inputValueRef.current.value = value)}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
