import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Paper } from "../types";

export const useMutatePaper = () => {
  const queryClient = useQueryClient();

  const createPaper = useMutation(
    (paper: Omit<Paper, "id">) =>
      axios.post<Paper>(
        "https://paper-note-backend.herokuapp.com/api/papers",
        paper
      ),
    {
      onSuccess: () => queryClient.invalidateQueries("papers"),
    }
  );

  const deletePaper = useMutation(
    (id: string) =>
      axios.delete(`https://paper-note-backend.herokuapp.com/api/paper/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries("papers"),
    }
  );

  const editPaper = useMutation(
    (paper: Paper) =>
      axios.put<Paper>(
        `https://paper-note-backend.herokuapp.com/api/paper/${paper.id}`,
        {
          title: paper.title,
          year: paper.year,
          tags: paper.tags,
          url: paper.url,
          references: paper.references,
          abstract: paper.abstract,
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("paper");
        queryClient.invalidateQueries("papers");
      },
    }
  );

  return { createPaper, deletePaper, editPaper };
};
