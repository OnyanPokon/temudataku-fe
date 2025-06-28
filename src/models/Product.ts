import Model from './Model';

export interface IncomingApiData {
  id: number;
  subCategory: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
    };
  };
  title: string;
  description: string;
  price: number;
  is_available: true;
  thumbnail_url: string;
  created_at: string;
  updated_at: string;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Product extends Model {
  constructor(
    public id: number,
    public subCategory: {
      id: number;
      name: string;
      category: {
        id: number;
        name: string;
      };
    },
    public title: string,
    public description: string,
    public price: number,
    public is_available: true,
    public thumbnail_url: string,
    public created_at: string,
    public updated_at: string
  ) {
    super();
  }
  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Product> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Product>;
    return new Product(
      apiData.id,
      {
        id: apiData.subCategory.id,
        name: apiData.subCategory.name,
        category: {
          id: apiData.subCategory.category.id,
          name: apiData.subCategory.category.name
        }
      },
      apiData.title,
      apiData.description,
      apiData.price,
      apiData.is_available,
      apiData.thumbnail_url,
      apiData.created_at,
      apiData.created_at
    ) as ReturnType<T, IncomingApiData, Product>;
  }
}

// FIXME: you maybe want to change below line. If you don't want to then delete this FIXME line
Model.children.product = Product;
