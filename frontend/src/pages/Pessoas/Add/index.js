import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatorio'),
  cpf: Yup.string().required('CPF obrigatorio'),
});

export default function Add({ loading, handleSubmit }) {
  return (
    <Container>
      <Form schema={schema} onSubmit={e => handleSubmit(e.name, e.cpf)}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="cpf" placeholder="Seu cpf" />

        <button type="submit">{loading ? 'Carregando...' : 'Criar'}</button>
      </Form>
    </Container>
  );
}
