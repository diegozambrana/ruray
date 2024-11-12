import { Badge } from "@/components/ui/badge";
import {
  questionsAnswersType,
  useQuestionsAnswers,
} from "@/hooks/useQuestionsAnswers";
import { useEffect } from "react";

export const Sidebar = () => {
  const { tags, setTags } = useQuestionsAnswers(
    (state: questionsAnswersType) => state
  );

  const loadTags = () => {
    fetch("/api/tag")
      .then((res) => res.json())
      .then((res) => {
        setTags(res);
      });
  };

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <div className="w-72 p-4 bg-gray-100">
      <h3 className="font-bold">Tags:</h3>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <Badge key={tag.id}>{tag.name}</Badge>
        ))}
      </div>
    </div>
  );
};
