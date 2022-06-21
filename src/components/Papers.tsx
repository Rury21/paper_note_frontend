import { AddIcon, ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  IconButton,
  ScaleFade,
  SimpleGrid,
  Spinner,
  Text,
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
  const [sort, setSort] = useState<"LATEST" | "ASC" | "DESC">("LATEST");
  const { data: papers, isLoading } = useAllPapers(sort);
  const [cp, setCp] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState<Paper[]>();

  const page_size = 12;
  const handlePaginate = (p: number) => {
    setPage(papers?.slice((p - 1) * page_size, p * page_size));
    setCp(p);
  };
  useEffect(() => {
    handlePaginate(cp);
  }, [papers, sort]);

  return (
    <VStack spacing={8}>
      <AddPaperModal isOpen={isOpen} onClose={onClose} />
      <HStack mt={8}>
        <IconButton
          aria-label="Add Paper"
          icon={<AddIcon />}
          variant="outline"
          mr={{ base: 4, md: 16 }}
          borderColor="pink.500"
          color="gray.50"
          _hover={{
            cursor: "pointer",
            borderColor: "pink.400",
            bg: "gray.600",
          }}
          onClick={onOpen}
        />

        <Text color="gray.50">Sort:</Text>
        <Button
          aria-label="Sort Paper"
          variant="outline"
          borderColor="pink.500"
          color="gray.50"
          _hover={{
            cursor: "pointer",
            borderColor: "pink.400",
            bg: "gray.600",
          }}
          onClick={() => setSort("LATEST")}
        >
          LATEST
        </Button>
        <Text color="gray.50">Published Year:</Text>
        <IconButton
          aria-label="Sort Paper"
          icon={<ArrowUpIcon />}
          variant="outline"
          borderColor="pink.500"
          color="gray.50"
          _hover={{
            cursor: "pointer",
            borderColor: "pink.400",
            bg: "gray.600",
          }}
          onClick={() => setSort("ASC")}
        />

        <IconButton
          aria-label="Sort Paper"
          variant="outline"
          icon={<ArrowDownIcon />}
          borderColor="pink.500"
          color="gray.50"
          _hover={{
            cursor: "pointer",
            borderColor: "pink.400",
            bg: "gray.600",
          }}
          onClick={() => setSort("DESC")}
        />
      </HStack>
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
        currentPage={cp}
        onChange={(e) => handlePaginate(e.page)}
      />
    </VStack>
  );
};
