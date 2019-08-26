import styled from 'styled-components';

export const Container = styled.div`
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
    background: #3b9eff;
    border: 0;
    border-radius: 4px;
    height: 44px;
    color: #fff;
    margin: 5px 0 0;
    font-weight: bold;
    font-size: 16px;
  }
`;
