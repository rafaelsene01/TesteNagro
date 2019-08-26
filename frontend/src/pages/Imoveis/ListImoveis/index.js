import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

export default function ListPessoa({ imovel, onDelete }) {
  return (
    <Container>
      <div>
        <strong>Name: {imovel.name}</strong>
        <span>city: {imovel.city}</span>
        <span>total_area: {imovel.total_area}</span>
      </div>
      <button type="button" onClick={onDelete}>
        Excluir
      </button>
    </Container>
  );
}
