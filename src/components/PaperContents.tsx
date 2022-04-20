import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Heading,
  IconButton,
  Input,
  Link,
  NumberInput,
  NumberInputField,
  ScaleFade,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { useMutatePaper } from "../hooks/useMutatePaper";
import { Paper } from "../types";
import { References } from "./References";
import { Tags } from "./Tags";

type Props = {
  paper: Paper;
};

export const PaperContents: VFC<Props> = memo((props) => {
  const navigate = useNavigate();
  const [paper, setPaper] = useState<Paper>(props.paper);
  const [isEditing, setIsEditing] = useState(false);
  const { editPaper, deletePaper } = useMutatePaper();
  const handleChangePaper = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPaper({ ...paper, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setPaper(props.paper);
    setIsEditing(false);
  };

  const handleEditPaper = () => {
    editPaper.mutate(paper);
    setIsEditing(false);
  };

  const handleDeletePaper = () => {
    deletePaper.mutate(paper.id);
    setIsEditing(false);
    navigate("/");
  };

  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Box
        mt={8}
        p={4}
        w={{ base: "sm", md: "xl", lg: "3xl" }}
        bg="gray.50"
        borderRadius="xl"
        shadow="5px 5px 15px black"
        textAlign="center"
      >
        <Tags paper={paper} isEditing={isEditing} setPaper={setPaper} />

        <VStack m={4}>
          {isEditing ? (
            <VStack w="full">
              <Box>
                <ButtonGroup spacing={6}>
                  <IconButton
                    aria-label="Save Contents"
                    icon={<CheckIcon />}
                    bg="blue.500"
                    color="gray.50"
                    _hover={{
                      bg: "blue.400",
                    }}
                    _active={{
                      bg: "blue.300",
                    }}
                    onClick={handleEditPaper}
                  />
                  <IconButton
                    aria-label="Don't Save Contents"
                    icon={<CloseIcon />}
                    color="Gray"
                    onClick={handleClose}
                  />
                  <IconButton
                    aria-label="Don't Save Contents"
                    icon={<DeleteIcon />}
                    bg="red.600"
                    color="gray.50"
                    _hover={{
                      bg: "red.500",
                    }}
                    _active={{
                      bg: "red.400",
                    }}
                    onClick={handleDeletePaper}
                  />
                </ButtonGroup>
              </Box>

              <Input
                placeholder="Title"
                name="title"
                h={12}
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                fontWeight="bold"
                color="gray.800"
                value={paper.title || ""}
                onChange={handleChangePaper}
              />

              <NumberInput
                placeholder="Year Published"
                name="year"
                value={paper.year || 0}
              >
                <NumberInputField
                  w="3xs"
                  h={8}
                  textAlign="center"
                  onChange={handleChangePaper}
                />
              </NumberInput>

              <Input
                placeholder="URL"
                name="url"
                h={8}
                value={paper.url || ""}
                onChange={handleChangePaper}
              />
              <Box textAlign="center" pt={4} w="full">
                <Heading fontSize={{ base: "md", md: "lg" }}>Abstract</Heading>

                <Textarea
                  placeholder="Abstract"
                  name="abstract"
                  resize="none"
                  m={4}
                  w="full"
                  h="3xs"
                  fontSize={{ base: "sm", md: "md" }}
                  size="md"
                  value={paper.abstract || ""}
                  onChange={handleChangePaper}
                />
              </Box>
            </VStack>
          ) : (
            <VStack w="full">
              <EditIcon
                _hover={{ cursor: "pointer", opacity: "0.8" }}
                onClick={() => setIsEditing(true)}
              />
              <Heading
                w="full"
                mb={4}
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              >
                {props.paper.title}
              </Heading>
              <Box>{props.paper.year}</Box>
              <Link href={props.paper.url}>{props.paper.url}</Link>
              <Box pt={4}>
                <Heading fontSize={{ base: "md", md: "lg" }}>Abstract</Heading>

                <Box m={4} fontSize={{ base: "sm", md: "md" }}>
                  {props.paper.abstract}
                </Box>
              </Box>
            </VStack>
          )}
          <References paper={paper} isEditing={isEditing} setPaper={setPaper} />
        </VStack>
      </Box>
    </ScaleFade>
  );
});
