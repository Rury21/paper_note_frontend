import {
  Flex,
  ScaleFade,
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

  const { data: papers } = useSearchByTag(params.tag as string);

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

      <Wrap m={8} spacing={4} justify="center">
        {papers
          ?.slice()
          .reverse()
          .map((paper) => (
            <ScaleFade key={paper.id} initialScale={0.9} in={true}>
              <WrapItem
                _hover={{
                  cursor: "pointer",
                }}
              >
                <PaperCard paper={paper} key={paper.id} isEditing={false} />
              </WrapItem>
            </ScaleFade>
          ))}
      </Wrap>
    </VStack>
  );
};
