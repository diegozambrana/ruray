import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { questionAlternative, questionType, TagType } from "@/types";
import { BaseSyntheticEvent, FC, use, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TagManager } from "@/components/TagManager";

type NewQuestionProps = {
  open: boolean;
  question: questionType;
  onClose: () => void;
  onEdited: () => void;
};

type questionEditType = {
  id: string;
  question: string;
  alternativeQuestions: questionAlternative[];
  tags: TagType[];
};

const QUESTION_EDIT_BASE: questionEditType = {
  id: "",
  question: "",
  alternativeQuestions: [],
  tags: [],
};

export const EditQuestion: FC<NewQuestionProps> = ({
  open,
  question,
  onClose,
  onEdited,
}) => {
  const [data, setData] = useState<questionEditType>(QUESTION_EDIT_BASE);
  const [updating, setUpdating] = useState(false);
  const [newAlternativeQuestion, setNewAlternativeQuestion] = useState<
    string[]
  >([]);
  const { toast } = useToast();

  useEffect(() => {
    if (data.id !== question.id) {
      setData({
        id: question.id,
        question: question.question,
        alternativeQuestions: [...question.alternativeQuestions],
        tags: [...question.tags],
      });
    }
  }, [question, data]);

  type updateDataType = {
    question?: string | null;
    newAlternativeQuestions: string[];
    newTags: string[];
    removedAlterntaiveQuestions: string[];
    removedTags: string[];
  };

  const onUpdate = async () => {
    const oldTagsIds = question.tags.map((tag) => tag.id);
    const currentTagsIds = data.tags.map((tag) => tag.id);
    const oldAlternativeQuestionsIds = question.alternativeQuestions.map(
      (altQuestion) => altQuestion.id
    );
    const currentAlternativeQuestionsIds = data.alternativeQuestions.map(
      (altQuestion) => altQuestion.id
    );

    let updateData: updateDataType = {
      newAlternativeQuestions: newAlternativeQuestion,
      newTags: currentTagsIds.filter((tagId) => !oldTagsIds.includes(tagId)),
      removedAlterntaiveQuestions: oldAlternativeQuestionsIds.filter(
        (altQuestionId) =>
          !currentAlternativeQuestionsIds.includes(altQuestionId)
      ),
      removedTags: oldTagsIds.filter(
        (tagId) => !currentTagsIds.includes(tagId)
      ),
    };
    if (data.question !== question.question) {
      updateData.question = data.question;
    }

    fetch(`/api/questions/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((res) => {
        toast({
          title: "Question updated successfully",
          description: "The question was updated successfully",
        });
        onEdited();
      })
      .catch((err) => {
        console.log("ERROR", err);
      })
      .finally(() => {
        setUpdating(false);
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
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="picture">Question</Label>
            <Input
              id="picture"
              type="text"
              value={data.question}
              onChange={(e: BaseSyntheticEvent) => {
                setData((d) => ({ ...d, question: e.target.value }));
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
                  value={altQuestion.question}
                  onChange={(e: BaseSyntheticEvent) => {
                    if (data === null) return;
                    setData((d) => ({
                      ...d,
                      alternativeQuestions: d.alternativeQuestions.map(
                        (item, i) =>
                          i === index
                            ? { ...item, question: e.target.value }
                            : item
                      ),
                    }));
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
            {newAlternativeQuestion.map((altQuestion, index) => (
              <div key={`alt-q-${index}`} className="flex mt-1">
                <Input
                  type="text"
                  value={altQuestion}
                  onChange={(e: BaseSyntheticEvent) => {
                    if (data === null) return;
                    setNewAlternativeQuestion((d) =>
                      d.map((item, i) => (i === index ? e.target.value : item))
                    );
                  }}
                />
                <Button
                  onClick={() => {
                    setNewAlternativeQuestion((d) =>
                      d.filter((_, i) => i !== index)
                    );
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
                setNewAlternativeQuestion((d) => [...d, ""]);
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
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onUpdate} disabled={updating}>
            {updating ? "Updating" : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
