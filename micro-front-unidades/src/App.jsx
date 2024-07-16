import { PrincipalLayout } from "./components/layout/index";
import { RecetasDeTablas } from "./shared/recetaDeTablas";
import { useEffect, useState } from "react";
import { Tag, Button, Modal, Form, Input, Select, notification, Popconfirm, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Item } = Form;
const { Option } = Select;
const { Title } = Typography;

const App = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

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

  const inhabilitarCampo = async (id, status, name) => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "status": status
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch(`http://localhost:3000/citas/${id}`, requestOptions);
      if (!response.ok) {
        throw new Error('Error al actualizar el estado');
      }
      await response.json();
      fetchData();
      notification.success({
        message: 'Éxito',
        description: `Estado de la cita para ${name} actualizado a ${status === 1 ? 'activo' : 'inactivo'} correctamente.`
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Error',
        description: `Error al actualizar estado de la cita para ${name}. Inténtalo de nuevo más tarde.`
      });
    }
  };

  const eliminarRegistro = async (id, name) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };

    try {
      const response = await fetch(`http://localhost:3000/citas/${id}`, requestOptions);
      if (!response.ok) {
        throw new Error('Error al eliminar la cita');
      }
      fetchData();
      notification.success({
        message: 'Éxito',
        description: `Cita de ${name} eliminada correctamente.`
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Error',
        description: `Error al eliminar la cita de ${name}. Inténtalo de nuevo más tarde.`
      });
    }
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleCreateCita = async (values) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:3000/citas", requestOptions);
      if (!response.ok) {
        throw new Error('Error al crear la cita');
      }
      await response.json();
      fetchData();
      handleModalClose();
      notification.success({
        message: 'Éxito',
        description: 'La cita se creó exitosamente.'
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Error',
        description: 'Error al crear cita. Inténtalo de nuevo más tarde.'
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
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={() => inhabilitarCampo(record.idcitas, record.status === 1 ? 0 : 1, record.name)} style={{ width: '90px' }}>
            {record.status === 1 ? 'Inhabilitar' : 'Habilitar'}
          </Button>
          <Popconfirm
            title={`¿Estás seguro de eliminar la cita de ${record.name}?`}
            onConfirm={() => eliminarRegistro(record.idcitas, record.name)}
            okText="Sí"
            cancelText="No"
          >
            <Button type="primary" danger style={{ width: '90px' }}>
              Eliminar
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <PrincipalLayout style={{ padding: '40px', backgroundColor: '#f0f2f5' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>Gestión de Citas</Title>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px', marginRight: '10px'}}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleModalOpen} style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50', width: '110px' }}>
          Crear cita
        </Button>
      </div>
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
      <Modal
        title="Crear cita"
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateCita} layout="vertical">
          <Item name="name" label="Nombre" rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}>
            <Input />
          </Item>
          <Item name="age" label="Edad" rules={[{ required: true, message: 'Por favor ingresa la edad' }]}>
            <Input type="number" />
          </Item>
          <Item name="status" label="Estado" rules={[{ required: true, message: 'Por favor selecciona el estado' }]}>
            <Select>
              <Option value={1}>Activo</Option>
              <Option value={0}>Inactivo</Option>
            </Select>
          </Item>
          <Button htmlType="submit" type="primary" style={{ marginTop: 16 }}>
            Crear
          </Button>
        </Form>
      </Modal>
    </PrincipalLayout>
  );
};

export default App;
