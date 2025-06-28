import Model from './Model';

export interface IncomingApiData {
  products: {
    id: number;
    name: string;
    price: number;
  }[];
  discount: number;
  total_payment: number;
}

interface FormValue {
  product: number;
}

export interface OutgoingApiData {
  product: number;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Cart extends Model {
  constructor(
    public products: {
      id: number;
      name: string;
      price: number;
    }[],
    public discount: number,
    public total_payment: number
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Cart> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Cart>;
    return new Cart(
      apiData.products.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price
      })),
      apiData.discount,
      apiData.total_payment
    ) as ReturnType<T, IncomingApiData, Cart>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(cart: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(cart)) return cart.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      product: cart.product
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}

// FIXME: you maybe want to change below line. If you don't want to then delete this FIXME line
