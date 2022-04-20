import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, memo, useState, VFC } from "react";
import { useMutatePaper } from "../hooks/useMutatePaper";
import { Paper } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddPaperModal: VFC<Props> = memo((props) => {
  const [paper, setPaper] = useState<Omit<Paper, "id">>(
    {} as Omit<Paper, "id">
  );
  const [papers, setPapers] = useState<(Element | null)[]>([]);
  const [searchShow, setSearchShow] = useState(false);
  const [arxivSearch, setArxivSearch] = useState(false);

  const { createPaper } = useMutatePaper();

  const handleChangePaper = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPaper({ ...paper, [e.target.name]: e.target.value });
    if (arxivSearch && e.target.name === "title") searchArXiv(e.target.value);
  };

  const handleClose = () => {
    setPaper({} as Omit<Paper, "id">);
    props.onClose();
  };

  const handleCreatePaper = async () => {
    createPaper.mutate(paper);
    handleClose();
  };

  const parser = new DOMParser();

  const searchArXiv = (title: string) => {
    setSearchShow(false);
    setPapers([]);
    let field = "";
    if (title !== "") {
      setSearchShow(true);
      field = title.split(/\s|-/).join("+AND+ti:");
      axios
        .get<string>(
          `https://export.arxiv.org/api/query?search_query=ti:${field}&max_results=30&sortBy=relevance`
        )
        .then((res) => {
          const nl = parser
            .parseFromString(res.data, "text/xml")
            .getElementsByTagName("entry");
          let jsonData = [];
          for (let i = 0; i < nl.length; i++) {
            jsonData.push(nl.item(i));
          }
          if (jsonData) setPapers(jsonData);
        })
        .catch((err) => alert(err));
    }
  };

  const handeleSelectPaper = (target: Element | null) => {
    setPaper({
      ...paper,
      title:
        target?.getElementsByTagName("title").item(0)?.textContent ||
        paper.title,
      url: target?.getElementsByTagName("id").item(0)?.textContent || paper.url,
      year:
        Number(
          target
            ?.getElementsByTagName("published")
            .item(0)
            ?.textContent?.split("-")[0]
        ) || paper.year,
      abstract:
        target?.getElementsByTagName("summary").item(0)?.textContent ||
        paper.abstract,
    });
    setSearchShow(false);
  };

  return (
    <Box>
      <Modal isOpen={props.isOpen} onClose={props.onClose} autoFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <Flex align="center" justify="center" pt={2}>
            <FormLabel htmlFor="isChecked">arXiv Search</FormLabel>
            <Switch onChange={(e) => setArxivSearch(e.target.checked)} />
          </Flex>

          <ModalBody pb={{ base: 4, md: 6, lg: 8 }}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                name="title"
                value={paper.title}
                onChange={handleChangePaper}
              />
              {searchShow && arxivSearch && (
                <List
                  borderWidth="1px"
                  borderColor="gray.300"
                  bg="white"
                  borderRadius="md"
                  position="absolute"
                  zIndex={1}
                  shadow="md"
                >
                  {papers?.map((paper, i) => (
                    <ListItem
                      key={i}
                      px={2}
                      cursor="pointer"
                      _hover={{ bg: "blue.100" }}
                      onClick={() => handeleSelectPaper(paper)}
                    >
                      <Flex align="center" noOfLines={1}>
                        {
                          paper?.getElementsByTagName("title").item(0)
                            ?.textContent
                        }
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Year</FormLabel>
              <NumberInput name="year" value={paper.year}>
                <NumberInputField
                  placeholder="Year Published"
                  onChange={handleChangePaper}
                />
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>URL</FormLabel>
              <Input
                placeholder="URL"
                name="url"
                value={paper.url}
                onChange={handleChangePaper}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Abstract</FormLabel>
              <Textarea
                placeholder="Abstract"
                name="abstract"
                borderRadius="md"
                value={paper.abstract}
                resize="none"
                size="sm"
                onChange={handleChangePaper}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreatePaper}>
              Add
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
});
