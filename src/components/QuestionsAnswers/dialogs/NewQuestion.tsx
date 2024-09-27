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
import { newQuestionFormat, TagType } from "@/types";
import { BaseSyntheticEvent, FC, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TagManager } from "@/components/TagManager";

type NewQuestionProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

const BASE_NEW_QUESTION: newQuestionFormat = {
  question: "",
  alternativeQuestions: [],
  answers: [],
  tags: [],
};

export const NewQuestion: FC<NewQuestionProps> = ({
  open,
  onClose,
  onCreated,
}) => {
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
      body: JSON.stringify({ ...data, tags: data.tags.map((tag) => tag.id) }),
    })
      .then((res) => res.json())
      .then((res) => {
        toast({
          title: "Question added successfully",
          description: "The question was added successfully",
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
            {data.alternativeQuestions.length === 0 && (
              <p className="text-sm text-gray-500">
                Add alternative questions to help users find the question.
              </p>
            )}
            {data.alternativeQuestions.map((altQuestion, index) => (
              <div key={`alt-q-${index}`} className="flex mt-1">
                <Input
                  type="text"
                  value={altQuestion}
                  onChange={(e: BaseSyntheticEvent) => {
                    onChange(e.target.value, "alternativeQuestions", index);
                  }}
                />
                <Button
                  onClick={() => {
                    setData((d) => ({
                      ...d,
                      alternativeQuestions: d.alternativeQuestions.filter(
                        (_, i) => i !== index
                      ),
                    }));
                  }}
                  variant="outline"
                  className="ml-2"
                >
                  X
                </Button>
              </div>
            ))}
            <Button
              className="mt-2"
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
            <Label>Tags</Label>
            <TagManager
              tags={data.tags}
              onChangeTags={(tags) => setData((d) => ({ ...d, tags }))}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label>Answers</Label>
            {data.answers.length === 0 && (
              <p className="text-sm text-gray-500">
                Add answers to the question.
              </p>
            )}
            {data.answers.map((answer, index) => (
              <div key={`ans_${index}`} className="flex mt-1">
                <Textarea
                  value={answer}
                  onChange={(e: BaseSyntheticEvent) => {
                    onChange(e.target.value, "answers", index);
                  }}
                />
                <Button
                  onClick={() => {
                    setData((d) => ({
                      ...d,
                      answers: d.answers.filter((_, i) => i !== index),
                    }));
                  }}
                  variant="outline"
                  className="ml-2"
                >
                  X
                </Button>
              </div>
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
