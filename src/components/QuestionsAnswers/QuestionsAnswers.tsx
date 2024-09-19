"use client";

import { useEffect, useState } from "react";
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
import {
  Copy,
  Delete,
  EllipsisVertical,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/toaster";

import { NewQuestion } from "./dialogs";
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
import { answer as answerType, questionType } from "@/types";
import { DeleteAnswer } from "./dialogs/DeleteAnswer";

export const QuestionsAnswers = () => {
  const [openNewQuestion, setOpenNewQuestion] = useState(false);
  const [openDeleteAnswer, setOpenDeleteAnswer] = useState(false);
  const [openDeleteQuestion, setOpenDeleteQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<questionType | null>(
    null
  );
  const [selectedAnswer, setSelectedAnswer] = useState<answerType | null>(null);
  const { questions, setQuestions } = useQuestionsAnswers(
    (state: questionsAnswersType) => state
  );
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
              <div className="flex">
                <Input placeholder="Search" className="max-w-xs mr-2" />
                <Button>Search</Button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Accordion type="multiple">
              {questions.map((question, index) => (
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
                              <DropdownMenuItem>
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
                          <Badge>Tag 1</Badge>
                          <Badge>Tag 2</Badge>
                          <Badge>Tag 3</Badge>
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
                              className="flex justify-between bg-gray-100 px-4 py-2 rounded-lg"
                            >
                              <Markdown className="md_container">
                                {answer.answer}
                              </Markdown>
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
                                    <DropdownMenuItem>
                                      <Star className="h-4 w-4 mr-4" /> Add
                                      Favorite
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
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

                          {/* Add Answer Button */}
                          <div className="flex justify-end">
                            <Button>+ Add Answer</Button>
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
      <Toaster />
    </div>
  );
};
