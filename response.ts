export interface Response {
  status: string;
  totalResults: number;
  articles: Array<story>
}

interface story {
    source: { id: string, name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}