import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container } from './styles';

export default function NumberPages({ page, handlePrev, handleNext }) {
  return (
    <Container>
      <button type="button" onClick={handlePrev}>
        <MdChevronLeft size={36} />
      </button>
      <strong>{page}</strong>
      <button type="button" onClick={handleNext}>
        <MdChevronRight size={36} />
      </button>
    </Container>
  );
}
