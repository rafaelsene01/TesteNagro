import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

export default function ListPessoa({ pessoa, onDelete }) {
  return (
    <Container>
      <Link to={{ pathname: `/${pessoa.id}` }}>
        <div>
          <strong>{pessoa.name}</strong>
          <span>{pessoa.cpf}</span>
        </div>
      </Link>
      <button type="button" onClick={onDelete}>
        Excluir
      </button>
    </Container>
  );
}
