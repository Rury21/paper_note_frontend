import axios from "axios";
import { useQuery } from "react-query";
import { Paper } from "../types";

export const useSearchByTitle = (title: string) => {
  const getPaper = async (title: string) => {
    const { data } = await axios.get<Paper[]>(
      `https://paper-note-backend.herokuapp.com/api/search/title/${title}`
    );
    return data;
  };

  return useQuery<Paper[], Error>({
    queryKey: ["paper", title],
    queryFn: () => getPaper(title),
    enabled: !!title,
    staleTime: Infinity,
  });
};
