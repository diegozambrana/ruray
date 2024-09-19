import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { answer as answerType } from "@/types";
import { FC, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type DeleteAnswerProps = {
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
  answer: answerType;
};

export const DeleteAnswer: FC<DeleteAnswerProps> = ({
  open,
  onClose,
  onDeleted,
  answer,
}) => {
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const onDelete = () => {
    setDeleting(true);
    fetch(`/api/answer/${answer.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        toast({
          title: "Success",
          description: "Answer deleted successfully",
        });
        onDeleted();
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to delete answer",
        });
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        if (!e) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            Remove this answer from the database. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onDelete} disabled={deleting} variant="destructive">
            {deleting ? "Deleting" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
