import {
  Flex,
  ScaleFade,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { VFC } from "react";
import { useParams } from "react-router-dom";
import { useSearchByTitle } from "../hooks/useSearchByTitle";
import { PaperCard } from "./PaperCard";

type PathParams = {
  title: string;
};
export const SearchBytitle: VFC = () => {
  const params = useParams<PathParams>();

  const { data: papers, isLoading } = useSearchByTitle(params.title as string);

  return (
    <VStack>
      <Flex m={8}>
        <Text color="gray.50" fontWeight="bold" fontSize="2xl">
          Search Results By Title For : {params.title}
        </Text>
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
          {papers?.map((paper) => (
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
    </VStack>
  );
};
