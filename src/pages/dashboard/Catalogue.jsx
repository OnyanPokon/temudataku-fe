import { useAuth, useCart, useCrudModal, useNotification, useService } from '@/hooks';
import { CartService, ProductService } from '@/services';
import { rupiahFormat } from '@/utils/rupiahFormat';
import { DollarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Descriptions, Skeleton } from 'antd';
import { useCallback, useEffect } from 'react';

const Catalogue = () => {
  const { token } = useAuth();
  const modal = useCrudModal();
  const { cart, fetchCart } = useCart();
  const { success, error } = useNotification();
  const { execute: executeProducts, ...getAllProducts } = useService(ProductService.getAll);
  const addToCart = useService(CartService.store);

  const fetchProducts = useCallback(() => {
    executeProducts({
      token: token
    });
  }, [executeProducts, token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchCart, fetchProducts, token]);

  const products = getAllProducts.data ?? [];

  return (
    <div className="grid w-full grid-cols-12 gap-4">
      {products.length === 0 || Object.keys(cart || {}).length === 0 ? (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="col-span-3 w-full">
              <Skeleton active />
            </Card>
          ))}
        </>
      ) : (
        <>
          {products.map((item) => (
            <Card
              key={item.id}
              className="col-span-3 w-full"
              hoverable
              onClick={() =>
                modal.show.paragraph({
                  title: item.title,
                  data: {
                    content: (
                      <>
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" className="mb-4 aspect-video w-full rounded-md" />
                        <Descriptions column={1} bordered className="mb-4">
                          <Descriptions.Item label="Kategori">{item.subCategory.category.name}</Descriptions.Item>
                          <Descriptions.Item label="Sub Kategori">{item.subCategory.name}</Descriptions.Item>
                          <Descriptions.Item label="Deskripsi">{item.description}</Descriptions.Item>
                          <Descriptions.Item label="Harga">{rupiahFormat(item.price)}</Descriptions.Item>
                        </Descriptions>
                        <div className="mb-4 inline-flex w-full items-center gap-x-2">
                          <Button icon={<DollarOutlined />} size="large" color="primary" variant="solid" className="w-full">
                            Bayar Langsung
                          </Button>
                          <Badge count={cart?.products?.length}>
                            <Button
                              icon={<ShoppingCartOutlined />}
                              size="large"
                              variant="solid"
                              className="w-full"
                              loading={addToCart.isLoading}
                              disabled={cart?.products?.some((p) => p.id === item.id)}
                              onClick={async () => {
                                const { message, isSuccess } = await addToCart.execute({ product: item.id }, token);
                                if (isSuccess) {
                                  success('Berhasil', message);
                                  fetchCart();
                                  modal.close();
                                } else {
                                  error('Gagal', message);
                                }
                                return isSuccess;
                              }}
                            >
                              Tambah ke Keranjang
                            </Button>
                          </Badge>
                        </div>
                      </>
                    )
                  }
                })
              }
              cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            >
              <Card.Meta title={item.title} description={<p className="news-text">{item.description}</p>} />
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default Catalogue;
