type IToastType = 'NO_CONNECTION' | 'SUCCESSFUL' | 'CARD_LIMIT';

interface IToastContext {
  onToast: (type: IToastType) => void;
}

export { IToastContext, IToastType };
