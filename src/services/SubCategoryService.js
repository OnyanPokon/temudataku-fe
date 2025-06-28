import { SubCategory } from '@/models';
import api from '@/utils/api';

export default class SubCategoryService {
  /**
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  data?: SubCategory[];
   * }>}
   * */
  static async getAll(token) {
    const response = await api.get('/sub-category', { token });
    if (!response.data) return response;
    return { ...response, data: SubCategory.fromApiData(response.data) };
  }

  /**
   * @param {SubCategory} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }}
   */
  static async store(data, token) {
    return await api.post('/sub-category', { body: SubCategory.toApiData(data), token });
  }

  /**
   * @param {number} id
   * @param {SubCategory} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }>}
   */
  static async update(id, data, token) {
    return await api.patch(`/sub-category/edit/${id}`, { body: SubCategory.toApiData(data), token });
  }

  /**
   * @param {number} id
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   * }>}
   */
  static async delete(id, token) {
    return await api.delete(`/sub-category/delete/${id}`, { token });
  }

  /**
   * @param {number[]} ids
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   * }>}
   */
  static async deleteBatch(ids, token) {
    return await api.delete(`/sub-category/multi-delete/?id=${ids.join(',')}`, { token });
  }
}
