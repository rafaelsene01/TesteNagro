import React, { useState, useEffect } from 'react';
import Add from './Add';
import ListPessoas from './ListPessoas';

import { Container, List } from './styles';

import api from '~/services/api';

export default function Pessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPessoas() {
      const response = await api.get('grower', { params: page });
      setPessoas(response.data);
    }

    getPessoas();
  }, [page]);

  async function handleSubmit(name, cpf) {
    setLoading(true);
    const response = await api.post('grower', { name, cpf });
    setPessoas(
      pessoas.length >= 1 ? [response.data, ...pessoas] : [response.data]
    );
    setLoading(false);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`grower/${id}`);
      const data = pessoas.filter(pessoa => {
        return pessoa.id !== id;
      });

      setPessoas(data);
    } catch (error) {}
  }

  return (
    <Container>
      <Add loading={loading} handleSubmit={handleSubmit} />
      <List>
        {pessoas.map(pessoa => (
          <ListPessoas
            key={pessoa.cpf}
            pessoa={pessoa}
            onDelete={() => handleDelete(pessoa.id)}
          />
        ))}
      </List>
    </Container>
  );
}
