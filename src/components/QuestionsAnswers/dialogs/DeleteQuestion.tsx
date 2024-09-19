import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { newQuestionFormat, questionType } from "@/types";
import { BaseSyntheticEvent, FC, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type NewQuestionProps = {
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
  question: questionType;
};

export const DeleteQuestion: FC<NewQuestionProps> = ({
  open,
  onClose,
  onDeleted,
  question,
}) => {
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const onDelete = () => {
    setDeleting(true);
    fetch(`/api/questions/${question.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        toast({
          title: "Success",
          description: "Question deleted successfully",
        });
        onDeleted();
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to delete question",
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
            Remove this question from the database. This action cannot be
            undone.
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