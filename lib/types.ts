export type ImageCreateRequest = {
  response1: string;
  response2: string;
  response3: string;
  userEmail: string;
};

export type Image = {
  id: string;
  response1: string;
  response2: string;
  response3: string;
  userEmail: string;
  thumbnailUrl: string;
  imageUrl: string;
  created_at: string;
};
