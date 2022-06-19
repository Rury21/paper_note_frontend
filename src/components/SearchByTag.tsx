import {
  Flex,
  ScaleFade,
  Spinner,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { VFC } from "react";
import { useParams } from "react-router-dom";
import { useSearchByTag } from "../hooks/useSearchByTag";
import { PaperCard } from "./PaperCard";

type PathParams = {
  tag: string;
};
export const SearchByTag: VFC = () => {
  const params = useParams<PathParams>();

  const { data: papers, isLoading } = useSearchByTag(params.tag as string);

  return (
    <VStack>
      <Flex m={8}>
        <Text color="gray.50" fontWeight="bold" fontSize="2xl">
          Tag name : {params.tag}
        </Text>
      </Flex>
      {isLoading ? (
        <Spinner mt={8} />
      ) : (
        <Wrap m={8} spacing={4} justify="center">
          {papers
            ?.slice()
            .reverse()
            .map((paper) => (
              <ScaleFade key={paper.id} initialScale={0.9} in={true}>
                <WrapItem
                  shadow="0 2px 5px black"
                  bg="yellow.50"
                  borderRadius="xl"
                  _hover={{
                    cursor: "pointer",
                    shadow: "0 8px 15px black",
                  }}
                >
                  <PaperCard paper={paper} key={paper.id} isEditing={false} />
                </WrapItem>
              </ScaleFade>
            ))}
        </Wrap>
      )}
    </VStack>
  );
};
