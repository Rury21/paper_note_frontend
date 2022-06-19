import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Icon, IconButton, Input } from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Header: VFC = memo(() => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <Flex justify="center">
      <Flex
        as="nav"
        p={{ base: 1, md: 2, lg: 3 }}
        bg="gray.900"
        align="center"
        w="full"
        position="fixed"
        shadow={{ base: "md", md: "lg", lg: "xl" }}
        zIndex="1"
      >
        <Flex
          ml={{ base: 2, md: 5, lg: 8 }}
          _hover={{
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Icon viewBox="0 0 100 100" boxSize="10">
            <path
              fill="#D53F8C"
              d="M43,41.4L25,5.3l-25,45l21.3,38.4c2.3,4.1,6.5,6.6,11,6.6H75l25-45H57.1C51.2,50.3,45.8,46.9,43,41.4z"
            />
          </Icon>
          <Heading ml={2} color="gray.50" fontWeight="bold" fontSize="3xl">
            Paper Note
          </Heading>
        </Flex>
        <Flex ml={5}>
          <Input
            bg="gray.700"
            color="gray.50"
            borderColor="gray.500"
            _hover={{ borderColor: "default" }}
            _focus={{ boxShadow: "none" }}
            onChange={handleChangeTitle}
          />
          <IconButton
            aria-label="Search"
            fontSize="20px"
            icon={<SearchIcon />}
            bg="pink.500"
            color="gray.50"
            _hover={{
              bg: "pink.400",
            }}
            _active={{
              bg: "pink.300",
            }}
            onClick={() => {
              navigate(`../search/title/${title}`);
            }}
          />
        </Flex>
      </Flex>
      <Box pt={{ base: 10, md: 12, lg: 14 }}>
        <Outlet />
      </Box>
    </Flex>
  );
});
