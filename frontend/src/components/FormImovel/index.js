import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatorio'),
  city: Yup.string().required('Cidade obrigatorio'),
  total_area: Yup.number().required('Area obrigatorio'),
});

export default function FormPessoa({
  imovel,
  loading,
  handleSubmit,
  buttonText,
}) {
  return (
    <Form
      initialData={imovel}
      schema={schema}
      onSubmit={e => handleSubmit({ ...e })}
    >
      <Input name="name" placeholder="Nome" />
      <Input name="city" placeholder="Cidade" />
      <Input name="total_area" placeholder="Area total" />

      <button style={{ backgroundColor: '#28c740' }} type="submit">
        {loading ? 'Carregando...' : buttonText}
      </button>
    </Form>
  );
}
