import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

export const List = styled(PerfectScrollbar)`
  min-width: 300px;
  width: 50%;

  div {
    display: flex;
    align-items: center;
    flex: 1;

    margin: 10px 0;

    background: rgba(0, 0, 0, 0.1);

    border-radius: 4px;

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      background: none;
    }
  }
`;
