import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Dashboard() {
  return (
    <PageContainer>
      <h1 className="mb-4">Apps</h1>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Question & Answer manager</CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <Button asChild>
              <Link href={"/apps/question-answer"}>Go To</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
