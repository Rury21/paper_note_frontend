import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Paper } from "./components/Paper";
import { Papers } from "./components/Papers";
import { SearchByTag } from "./components/SearchByTag";
import { SearchBytitle } from "./components/SearchByTitle";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Papers />} />
        <Route path="/paper/:id" element={<Paper />} />
        <Route path="/search/title/:title" element={<SearchBytitle />} />
        <Route path="/search/tag/:tag" element={<SearchByTag />} />
      </Route>
    </Routes>
  );
};
