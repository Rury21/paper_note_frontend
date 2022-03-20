import axios from "axios";
import { useQuery } from "react-query";
import { Paper } from "../types";

export const useSearchByTag = (tag: string) => {
  const getPaper = async (tag: string) => {
    const { data } = await axios.get<Paper[]>(
      `https://paper-note-backend.herokuapp.com/api/papers/${tag}`
    );
    return data;
  };

  return useQuery<Paper[], Error>({
    queryKey: ["paper", tag],
    queryFn: () => getPaper(tag),
    enabled: !!tag,
    staleTime: Infinity,
  });
};
