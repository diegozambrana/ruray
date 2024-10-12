import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { answerType } from "@/types";
import { BaseSyntheticEvent, FC, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type EditAnswerProps = {
  open: boolean;
  onClose: () => void;
  onEdited: () => void;
  answerSelected: answerType;
};

export const EditAnswer: FC<EditAnswerProps> = ({
  open,
  onClose,
  onEdited,
  answerSelected,
}) => {
  const [answer, setAnswer] = useState<string>("");
  const [editing, setEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (answerSelected.answer !== answer) {
      setAnswer(answerSelected.answer);
    }
  }, [answerSelected]);

  const onEditAnswer = async () => {
    fetch(`/api/answer/${answerSelected.id}`, {
      method: "PUT",
      body: JSON.stringify({ answer }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Success");
        console.log(res);
        toast({
          title: "Answer edited successfully",
          description: "The answer was edited successfully",
        });
        onEdited();
      })
      .catch((err) => {
        console.log("ERROR", err);
      })
      .finally(() => {
        setEditing(false);
      });
  };

  const improveTextByAI = async () => {
    fetch("/api/ai/improve-answer", {
      method: "POST",
      body: JSON.stringify({ text: answer }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setAnswer(res.text);
        toast({
          title: "Text improved",
          description: "The text was improved by AI",
        });
      })
      .catch((err) => {
        console.log("ERROR", err);
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
          <DialogTitle>Edit answer</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label>Answer</Label>
            <Textarea
              value={answer}
              onChange={(e: BaseSyntheticEvent) => {
                setAnswer(e.target.value);
              }}
            />
            <div className="text-right mt-2">
              <Button onClick={improveTextByAI} size="sm">
                Improve by AI
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onEditAnswer} disabled={editing}>
            {editing ? "Updating" : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
