import styled from 'styled-components';

export const NewsItem = styled.article<{ $error?: boolean }>`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  cursor: ${({ $error }) => ($error ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: ${({ $error }) => ($error ? '16px' : '12px')};
  margin: 0 -12px;
  border: ${({ $error }) => ($error ? '1px solid #ff4d4f' : 'none')};
  background: ${({ $error }) => ($error ? '#fff2f0' : 'transparent')};
  color: ${({ $error }) => ($error ? '#a8071a' : 'inherit')};

  &:hover {
    transform: ${({ $error }) => ($error ? 'none' : 'scale(1.02)')};
    background-color: ${({ $error }) => ($error ? 'inherit' : '#f8f9fa')};
    box-shadow: ${({ $error }) =>
      $error ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  }

  &:hover img {
    transform: ${({ $error }) => ($error ? 'none' : 'scale(1.05)')};
  }

  &:hover h3 {
    color: ${({ $error }) => ($error ? 'inherit' : '#0070f3')};
  }

  &:hover span {
    color: ${({ $error }) => ($error ? 'inherit' : '#0056b3')};
  }
`;

export const Thumb = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 4px;
  transition: transform 0.3s ease;
`;

export const Body = styled.div`
  flex: 1;
`;

export const Meta = styled.div`
  margin-bottom: 4px;
`;

export const Source = styled.span`
  color: #0070f3;
  font-weight: 800;
  font-size: 14px;
  line-height: 100%;
  transition: color 0.3s ease;
`;

export const Title = styled.h3`
  margin: 2px 0 6px 0;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  transition: color 0.3s ease;
`;

export const Date = styled.time`
  display: block;
  font-size: 14px;
  color: #7b7b7b;
  font-weight: 400;
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #efefef;
  margin: 12px 0;
  display: none;
`;

export const Section = styled.section`
  margin: 24px 0;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  margin: 0 0 12px 0;
  font-weight: 700;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;
