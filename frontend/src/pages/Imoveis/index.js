import React, { useState, useEffect } from 'react';
import NumberPages from '~/components/NumberPages';

import api from '~/services/api';

import FormImovel from '~/components/FormImovel';
import ListImoveis from '~/components/List/Imoveis';

import { Container, List, ContainerForm } from './styles';

export default function Imoveis({ location }) {
  const [imoveis, setImoveis] = useState([]);
  const [_page, set_page] = useState(1);
  const [nPages, setNPages] = useState(1);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [, growerId] = location.pathname.split('/');

  useEffect(() => {
    async function getImoveis() {
      try {
        const response = await api.get('properties', {
          params: { growerId, _page },
        });
        setImoveis(response.data.imoveis);
        setNPages(response.data.nPages);
      } catch (error) {}
    }

    getImoveis();
  }, [_page, growerId]);

  async function handleDelete(id) {
    try {
      await api.delete(`properties/${id}`);
      const data = imoveis.filter(imovel => {
        return imovel.id !== id;
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

  async function handleSubmitAdd({ name, city, total_area }) {
    setLoadingAdd(true);

    try {
      const response = await api.post('properties', {
        name,
        city,
        total_area,
        growerId,
      });
      setImoveis(
        imoveis.length >= 1 ? [response.data, ...imoveis] : [response.data]
      );
    } catch (error) {}

    setLoadingAdd(false);
  }

  async function handleSubmitUpdate({ id, name, city, total_area }) {
    setLoadingUpdate(true);
    try {
      const response = await api.put(`properties/${id}`, {
        name,
        city,
        total_area,
        growerId,
      });
      const data = imoveis.map(imovel =>
        imovel.id === id ? response.data : imovel
      );

      setImoveis(data);
    } catch (error) {}

    setLoadingUpdate(false);
  }

  return (
    <Container>
      <ContainerForm>
        <FormImovel
          loading={loadingAdd}
          handleSubmit={handleSubmitAdd}
          buttonText="Criar"
        />
      </ContainerForm>
      <NumberPages
        page={_page}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <List>
        {imoveis.map(imovel => (
          <ListImoveis
            key={imovel.id}
            imovel={imovel}
            onDelete={() => handleDelete(imovel.id)}
            loading={loadingUpdate}
            handleSubmit={e => handleSubmitUpdate({ ...e })}
            buttonText="Salvar"
          />
        ))}
      </List>
    </Container>
  );
}
