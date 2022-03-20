import axios from "axios";
import { useQuery } from "react-query";
import { Paper } from "../types";

export const usePaper = (id: string) => {
  const getPaper = async (id: string) => {
    const { data } = await axios.get<Paper>(
      `https://paper-note-backend.herokuapp.com/api/paper/${id}`
    );
    return data;
  };

  return useQuery<Paper, Error>({
    queryKey: ["paper", id],
    queryFn: () => getPaper(id),
    enabled: !!id,
    staleTime: Infinity,
  });
};
