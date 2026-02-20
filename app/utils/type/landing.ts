export interface ProductType {
    id: number;
    slug?: string;
    name: string;
    image: string;
    rating: number;
    price: number;
    originalPrice?: number;
    discount?: string;
}