import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Input,
  List,
  ListItem,
  ScaleFade,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";
import { Paper } from ".././types";
import { useAllPapers } from "../hooks/useAllPapers";
import { PaperCard } from "./PaperCard";

type Props = {
  paper: Paper;
  isEditing: boolean;
  setPaper: (paper: Paper) => void;
};

export const References: VFC<Props> = memo((props) => {
  const [searchField, setSearchField] = useState("");
  const { data: papers } = useAllPapers();

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  const filteredPapers = papers?.filter((paper) =>
    paper.title.toLowerCase().includes(searchField.toLowerCase())
  );

  const handleAddReference = () => {
    const target = papers?.find((paper) => paper.title === searchField);
    if (target)
      if (props.paper.references) {
        const refs = new Set([...props.paper.references, target.id]);
        props.setPaper({
          ...props.paper,
          references: Array.from(refs),
        });
      } else {
        props.setPaper({
          ...props.paper,
          references: [target.id],
        });
      }
    setSearchField("");
  };
  const handeleSelectPaper = (target: Paper) => {
    if (props.paper.references) {
      const refs = new Set([...props.paper.references, target.id]);
      props.setPaper({
        ...props.paper,
        references: Array.from(refs),
      });
    } else {
      props.setPaper({
        ...props.paper,
        references: [target.id],
      });
    }
    setSearchField("");
  };

  const handleDeleteReference = (id: string) => {
    props.setPaper({
      ...props.paper,
      references: props.paper.references.filter((ref) => ref !== id),
    });
  };
  return (
    <VStack w="full">
      {props.isEditing ? (
        <Box m={4} w="full">
          <Flex>
            <Input
              borderColor="gray.800"
              w="lg"
              placeholder="Add Paper"
              value={searchField}
              _hover={{ borderColor: "default" }}
              _focus={{ boxShadow: "none" }}
              onChange={handleChangeInput}
            />
            <IconButton
              aria-label="Add Reference"
              variant="outline"
              borderColor="gray.900"
              mr={3}
              _active={{ bg: "orange.300" }}
              onClick={handleAddReference}
              icon={<AddIcon />}
            />
          </Flex>
          {searchField !== "" && (
            <List
              borderWidth="1px"
              borderColor="gray.300"
              bg="white"
              borderRadius="md"
              position="absolute"
              zIndex={1}
              shadow="md"
            >
              {filteredPapers?.map((paper, i) => (
                <ListItem
                  key={i}
                  px={2}
                  cursor="pointer"
                  _hover={{ bg: "blue.100" }}
                  onClick={() => handeleSelectPaper(paper)}
                >
                  <Flex align="center" noOfLines={1}>
                    {paper.title}
                  </Flex>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      ) : (
        <></>
      )}
      <Wrap spacing={4} justify="center">
        {props.paper.references?.map((id, i) => (
          <ScaleFade key={i} initialScale={0.9} in={true}>
            {papers?.find((paper) => paper.id === id) && (
              <WrapItem
                bg="yellow.50"
                borderRadius="xl"
                shadow="md"
                _hover={{
                  cursor: "pointer",
                  shadow: "2xl",
                }}
              >
                <PaperCard
                  paper={papers?.find((paper) => paper.id === id)!}
                  key={i}
                  isEditing={props.isEditing}
                  handleDelete={handleDeleteReference}
                />
              </WrapItem>
            )}
          </ScaleFade>
        ))}
      </Wrap>
    </VStack>
  );
});
