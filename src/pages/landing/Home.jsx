import { Reveal } from '@/components';
import { DatabaseOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Button, Image, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="mx-auto grid w-full max-w-screen-xl grid-cols-6 items-center gap-x-10 px-6 py-28">
        <div className="col-span-6 flex w-full flex-col gap-y-4 lg:col-span-3">
          <Image src="/logo.png" preview={false} width={200} />
          <div>
            <Typography.Title>
              <Reveal>TemuDataku</Reveal>
            </Typography.Title>
            <Typography.Title level={4} style={{ margin: 0 }}>
              <Reveal>Yuk, Temu Mentor di TemuDataku!</Reveal>
            </Typography.Title>
          </div>
          <Typography.Paragraph className="text-gray-500">
            <Reveal>
              Dapatkan bimbingan dari mentor untuk menjawab keraguan mu dalam belajar data science. khusus untuk kamu yang belajar otodidak, kami memberikan akses 1 on 1 maupun kelompok untuk mentoring dan tentu dengan harga yang lebih terjangkau
              dari mengikuti bootcamp.
            </Reveal>
          </Typography.Paragraph>
          <Space size="small">
            <Button variant="solid" size="large" color="primary" onClick={() => navigate('/auth/login')}>
              Masuk
            </Button>
          </Space>
        </div>
        <div className="order-last col-span-3 hidden grid-cols-12 gap-x-4 lg:grid">
          <div className="col-span-6 flex flex-col gap-y-4">
            <Reveal>
              <div className="inline-flex gap-x-4 rounded-xl bg-gray-100 p-5">
                <DatabaseOutlined style={{ fontSize: '26px' }} className="text-green-600" />
                <p className="text-xs font-semibold">Belajar lebih efektif & latihan langsung dari ahlinya</p>
              </div>
            </Reveal>
            <div className="landing-village-card-container flex min-h-80 flex-col gap-y-4 rounded-xl p-6 shadow-2xl shadow-green-600">
              <p className="text-xs font-semibold text-white">
                Akses Cepat <FieldTimeOutlined />
              </p>
              <p className="text-4xl font-bold text-white">Data </p>
            </div>
          </div>
          <div className="col-span-6 flex flex-col gap-y-4">
            <div className="flex min-h-80 flex-col gap-y-4 rounded-xl bg-gradient-to-b from-green-700 to-green-500 p-6">
              <p className="text-xs font-semibold text-white">
                Praktis <FieldTimeOutlined />
              </p>
              <p className="text-4xl font-bold text-white">Mudah & Cepat</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
