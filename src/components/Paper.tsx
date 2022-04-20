import { Box, Spinner, VStack } from "@chakra-ui/react";
import { VFC } from "react";
import { useParams } from "react-router-dom";
import { usePaper } from "../hooks/usePaper";
import { PaperContents } from "./PaperContents";

type PathParams = {
  id: string;
};
export const Paper: VFC = () => {
  const params = useParams<PathParams>();

  const { data: paper, isLoading } = usePaper(params.id as string);

  return (
    <VStack>
      {isLoading ? (
        <Spinner mt={8} />
      ) : (
        <Box>{paper ? <PaperContents paper={paper} /> : <></>}</Box>
      )}
    </VStack>
  );
};
