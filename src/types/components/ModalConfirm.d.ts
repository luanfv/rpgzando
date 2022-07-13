interface IModalConfirm {
  title: string;
  description: string;
  isVisible: boolean;
  confirm: string;
  cancel: string;
  isAttention?: boolean;

  onClose: () => void;
  onConfirm: () => void;
}

export { IModalConfirm };
