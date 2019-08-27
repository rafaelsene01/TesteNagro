import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatorio'),
  cpf: Yup.string().required('CPF obrigatorio'),
});

export default function FormPessoa({
  pessoa,
  loading,
  handleSubmit,
  buttonText,
}) {
  return (
    <Form
      initialData={pessoa}
      schema={schema}
      onSubmit={e => handleSubmit({ ...e })}
    >
      <Input name="name" placeholder="Nome completo" />
      <Input name="cpf" placeholder="Seu cpf" />

      <button style={{ backgroundColor: '#28c740' }} type="submit">
        {loading ? 'Carregando...' : buttonText}
      </button>
    </Form>
  );
}
