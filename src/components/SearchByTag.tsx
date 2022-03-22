import {
  Flex,
  ScaleFade,
  Spinner,
  Tag,
  TagLabel,
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
      <Flex m={4}>
        <Text color="gray.50" fontWeight="bold">
          Tag :
        </Text>
        <Tag bg="red.900" borderRadius="xl" variant="solid" ml={2}>
          <TagLabel>{params.tag}</TagLabel>
        </Tag>
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
