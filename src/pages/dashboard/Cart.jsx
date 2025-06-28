import { DataTable } from '@/components';
import { useCart } from '@/hooks';
import { rupiahFormat } from '@/utils/rupiahFormat';
import { WalletOutlined } from '@ant-design/icons';
import { Button, Card, Input, Skeleton, Typography } from 'antd';

const Cart = () => {
  const { cart } = useCart();

  const Column = [
    {
      title: 'Gambar',
      render: () => <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" className="mb-4 aspect-square w-12 rounded-md bg-cover" />
    },
    {
      title: 'Nama Produk',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      searchable: true
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      sorter: (a, b) => a.price.length - b.price.length,
      searchable: true,
      render: (record) => rupiahFormat(record)
    }
  ];

  return (
    <div className="grid grid-cols-12 gap-4">
      {Object.keys(cart).length == 0 ? (
        <>
          <Card className="col-span-8 h-fit">
            <Skeleton active />
          </Card>
          <Card className="col-span-4 h-fit">
            <Skeleton active />
          </Card>
        </>
      ) : (
        <>
          <Card className="col-span-8 h-fit">
            <DataTable data={cart.products ?? []} columns={Column} map={(product) => ({ key: product.name, ...product })} />
          </Card>
          <Card className="col-span-4 h-fit">
            <Typography.Title level={5}>Ringkasan Pesanan</Typography.Title>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-2">
              <div className="inline-flex w-full items-center justify-between">
                <span className="font-bold">Item : {cart?.products?.length}</span>
                <span style={{ margin: 0 }}>{rupiahFormat(cart?.total_payment)}</span>
              </div>
              <div className="mb-6 inline-flex w-full items-center justify-between">
                <span className="font-bold">Potongan :</span>
                <span style={{ margin: 0 }}>{rupiahFormat(cart?.discount)}</span>
              </div>
              <div className="mb-4 flex flex-col gap-y-2">
                <span>Kode Promo :</span>
                <Input size="large" placeholder="xxx-xxx-xxx" />
                <Button className="w-full">Tukar Kode</Button>
              </div>
              <hr className="mb-4" />
              <div className="mb-4 inline-flex w-full items-center justify-between">
                <span className="font-bold">Total Bayar</span>
                <span style={{ margin: 0 }}>{rupiahFormat(cart?.total_payment - cart?.discount)}</span>
              </div>
              <Button size="large" variant="solid" color="primary" icon={<WalletOutlined />}>
                Proses Pembayaran
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Cart;
