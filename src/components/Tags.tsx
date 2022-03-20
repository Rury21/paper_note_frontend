import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "../types";

type Props = {
  paper: Paper;
  isEditing: boolean;
  setPaper: (paper: Paper) => void;
};

export const Tags: VFC<Props> = memo((props) => {
  const navigate = useNavigate();
  const [tag, setTag] = useState("");

  const handleChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };
  const handleDeleteTag = (name: string) => {
    props.setPaper({
      ...props.paper,
      tags: props.paper.tags.filter((tag) => tag !== name),
    });
  };
  const handleEditPaper = () => {
    if (props.paper.tags) {
      const tags = new Set([
        ...props.paper.tags,
        tag[0].toUpperCase() + tag.slice(1),
      ]);
      props.setPaper({
        ...props.paper,
        tags: Array.from(tags),
      });
    } else {
      props.setPaper({
        ...props.paper,
        tags: [tag[0].toUpperCase() + tag.slice(1)],
      });
    }
    setTag("");
  };

  return (
    <Box>
      {props.isEditing ? (
        <Flex>
          <Flex>
            <Input
              name="tag"
              borderColor="gray.800"
              value={tag}
              h={8}
              w={{ base: 20, md: 28 }}
              borderRadius="md"
              _hover={{ borderColor: "default" }}
              onChange={handleChangeTag}
            />
            <IconButton
              aria-label="Add tag"
              variant="outline"
              borderColor="gray.800"
              size="sm"
              mr={3}
              onClick={handleEditPaper}
              icon={<AddIcon />}
            />
          </Flex>

          <HStack flexWrap="wrap">
            {props.paper.tags?.map((tag, i) => (
              <Box key={i}>
                <Tag bg="red.600" borderRadius="xl" variant="solid" my={1}>
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton
                    _focus={{ boxShadow: "none" }}
                    onClick={() => handleDeleteTag(tag)}
                  />
                </Tag>
              </Box>
            ))}
          </HStack>
        </Flex>
      ) : (
        <HStack flexWrap="wrap">
          {props.paper.tags?.map((tag, i) => (
            <Box key={i}>
              <Tag
                bg="red.900"
                borderRadius="xl"
                variant="solid"
                my={1}
                _hover={{
                  cursor: "pointer",
                  bg: "red.800",
                }}
                onClick={() => {
                  navigate(`../${tag}`);
                }}
              >
                <TagLabel>{tag}</TagLabel>
              </Tag>
            </Box>
          ))}
        </HStack>
      )}
    </Box>
  );
});
