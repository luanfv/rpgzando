interface IModalConfirm {
  title: string;
  description: string;
  isVisible: boolean;
  isAttention?: boolean;

  onClose: () => void;
  onConfirm: () => void;
}

export { IModalConfirm };
