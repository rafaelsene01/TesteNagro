import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatorio'),
  city: Yup.string().required('Cidade obrigatorio'),
  total_area: Yup.number().required('Area obrigatorio'),
});

export default function Add({ loading, handleSubmit }) {
  return (
    <Container>
      <Form
        schema={schema}
        onSubmit={e => handleSubmit(e.name, e.city, e.total_area)}
      >
        <Input name="name" placeholder="Nome" />
        <Input name="city" placeholder="Cidade" />
        <Input name="total_area" placeholder="Area total" />

        <button type="submit">{loading ? 'Carregando...' : 'Criar'}</button>
      </Form>
    </Container>
  );
}
