import React, { useState, useEffect } from 'react';
import FormPessoa from '~/components/FormPessoa';

import ListPessoas from './ListPessoas';
import NumberPages from '~/components/NumberPages';

import { Container, List, ContainerForm } from './styles';

import api from '~/services/api';

export default function Pessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [_page, set_page] = useState(1);
  const [nPages, setNPages] = useState(1);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

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

  async function handleSubmitAdd({ name, cpf }) {
    setLoadingAdd(true);

    try {
      const response = await api.post('grower', { name, cpf });
      setPessoas(
        pessoas.length >= 1 ? [response.data, ...pessoas] : [response.data]
      );
    } catch (error) {}

    setLoadingAdd(false);
  }

  async function handleSubmitUpdate({ name, cpf, id }) {
    setLoadingUpdate(true);
    try {
      const response = await api.put(`grower/${id}`, { name, cpf });
      const data = pessoas.map(pessoa =>
        pessoa.id === id ? response.data : pessoa
      );
      setPessoas(data);
    } catch (error) {}

    setLoadingUpdate(false);
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
      <ContainerForm>
        <FormPessoa
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
        {pessoas.map(pessoa => (
          <ListPessoas
            key={pessoa.cpf}
            pessoa={pessoa}
            onDelete={() => handleDelete(pessoa.id)}
            loading={loadingUpdate}
            handleSubmit={e => handleSubmitUpdate({ ...e })}
            buttonText="Salvar"
          />
        ))}
      </List>
    </Container>
  );
}
