import axios from "axios";
import { useQuery } from "react-query";
import { Paper } from "../types";

export const useAllPapers = (sort: string) => {
  const getPapers = async (sort: string) => {
    const { data } = await axios.get<Paper[]>(
      `https://paper-note-backend.herokuapp.com/api/papers/?sort=${sort}`
    );

    return data;
  };

  return useQuery<Paper[], Error>({
    queryKey: ["papers", sort],
    queryFn: () => getPapers(sort),
    staleTime: Infinity,
  });
};
