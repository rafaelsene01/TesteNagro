import React, { useState, useEffect } from 'react';
import Add from './Add';
import ListPessoas from './ListPessoas';
import NumberPages from '~/components/NumberPages';

import { Container, List } from './styles';

import api from '~/services/api';

export default function Pessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [_page, set_page] = useState(1);
  const [nPages, setNPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPessoas() {
      try {
        const response = await api.get('grower', { params: { _page } });
        setPessoas(response.data.pessoas);
        setNPages(response.data.nPages);
      } catch (error) {}
    }

    getPessoas();
  }, [_page]);

  async function handleSubmit(name, cpf) {
    setLoading(true);
    try {
      const response = await api.post('grower', { name, cpf });
      setPessoas(
        pessoas.length >= 1 ? [response.data, ...pessoas] : [response.data]
      );
    } catch (error) {}

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

  function handlePrev() {
    if (_page > 1) {
      set_page(_page - 1);
    }
  }
  function handleNext() {
    if (nPages > _page) {
      set_page(_page + 1);
    }
  }

  return (
    <Container>
      <Add loading={loading} handleSubmit={handleSubmit} />
      <NumberPages
        page={_page}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
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
