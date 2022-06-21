import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton } from "@chakra-ui/react";
import { useEffect, useRef, useState, VFC } from "react";
type Props = {
  size: number | undefined;
  per: number;
  currentPage: number;
  onChange: (e: { page: number }) => void;
};

export const Pagination: VFC<Props> = (props) => {
  const isFirstRender = useRef(true);
  const [currentPage, setPage] = useState(props.currentPage);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    props.onChange({ page: currentPage });
  }, [currentPage]);

  const totalPage: number = props.size ? Math.ceil(props.size / props.per) : 0;
  const page_arr: number[] = [];
  for (let i = 1; i <= totalPage; i++) page_arr.push(i);

  const handleBack = (): void => {
    if (currentPage === 1) {
      return;
    }

    setPage(currentPage - 1);
  };

  const handleForward = (): void => {
    if (currentPage === totalPage) {
      return;
    }

    setPage(currentPage + 1);
  };

  const handleMove = (page: number): void => {
    setPage(page);
  };

  return (
    <HStack p={8}>
      {totalPage !== 0 && (
        <>
          {currentPage !== 1 && (
            <IconButton
              aria-label="Save Contents"
              icon={<ChevronLeftIcon />}
              variant="outline"
              border="none"
              size="xl"
              color="gray.50"
              _hover={{
                cursor: "pointer",
                borderColor: "pink.400",
                bg: "gray.600",
              }}
              onClick={handleBack}
            />
          )}

          {page_arr.map((page) => {
            return page === currentPage ? (
              <Button
                key={page}
                variant="outline"
                bg="pink.500"
                borderColor="pink.500"
                color="gray.50"
                _hover={{
                  cursor: "pointer",
                  borderColor: "pink.400",
                  bg: "gray.600",
                }}
                onClick={() => handleMove(page)}
              >
                {page}
              </Button>
            ) : (
              <Button
                key={page}
                variant="outline"
                borderColor="pink.500"
                color="gray.50"
                _hover={{
                  cursor: "pointer",
                  borderColor: "pink.400",
                  bg: "gray.600",
                }}
                onClick={() => handleMove(page)}
              >
                {page}
              </Button>
            );
          })}
          {currentPage !== totalPage && (
            <IconButton
              aria-label="Save Contents"
              icon={<ChevronRightIcon />}
              variant="outline"
              border="none"
              color="gray.50"
              _hover={{
                cursor: "pointer",
                borderColor: "pink.400",
                bg: "gray.600",
              }}
              onClick={handleForward}
            />
          )}
        </>
      )}
    </HStack>
  );
};
