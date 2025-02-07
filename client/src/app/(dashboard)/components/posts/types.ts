export interface PostType {
  title: string;
  summary: string;
  imageUrl: string;
  author: {
    firstName: string;
    lastName: string;
    email: string;
  };
  categories: {
    name: string;
    slug: string;
  }[];

  tags: {
    name: string;
    slug: string;
  }[];
  metaData: {
    metaDesc: string;
    metaTitle: string;
    metaKeywords: string;
    metaImage: string;
  };
  publishedAt: string;
  slug: string;
  timeRead: number;
  published: boolean;
}
