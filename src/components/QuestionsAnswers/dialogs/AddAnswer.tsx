import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { questionType } from "@/types";
import { BaseSyntheticEvent, FC, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type AddAnswerProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  question: questionType;
};

export const AddAnswer: FC<AddAnswerProps> = ({
  open,
  onClose,
  onCreated,
  question,
}) => {
  const [answer, setAnswer] = useState<string>("");
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const onCreate = async () => {
    fetch(`/api/questions/${question.id}/add-answer`, {
      method: "POST",
      body: JSON.stringify({ answer }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Success");
        console.log(res);
        toast({
          title: "Answer added successfully",
          description: "The answer was added successfully",
        });
        // onClose();
        onCreated();
      })
      .catch((err) => {
        console.log("ERROR", err);
      })
      .finally(() => {
        setCreating(false);
      });
  };

  const improveTextByAI = async () => {
    fetch("/api/ai/improve-answer", {
      method: "POST",
      body: JSON.stringify({ text: answer }),
    })
      .then((res) => res.json())
      .then((res) => {
        setAnswer(res);
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
          <DialogTitle>Add answer</DialogTitle>
          <DialogDescription>Add an Answer to the Questions.</DialogDescription>
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
          <Button onClick={onCreate} disabled={creating}>
            {creating ? "Creating" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
