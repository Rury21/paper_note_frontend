import {
  Button,
  Flex,
  ScaleFade,
  SimpleGrid,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState, VFC } from "react";
import { useAllPapers } from "../hooks/useAllPapers";
import { Paper } from "../types";
import { AddPaperModal } from "./AddPaperModal";
import { Pagination } from "./Pagination";
import { PaperCard } from "./PaperCard";

export const Papers: VFC = () => {
  const { data: papers, isLoading } = useAllPapers();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState<Paper[]>();

  const page_size = 12;
  const handlePaginate = (page: number) => {
    setPage(papers?.slice((page - 1) * page_size, page * page_size));
  };
  useEffect(() => {
    handlePaginate(1);
  }, [papers]);

  return (
    <VStack spacing={8}>
      <Flex mt={8}>
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
      {isLoading ? (
        <Spinner m={8} />
      ) : (
        <SimpleGrid
          px={8}
          spacing={4}
          justify="center"
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        >
          {page?.map((paper) => (
            <ScaleFade key={paper.id} initialScale={0.9} in={true}>
              <Flex
                shadow="0 2px 5px black"
                bg="yellow.50"
                borderRadius="xl"
                _hover={{
                  cursor: "pointer",
                  shadow: "0 8px 15px black",
                }}
              >
                <PaperCard paper={paper} key={paper.id} isEditing={false} />
              </Flex>
            </ScaleFade>
          ))}
        </SimpleGrid>
      )}
      <Pagination
        size={papers?.length}
        per={page_size}
        onChange={(e) => handlePaginate(e.page)}
      />
    </VStack>
  );
};
