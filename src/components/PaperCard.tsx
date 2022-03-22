import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Heading,
  IconButton,
  Tag,
  TagLabel,
  VStack,
} from "@chakra-ui/react";
import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "../types";

type Props = {
  paper: Paper;
  handleDelete?: (id: string) => void;
  isEditing: boolean;
};

export const PaperCard: VFC<Props> = memo((props) => {
  const navigate = useNavigate();
  return (
    <Box
      w={{ base: "3xs", md: "2xs" }}
      h={{ base: "2xs", md: "xs" }}
      onClick={() => {
        navigate(`../paper/${props.paper.id}`);
      }}
    >
      <VStack m={{ base: 1, md: 3 }}>
        {props.isEditing && props.handleDelete ? (
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
            onClick={(e) => {
              e.stopPropagation();
              props.handleDelete!(props.paper.id);
            }}
          />
        ) : (
          <></>
        )}

        <Heading
          w="full"
          px={1}
          noOfLines={{ base: 3, md: 4 }}
          textAlign="center"
          fontSize={{ base: "xl", md: "2xl" }}
        >
          {props.paper.title}
        </Heading>
        <Divider />
        <Box w="full" textAlign="center" noOfLines={{ base: 2, md: 3 }}>
          {props.paper.year}
        </Box>
        <Box textAlign="center" noOfLines={{ base: 2, md: 3 }}>
          {props.paper.tags?.map((tag, i) => (
            <Tag m={1} key={i} bg="red.900" borderRadius="xl" variant="solid">
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
        </Box>
      </VStack>
    </Box>
  );
});
