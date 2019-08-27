import React, { useState } from 'react';

import FormImovel from '~/components/FormImovel';

import { Container } from './styles';

export default function ListImoveis({
  imovel,
  onDelete,
  loading,
  handleSubmit,
  buttonText,
}) {
  const [editar, setEditar] = useState(false);

  async function update(data) {
    try {
      await handleSubmit(data);
      setEditar(false);
    } catch (error) {}
  }

  return (
    <Container>
      {editar ? (
        <>
          <FormImovel
            loading={loading}
            imovel={imovel}
            handleSubmit={e => update({ id: imovel.id, ...e })}
            buttonText={buttonText}
          />
          <button type="button" onClick={() => setEditar(!editar)}>
            Cancelar
          </button>
        </>
      ) : (
        <>
          <div>
            <strong>Name: {imovel.name}</strong>
            <span>city: {imovel.city}</span>
            <span>total_area: {imovel.total_area}</span>
          </div>

          <button
            style={{ backgroundColor: '#555' }}
            type="button"
            onClick={() => setEditar(!editar)}
          >
            Editar
          </button>
          <button type="button" onClick={onDelete}>
            Excluir
          </button>
        </>
      )}
    </Container>
  );
}
