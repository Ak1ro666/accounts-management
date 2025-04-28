import { createStrictContext } from "@/shared/infastructure/strict-context";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ReactNode, useState, useTransition } from "react";

type ConfirmationState = {
  onCancel?: () => Promise<void> | void;
  onConfirm?: () => Promise<void> | void;
  title: string;
  content: string;
  confirmationText?: string;
  cancelText?: string;
};

type ConfirmationContextType = {
  open: (state: ConfirmationState) => void;
  openAsync: (
    state: ConfirmationState,
  ) => Promise<{ type: "cancel" } | { type: "confirm" }>;
};

const ConfirmationContext = createStrictContext<ConfirmationContextType>();

export function useConfirmation() {
  return ConfirmationContext.use();
}

export function Layout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, setState] = useState<ConfirmationState | null>(null);

  const [isLoading, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      if (state?.onConfirm) {
        await state.onConfirm();
      }

      setIsOpen(false);
    });
  };

  const handleClose = () => {
    startTransition(async () => {
      if (state?.onCancel) {
        await state.onCancel();
      }

      setIsOpen(false);
    });
  };

  const open = (state: ConfirmationState) => {
    setState(state);
    setIsOpen(true);
  };

  const openAsync = async (state: ConfirmationState) => {
    return new Promise<{ type: "cancel" } | { type: "confirm" }>((resolve) => {
      open({
        ...state,
        onConfirm: async () => {
          await state.onConfirm?.();
          resolve({ type: "confirm" });
        },
        onCancel: async () => {
          await state.onCancel?.();
          resolve({ type: "cancel" });
        },
      });
    });
  };

  return (
    <ConfirmationContext.Provider
      value={{
        open,
        openAsync,
      }}
    >
      {children}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{state?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {state?.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isLoading}
            onClick={handleClose}
            color="inherit"
            variant="contained"
          >
            {state?.cancelText ?? "Cancel"}
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleConfirm}
            color="error"
            variant="contained"
            autoFocus
          >
            {state?.confirmationText ?? "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmationContext.Provider>
  );
}
