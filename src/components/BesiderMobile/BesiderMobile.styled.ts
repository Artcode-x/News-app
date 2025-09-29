import styled from 'styled-components';

export const Page = styled.div`
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  color: #111;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto;
  min-height: 100vh;

  @media (min-width: 600px) {
    max-width: 420px;
  }
`;

export const Content = styled.main`
  role: main;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #d32f2f;
  background: #ffebee;
  border-radius: 8px;
  margin: 20px;
  border: 1px solid;
  font-size: 16px;
`;

export const ErrorMessageReason = styled.div`
  color: orange;
  padding-top: 5px;
`;

export const NoNews = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
`;
