import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import FormPessoa from '~/components/FormPessoa';

import { Container } from './styles';

export default function ListPessoa({
  pessoa,
  onDelete,
  loading,
  handleSubmit,
  buttonText,
}) {
  const [editar, setEditar] = useState(false);
  return (
    <Container>
      {editar ? (
        <>
          <FormPessoa
            loading={loading}
            pessoa={pessoa}
            handleSubmit={e => handleSubmit({ id: pessoa.id, ...e })}
            buttonText={buttonText}
          />
          <button type="button" onClick={() => setEditar(!editar)}>
            Cancelar
          </button>
        </>
      ) : (
        <>
          <Link to={{ pathname: `/${pessoa.id}` }}>
            <div>
              <strong>{pessoa.name}</strong>
              <span>{pessoa.cpf}</span>
            </div>
          </Link>

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
