import { PrincipalLayout } from "./components/layout/index";
import { RecetasDeTablas } from "./shared/recetaDeTablas";
import { useEffect, useState } from "react";
import { Tag, notification, Typography } from 'antd';
import { io } from 'socket.io-client';

const { Title } = Typography;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Conéctate al WebSocket
    const socket = io('http://localhost:3001'); // Ajusta la URL según sea necesario

    // Escucha el evento 'citasChanges'
    socket.on('citasChanges', (message) => {
      console.log('Mensaje recibido:', message);
      fetchData(); // Lanza fetchData cada vez que se reciba un mensaje
    });

    // Limpia la conexión cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:3000/citas", requestOptions);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Error',
        description: 'Error al cargar datos. Inténtalo de nuevo más tarde.'
      });
    }
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: 'Edad',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      render: (_, record) => (
        <>
          <Tag color={record.status === 1 ? 'geekblue' : 'red'} key={1}>
            {record.status === 1 ? 'activo' : 'inactivo'}
          </Tag>
        </>
      )
    }
  ];

  return (
    <PrincipalLayout style={{ padding: '40px', backgroundColor: '#f0f2f5' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>Atención Medica</Title>
      <RecetasDeTablas
        columns={columns}
        style={{
          width: "100%",
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
        data={data.map((item, index) => ({
          ...item,
          key: index.toString(),
        }))}
      />
    </PrincipalLayout>
  );
};

export default App;
