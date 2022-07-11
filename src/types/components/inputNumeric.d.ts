interface IInputNumeric {
  title: string;
  value: number;
  min: number;
  max: number;
  random?: boolean;
  onChange: (value: number) => void;
  onBlur: () => void;
}

export { IInputNumeric };
