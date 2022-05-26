interface Image {
  asset: {
    url: string;
  };
}

export interface Creator {
  _id: string;
  name: string;
  address: string;
  slug: {
    current: string;
  };
  image: Image;
  bio: string;
}

export interface Collection {
  id: string;
  title: string;
  address: string;
  description: string;
  nftCollectionName: string;
  mainImage: Image;
  slug: {
    current: string;
  };
  creator: Creator;
  previewImage: Image;
}
