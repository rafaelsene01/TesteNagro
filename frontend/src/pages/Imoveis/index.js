import React, { useState, useEffect } from 'react';
import NumberPages from '~/components/NumberPages';

import api from '~/services/api';

import Add from './Add';
import ListPessoa from './ListImoveis';

import { Container, List } from './styles';

export default function Imoveis({ location }) {
  const [imoveis, setImoveis] = useState([]);
  const [_page, set_page] = useState(1);
  const [nPages, setNPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [, id] = location.pathname.split('/');

  useEffect(() => {
    async function getImoveis() {
      try {
        const response = await api.get('properties', {
          params: { growerId: id, _page },
        });
        setImoveis(response.data.imoveis);
        setNPages(response.data.nPages);
      } catch (error) {}
    }

    getImoveis();
  }, [_page, id]);

  async function handleSubmit(name, city, total_area) {
    setLoading(true);
    try {
      const response = await api.post('properties', {
        name,
        city,
        total_area,
        growerId: id,
      });
      setImoveis(
        imoveis.length >= 1 ? [response.data, ...imoveis] : [response.data]
      );
    } catch (error) {}
    setLoading(false);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`properties/${id}`);
      const data = imoveis.filter(pessoa => {
        return pessoa.id !== id;
      });

      setImoveis(data);
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
        {imoveis.map(imovel => (
          <ListPessoa
            key={imovel.id}
            imovel={imovel}
            onDelete={() => handleDelete(imovel.id)}
          />
        ))}
      </List>
    </Container>
  );
}
