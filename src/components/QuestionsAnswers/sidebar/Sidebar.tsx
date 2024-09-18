import { Badge } from "@/components/ui/badge";
import { MATCHERS, ORIGINS, TAGS } from "@/constants/storageKeys";
import {
  questionsAnswersType,
  useQuestionsAnswers,
} from "@/hooks/useQuestionsAnswers";
import {
  getObjectFromLocalStorage,
  setObjectToLocalStorage,
} from "@/utils/storage";
import { useEffect } from "react";

export const Sidebar = () => {
  const { tags, matchers, origins, setTags, setMatchers, setOrigins } =
    useQuestionsAnswers((state: questionsAnswersType) => state);

  const loadTags = () => {
    fetch("/api/tag")
      .then((res) => res.json())
      .then((res) => {
        setObjectToLocalStorage(TAGS, res);
        setTags(res);
      });
  };

  const loadMatchers = () => {
    fetch("/api/matcher")
      .then((res) => res.json())
      .then((res) => {
        setObjectToLocalStorage(MATCHERS, res);
        setMatchers(res);
      });
  };

  const loadOrigins = () => {
    fetch("/api/origin")
      .then((res) => res.json())
      .then((res) => {
        setObjectToLocalStorage(ORIGINS, res);
        setOrigins(res);
      });
  };

  useEffect(() => {
    const dataTags = getObjectFromLocalStorage(TAGS);
    const dataMatchers = getObjectFromLocalStorage(MATCHERS);
    const dataOrigins = getObjectFromLocalStorage(ORIGINS);

    if (dataTags) {
      setTags(dataTags);
    } else {
      loadTags();
    }

    if (dataMatchers) {
      setMatchers(dataMatchers);
    } else {
      loadMatchers();
    }

    if (dataOrigins) {
      setOrigins(dataOrigins);
    } else {
      loadOrigins();
    }
  }, []);

  return (
    <div className="w-1/3 p-4 bg-gray-100">
      <h3 className="font-bold">Tags:</h3>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <Badge key={tag.id}>{tag.name}</Badge>
        ))}
      </div>
      <h3 className="font-bold mt-4">origin</h3>
      <div className="flex flex-wrap gap-2 mt-4">
        {origins.map((origin) => (
          <Badge key={origin.id}>{origin.name}</Badge>
        ))}
      </div>
      <h3 className="font-bold mt-4">Matcher</h3>
      <div className="flex flex-wrap gap-2 mt-4">
        {matchers.map((matcher) => (
          <Badge key={matcher.id}>{matcher["full_name"]}</Badge>
        ))}
      </div>
    </div>
  );
};
