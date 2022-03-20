import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Paper } from "./components/Paper";
import { Papers } from "./components/Papers";
import { SearchByTag } from "./components/SearchByTag";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Papers />} />
        <Route path="/paper/:id" element={<Paper />} />
        <Route path="/:tag" element={<SearchByTag />} />
      </Route>
    </Routes>
  );
};
