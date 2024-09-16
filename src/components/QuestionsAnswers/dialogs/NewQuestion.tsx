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
import { newQuestionFormat } from "@/types";
import { BaseSyntheticEvent, FC, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type NewQuestionProps = {
  open: boolean;
  onClose: () => void;
};

const BASE_NEW_QUESTION: newQuestionFormat = {
  question: "",
  alternativeQuestions: [],
  answers: [""],
};

export const NewQuestion: FC<NewQuestionProps> = ({ open, onClose }) => {
  const [data, setData] = useState<newQuestionFormat>(BASE_NEW_QUESTION);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const onChange = (value: string, field: string, index: number = 0) => {
    if (field === "question") {
      setData((d) => ({ ...d, [field]: value }));
    } else if (field === "alternativeQuestions" || field === "answers") {
      setData((d: newQuestionFormat) => ({
        ...d,
        [field]: d[field].map((item, i) => (i === index ? value : item)),
      }));
    }
  };

  const onCreate = async () => {
    if (data.question === "") {
      console.log("Question is required");
      return;
    }
    setCreating(true);
    fetch("/api/questions", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Success");
        console.log(res);
        toast({
          title: "Question added successfully",
          description: "The question was added successfully",
        });
        onClose();
      })
      .catch((err) => {
        console.log("ERROR", err);
      })
      .finally(() => {
        setCreating(false);
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
          <DialogTitle>Create Question</DialogTitle>
          <DialogDescription>
            Add a new question to the Questions Answers Manager.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="picture">Question</Label>
            <Input
              id="picture"
              type="text"
              value={data.question}
              onChange={(e: BaseSyntheticEvent) => {
                onChange(e.target.value, "question");
              }}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label>Alternative question</Label>
            {data.alternativeQuestions.map((altQuestion, index) => (
              <Input
                key={`alt-q-${index}`}
                type="text"
                value={altQuestion}
                onChange={(e: BaseSyntheticEvent) => {
                  onChange(e.target.value, "alternativeQuestions", index);
                }}
              />
            ))}
            <Button
              onClick={() => {
                setData((d) => ({
                  ...d,
                  alternativeQuestions: [...d.alternativeQuestions, ""],
                }));
              }}
              variant="outline"
            >
              + Add Alternative Question
            </Button>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label>Answers</Label>
            {data.answers.map((answer, index) => (
              <Textarea
                key={`ans_${index}`}
                value={answer}
                onChange={(e: BaseSyntheticEvent) => {
                  onChange(e.target.value, "answers", index);
                }}
              />
            ))}
            <Button
              onClick={() => {
                setData((d) => ({ ...d, answers: [...d.answers, ""] }));
              }}
              variant="outline"
            >
              + Add Answer
            </Button>
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
