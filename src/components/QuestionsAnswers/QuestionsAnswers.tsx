"use client";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Accordion, AccordionContent, AccordionItem } from "../ui/accordion";
import { Copy, Star } from "lucide-react";
import { AccordionHeader, AccordionTrigger } from "@radix-ui/react-accordion";
import { Badge } from "@/components/ui/badge";

export const QuestionsAnswers = () => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1>Questions Answers Manager</h1>
      </div>

      <div className="flex space-x-4">
        <div className="w-2/3">
          <div className="flex justify-between">
            <div>
              <Button>+ New Question</Button>
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
                      <AccordionTrigger>
                        <div className="text-lg font-bold">
                          Original Question #1
                        </div>
                      </AccordionTrigger>
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
                            Answer ipsum dolor sit amet, consectetur adipiscing
                            elit.
                          </p>
                          <div className="flex space-x-2">
                            <Button size="icon">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button size="icon">
                              <Star className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {/* Answer 2 */}
                        <div className="flex justify-between bg-gray-100 p-2">
                          <p>
                            Answer ipsum dolor sit amet, consectetur adipiscing
                            elit.
                          </p>
                          <div className="flex space-x-2">
                            <Button size="icon">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button size="icon">
                              <Star className="h-4 w-4" />
                            </Button>
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
    </div>
  );
};
