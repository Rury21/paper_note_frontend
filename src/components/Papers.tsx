import {
  Button,
  Flex,
  ScaleFade,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { VFC } from "react";
import { useAllPapers } from "../hooks/useAllPapers";
import { AddPaperModal } from "./AddPaperModal";
import { PaperCard } from "./PaperCard";

export const Papers: VFC = () => {
  const { data: papers } = useAllPapers();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack>
      <Flex m={4}>
        <AddPaperModal isOpen={isOpen} onClose={onClose} />
        <Button
          variant="outline"
          borderColor="pink.500"
          color="gray.50"
          _hover={{
            cursor: "pointer",
            borderColor: "pink.400",
            bg: "gray.600",
          }}
          onClick={onOpen}
        >
          New
        </Button>
      </Flex>
      <Wrap m={8} spacing={4} justify="center">
        {papers
          ?.slice()
          .reverse()
          .map((paper) => (
            <ScaleFade key={paper.id} initialScale={0.9} in={true}>
              <WrapItem
                shadow="0 2px 5px black"
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
    </VStack>
  );
};
