type IToastType = 'NO_CONNECTION' | 'SUCCESSFUL';

interface IToastContext {
  onToast: (type: IToastType) => void;
}

export { IToastContext, IToastType };
