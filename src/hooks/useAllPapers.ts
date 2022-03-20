import axios from "axios";
import { useQuery } from "react-query";
import { Paper } from "../types";

export const useAllPapers = () => {
  const getPapers = async () => {
    const { data } = await axios.get<Paper[]>(
      "https://paper-note-backend.herokuapp.com/api/papers"
    );
    return data;
  };

  return useQuery<Paper[], Error>({
    queryKey: "papers",
    queryFn: getPapers,
    staleTime: Infinity,
  });
};
