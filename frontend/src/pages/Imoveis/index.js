import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import Add from './Add';
import ListPessoa from './ListImoveis';

import { Container, List } from './styles';

export default function Imoveis({ location }) {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(false);

  const [, id] = location.pathname.split('/');

  useEffect(() => {
    async function getImoveis() {
      try {
        const response = await api.get('properties', {
          params: { growerId: id },
        });
        setImoveis(response.data);
      } catch (error) {}
    }

    getImoveis();
  }, [id]);

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

  return (
    <Container>
      <Add loading={loading} handleSubmit={handleSubmit} />
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
