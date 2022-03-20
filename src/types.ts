export type PaperPost = {
  title: string;
  year: number;
  tags: string[];
  url: string;
  abstract: string;
  references: string[];
};

export type Paper = PaperPost & {
  id: string;
};
