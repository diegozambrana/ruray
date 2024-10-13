"use client";

import {
  BaseSyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Markdown from "markdown-to-jsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Copy, EllipsisVertical, Pencil, Star, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/toaster";

import { EditQuestion, NewQuestion } from "./dialogs";
import { Sidebar } from "./sidebar";

import {
  questionsAnswersType,
  useQuestionsAnswers,
} from "@/hooks/useQuestionsAnswers";
import {
  getObjectFromLocalStorage,
  setObjectToLocalStorage,
} from "@/utils/storage";
import { QUESTION_ANSWER } from "@/constants/storageKeys";
import { useToast } from "@/hooks/use-toast";
import { DeleteQuestion } from "./dialogs/DeleteQuestion";
import { answerType, questionType, TagType } from "@/types";
import { DeleteAnswer } from "./dialogs/DeleteAnswer";
import { AddAnswer } from "./dialogs/AddAnswer";
import { EditAnswer } from "./dialogs/EditAnswer";
import { cn } from "@/lib/utils";
import { TagManager } from "../TagManager";

export const QuestionsAnswers = () => {
  const [openNewQuestion, setOpenNewQuestion] = useState(false);
  const [openEditQuestion, setOpenEditQuestion] = useState(false);
  const [openEditAnswer, setOpenEditAnswer] = useState(false);
  const [openDeleteAnswer, setOpenDeleteAnswer] = useState(false);
  const [openDeleteQuestion, setOpenDeleteQuestion] = useState(false);
  const [openAddAnswer, setOpenAddAnswer] = useState(false);
  const [filterTags, setFilterTags] = useState<TagType[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<questionType | null>(
    null
  );
  const [searchText, setSearchText] = useState<string>("");
  const [selectedAnswer, setSelectedAnswer] = useState<answerType | null>(null);
  const { questions, setQuestions } = useQuestionsAnswers(
    (state: questionsAnswersType) => state
  );
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredQuestions = useMemo(() => {
    let filteredQuestionsResult = [...questions];
    if (filterTags.length > 0) {
      filteredQuestionsResult = filteredQuestionsResult.filter((question) => {
        return filterTags
          .map((tag) => tag.id)
          .every((tag) => question.tags.map((tag) => tag.id).includes(tag));
      });
    }
    if (searchText !== "") {
      filteredQuestionsResult.filter((question) => {
        return (
          question.question.toLowerCase().includes(searchText.toLowerCase()) ||
          question.alternativeQuestions.some((alternativeQuestion) =>
            alternativeQuestion.question
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
        );
      });
    }
    return filteredQuestionsResult;
  }, [questions, searchText, filterTags]);

  const { toast } = useToast();

  const loadDataFromAPI = () => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((res) => {
        setObjectToLocalStorage(QUESTION_ANSWER, res);
        setQuestions(res);
      });
  };

  useEffect(() => {
    const data = getObjectFromLocalStorage(QUESTION_ANSWER);
    if (data) {
      setQuestions(data);
    } else {
      loadDataFromAPI();
    }
  }, []);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        toast({
          title: "Text Copied",
          description: "The text was copied to the clipboard",
        });
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  const addToFavorite = (answer: answerType) => {
    fetch(`/api/answer/${answer.id}`, {
      method: "PUT",
      body: JSON.stringify({ favorite: !answer.favorite }),
    })
      .then((res) => res.json())
      .then(() => {
        loadDataFromAPI();
        toast({
          title: "Answer added to favorite",
          description: "The answer was added to favorite",
        });
      });
  };

  const onSearch = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setSearchText(searchRef.current?.value || "");
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1>Questions Answers Manager</h1>
      </div>

      <div className="flex space-x-4">
        <div className="w-2/3">
          <div className="flex justify-between">
            <div>
              <Button
                onClick={() => {
                  setOpenNewQuestion(true);
                }}
              >
                + New Question
              </Button>
            </div>
            <div>
              <form onSubmit={onSearch}>
                <div className="flex">
                  <div className="relative mr-2">
                    <Input
                      placeholder="Search"
                      className="max-w-xs"
                      ref={searchRef}
                    />
                    {searchText !== "" && (
                      <X
                        className="absolute top-3 right-2 w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
                        onClick={() => {
                          setSearchText("");
                          if (searchRef.current) searchRef.current.value = "";
                        }}
                      />
                    )}
                  </div>
                  <Button type="submit">Search</Button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-4 flex">
            <div className="mr-4">Filter:</div>
            <div>
              <TagManager
                tags={filterTags}
                onChangeTags={(tags) => {
                  setFilterTags(tags);
                }}
                withoutAgregation
              />
            </div>
          </div>
          {searchText !== "" && (
            <div className="mt-4">
              <div className="text-gray-600">
                Showing results for: <strong>{searchText}</strong>
              </div>
            </div>
          )}
          {filteredQuestions.length === 0 && (
            <div className="mt-4 text-gray-500">
              No questions found for the search
            </div>
          )}
          <div className="mt-4">
            <Accordion type="multiple">
              {filteredQuestions.map((question) => (
                <AccordionItem
                  key={question.id}
                  value={question.id}
                  className="mb-4"
                >
                  <Card>
                    <CardContent className="py-4">
                      <div className="flex">
                        <div className="flex-grow">
                          <AccordionTrigger className="p-0 text-md font-bold text-left">
                            {question.question}
                          </AccordionTrigger>
                        </div>
                        <div className="ml-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <EllipsisVertical className="h-4 w-6" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => {
                                  setOpenEditQuestion(true);
                                  setSelectedQuestion(question);
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  setOpenDeleteQuestion(true);
                                  setSelectedQuestion(question);
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <AccordionContent>
                        {question.alternativeQuestions.map(
                          (alternativeQuestion) => (
                            <div
                              className="text-sm text-gray-500"
                              key={alternativeQuestion.id}
                            >
                              {alternativeQuestion.question}
                            </div>
                          )
                        )}
                        <div className="my-4 space-x-2">
                          {question.tags.map((tag) => (
                            <Badge key={tag.id}>{tag.name}</Badge>
                          ))}
                        </div>
                        <div className="mt-2 space-y-4">
                          {question.answers.length == 0 && (
                            <div className="text-gray-500">
                              No answers for this question
                            </div>
                          )}
                          {question.answers.map((answer) => (
                            <div
                              key={answer.id}
                              className={cn(
                                `flex justify-between px-4 py-2 rounded-lg`,
                                {
                                  "bg-blue-100": answer.favorite,
                                  "bg-gray-100": !answer.favorite,
                                }
                              )}
                            >
                              {answer.answer ? (
                                <Markdown className="md_container">
                                  {answer.answer}
                                </Markdown>
                              ) : (
                                <div className="text-gray-500">No answer</div>
                              )}
                              <div className="mt-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger>
                                    <EllipsisVertical className="h-4 w-8" />
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuItem
                                      onClick={() => copyText(answer.answer)}
                                    >
                                      <Copy className="h-4 w-4 mr-4" /> Copy
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        addToFavorite(answer);
                                      }}
                                    >
                                      {!answer.favorite ? (
                                        <>
                                          <Star className="h-4 w-4 mr-4" /> Add
                                          Favorite
                                        </>
                                      ) : (
                                        <>
                                          <Star className="h-4 w-4 mr-4" />{" "}
                                          Remove Favorite
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedAnswer(answer);
                                        setOpenEditAnswer(true);
                                      }}
                                    >
                                      <Pencil className="h-4 w-4 mr-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => {
                                        setSelectedAnswer(answer);
                                        setOpenDeleteAnswer(true);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4 mr-4" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}

                          <div className="flex justify-end">
                            <Button
                              onClick={() => {
                                setSelectedQuestion(question);
                                setOpenAddAnswer(true);
                              }}
                            >
                              + Add Answer
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </CardContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <Sidebar />
      </div>
      <NewQuestion
        open={openNewQuestion}
        onClose={() => {
          setOpenNewQuestion(false);
        }}
        onCreated={() => {
          setOpenNewQuestion(false);
          loadDataFromAPI();
        }}
      />
      {selectedQuestion && (
        <DeleteQuestion
          open={openDeleteQuestion}
          onClose={() => {
            setOpenDeleteQuestion(false);
          }}
          onDeleted={() => {
            setSelectedQuestion(null);
            setOpenDeleteQuestion(false);
            loadDataFromAPI();
          }}
          question={selectedQuestion}
        />
      )}
      {selectedAnswer && (
        <DeleteAnswer
          open={openDeleteAnswer}
          onClose={() => {
            setOpenDeleteAnswer(false);
          }}
          onDeleted={() => {
            setSelectedAnswer(null);
            setOpenDeleteAnswer(false);
            loadDataFromAPI();
          }}
          answer={selectedAnswer}
        />
      )}
      {selectedQuestion && (
        <AddAnswer
          open={openAddAnswer}
          onClose={() => {
            setOpenAddAnswer(false);
          }}
          onCreated={() => {
            setOpenAddAnswer(false);
            loadDataFromAPI();
          }}
          question={selectedQuestion}
        />
      )}
      {selectedQuestion && (
        <EditQuestion
          open={openEditQuestion}
          question={selectedQuestion}
          onClose={() => {
            setOpenEditQuestion(false);
          }}
          onEdited={() => {
            setOpenEditQuestion(false);
            loadDataFromAPI();
          }}
        />
      )}
      {selectedAnswer && (
        <EditAnswer
          open={openEditAnswer}
          onClose={() => {
            setOpenEditAnswer(false);
          }}
          onEdited={() => {
            setOpenEditAnswer(false);
            loadDataFromAPI();
          }}
          answerSelected={selectedAnswer}
        />
      )}
      <Toaster />
    </div>
  );
};
