export type Category = 'Todos' | 'Foco' | 'Sono' | 'Emagrecimento' | 'Imunidade' | 'Articulações' | 'Beleza';

export interface Product {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  price: number;
  description: string;
  benefits: string[];
  images: string[];
  videoThumbnail: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}
