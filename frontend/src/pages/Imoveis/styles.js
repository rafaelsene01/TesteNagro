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

  form {
    padding: 0 10px;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    text-decoration: none;
    color: #222;

    background: none;

    input {
      margin-right: 10px;
      max-width: 150px;
    }
  }
`;

export const ContainerForm = styled.div`
  min-width: 300px;
  width: 50%;

  form {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
  }

  input {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    margin: 0 0 10px;
  }

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  button {
    border: 0;
    border-radius: 4px;
    height: 44px;
    color: #fff;
    margin: 5px 0 0;
    font-weight: bold;
    font-size: 16px;
  }
`;
