import React from 'react';

import { Container } from './styles';

export default function ListPessoa({ pessoa, onDelete }) {
  return (
    <Container>
      <div>
        <strong>{pessoa.name}</strong>
        <span>{pessoa.cpf}</span>
      </div>
      <button type="button" onClick={onDelete}>
        Excluir
      </button>
    </Container>
  );
}
