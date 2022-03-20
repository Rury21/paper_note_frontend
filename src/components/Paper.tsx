import { VStack } from "@chakra-ui/react";
import { VFC } from "react";
import { useParams } from "react-router-dom";
import { usePaper } from "../hooks/usePaper";
import { PaperContents } from "./PaperContents";

type PathParams = {
  id: string;
};
export const Paper: VFC = () => {
  const params = useParams<PathParams>();

  const { data: paper } = usePaper(params.id as string);

  return (
    <VStack align="center">
      {paper ? <PaperContents paper={paper} /> : <></>}
    </VStack>
  );
};
