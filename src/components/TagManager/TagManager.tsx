"use client";

import { TagType } from "@/types";
import { FC, useEffect, useMemo, useState } from "react";
import { ComboboxTags } from "../ui/ComboboxTags";
import { useQuestionsAnswers } from "@/hooks/useQuestionsAnswers";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

type TagManagerProps = {
  tags: TagType[];
  onChangeTags: (tags: TagType[]) => void;
};

export const TagManager: FC<TagManagerProps> = ({
  onChangeTags,
  tags: basedTag,
}) => {
  const { tags, setTags } = useQuestionsAnswers();
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  const filteredTags = useMemo(() => {
    return tags.filter((tag) => !selectedTags.includes(tag));
  }, [tags, selectedTags]);

  const removeTag = (tag: TagType) => {
    setSelectedTags((tags) => {
      const newTags = tags.filter((t) => t.id !== tag.id);
      return newTags;
    });
  };
  useEffect(() => {
    onChangeTags(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    if (basedTag?.length > 0) {
      setSelectedTags(basedTag);
    }
  }, [basedTag]);

  const addNewTag = (name: string) => {
    fetch("/api/tag", {
      method: "POST",
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((res) => {
        setSelectedTags([...selectedTags, res]);
        setTags([...tags, res]);
      });
  };

  return (
    <div>
      <ComboboxTags
        options={filteredTags}
        onSelect={(tag) => {
          setSelectedTags([...selectedTags, tag]);
        }}
        onCreate={addNewTag}
      />
      <div className="space-x-2 mt-4">
        {selectedTags.map((tag) => (
          <Badge key={tag.id} className="pr-1">
            {tag.name}{" "}
            <span className="ml-2">
              <X
                className="w-4 h-4 cursor-pointer hover:bg-black"
                onClick={() => removeTag(tag)}
              />
            </span>
          </Badge>
        ))}
      </div>
    </div>
  );
};
