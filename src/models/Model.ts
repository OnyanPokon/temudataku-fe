type ModelKeys = 'product';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    product: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
