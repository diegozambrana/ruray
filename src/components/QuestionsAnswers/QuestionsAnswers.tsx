"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Copy, EllipsisVertical, Pencil, Star, Trash2 } from "lucide-react";
import { AccordionHeader, AccordionTrigger } from "@radix-ui/react-accordion";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { NewQuestion } from "./dialogs";

export const QuestionsAnswers = () => {
  const [openNewQuestion, setOpenNewQuestion] = useState(false);
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
              <AccordionItem value="question1">
                <Card>
                  <CardContent className="py-4">
                    <AccordionHeader>
                      <div className="flex justify-between">
                        <AccordionTrigger>
                          <div className="text-lg font-bold">
                            Original Question #1
                          </div>
                        </AccordionTrigger>
                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <EllipsisVertical className="h-4 w-8" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Pencil className="h-4 w-4 mr-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Trash2 className="h-4 w-4 mr-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </AccordionHeader>
                    <AccordionContent>
                      <div className="text-sm text-gray-500">
                        Alternative Question 1
                      </div>
                      <div className="text-sm text-gray-500">
                        Alternative Question 2
                      </div>
                      <div className="my-4 space-x-2">
                        <Badge>Tag 1</Badge>
                        <Badge>Tag 2</Badge>
                        <Badge>Tag 3</Badge>
                      </div>
                      <div className="mt-2 space-y-2">
                        {/* Answer 1 */}
                        <div className="flex justify-between bg-gray-100 p-2">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aenean tincidunt ligula eu felis luctus, in
                            molestie magna egestas. Etiam dapibus eu arcu ac
                            aliquet.
                          </p>
                          <div className="flex space-x-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <EllipsisVertical className="h-4 w-8" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-4" /> Copy
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Star className="h-4 w-4 mr-4" /> Add Favorite
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Pencil className="h-4 w-4 mr-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Trash2 className="h-4 w-4 mr-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        {/* Answer 2 */}
                        <div className="flex justify-between bg-gray-100 p-2">
                          <p>
                            Etiam id neque augue. Praesent pulvinar ipsum nisl,
                            et consequat nibh auctor lobortis. Integer vel
                            vehicula nisi, eget eleifend nibh. Integer rhoncus
                            nunc vitae enim pretium viverra. Pellentesque
                            habitant morbi tristique senectus et netus et
                            malesuada fames ac turpis egestas.
                          </p>
                          <div className="flex space-x-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <EllipsisVertical className="h-4 w-8" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-4" /> Copy
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Star className="h-4 w-4 mr-4" /> Add Favorite
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Pencil className="h-4 w-4 mr-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Trash2 className="h-4 w-4 mr-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        {/* Add Answer Button */}
                        <div className="flex justify-end">
                          <Button>+ Add Answer</Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </CardContent>
                </Card>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="w-1/3 p-4 bg-gray-100">
          <h3 className="font-bold">Tags:</h3>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge>Tag 1</Badge>
            <Badge>Tag 2</Badge>
            <Badge>Tag 3</Badge>
            <Badge>Tag 4</Badge>
            <Badge>Tag 5</Badge>
            <Badge>Tag 6</Badge>
            <Badge>Tag 7</Badge>
            <Badge>Tag 8</Badge>
            <Badge>Tag 9</Badge>
            <Badge>Tag 10</Badge>
          </div>
          <h3 className="font-bold mt-4">origin</h3>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge>Upwork</Badge>
            <Badge>Toptal</Badge>
            <Badge>Linkedin</Badge>
          </div>
          <h3 className="font-bold mt-4">Matcher</h3>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge>Santiago</Badge>
            <Badge>Sebastian</Badge>
            <Badge>Juan</Badge>
          </div>

          {/* <Card>
            <CardContent className="py-4">
              <div>Tags</div>
            </CardContent>
          </Card> */}
        </div>
      </div>
      <NewQuestion
        open={openNewQuestion}
        onClose={() => {
          setOpenNewQuestion(false);
        }}
      />
    </div>
  );
};
