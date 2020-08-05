import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Form, Input, Button, Select } from 'antd';
import { UPDATE_INSTRUMENT, GET_ARTISTS } from '../../queries';

const { Option } = Select;

const UpdateInstrument = (props) => {
  const { loading, error, data } = useQuery(GET_ARTISTS);
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [brand, setBrand] = useState(props.brand);
  const [type, setType] = useState(props.type);
  const [price, setPrice] = useState(props.price);
  const [artistId, setArtistId] = useState(props.artistId);
  const [updateInstrument] = useMutation(UPDATE_INSTRUMENT);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, brand, type, price, artistId } = values;
    updateInstrument({
      variables: {
        id,
        year,
        brand,
        type,
        price,
        artistId,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateInstrument: {
          __typename: 'Instrument',
          id,
          year,
          brand,
          type,
          price,
          artistId,
        },
      },
    });
    props.onButtonClick();
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'year':
        props.updateStateVariable('year', value);
        setYear(value);
        break;
      case 'brand':
        props.updateStateVariable('brand', value);
        setBrand(value);
        break;
      case 'type':
        props.updateStateVariable('type', value);
        setType(value);
        break;
      case 'price':
        props.updateStateVariable('price', value);
        setPrice(value);
        break;
      case 'artistId':
        props.updateStateVariable('artistId', value);
        setArtistId(value);
        break;
      default:
        break;
    }
  };

  if (loading) return 'Loading...';
  if (error) return `Errror! ${error.message}`;

  return (
    <Form
      form={form}
      name="update-artist-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        year: year,
        brand: brand,
        type: type,
        price: price,
        artistId: artistId,
      }}
      size="large"
    >
      <Form.Item
        name="year"
        rules={[
          { required: true, message: 'Please input the instrument year!' },
        ]}
      >
        <Input
          placeholder="i.e. 1982"
          onChange={(e) => updateStateVariable('year', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="brand"
        rules={[
          { required: true, message: 'Please input the instrument brand!' },
        ]}
      >
        <Input
          placeholder="i.e. Yamaha"
          onChange={(e) => updateStateVariable('brand', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="type"
        rules={[
          { required: true, message: 'Please input the instrument type!' },
        ]}
      >
        <Input
          placeholder="i.e. Piano"
          onChange={(e) => updateStateVariable('type', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[
          { required: true, message: 'Please input the instrument price!' },
        ]}
      >
        <Input
          placeholder="i.e. 1000"
          onChange={(e) => updateStateVariable('price', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="artistId"
        rules={[
          { required: true, message: 'Please input the instrument artistId!' },
        ]}
      >
        <Select
          style={{ width: 120 }}
          onChange={(e) => updateStateVariable('price', e.target.value)}
        >
          <Option value=""></Option>
          {data.artists.map((item) => {
            return (
              <Option
                value={item.id}
              >{`${item.firstName} ${item.lastName}`}</Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Instrument
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateInstrument;
