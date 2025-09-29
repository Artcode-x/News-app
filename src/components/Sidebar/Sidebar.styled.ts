import styled, { css } from 'styled-components';

export const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  align-items: flex-start;
  justify-content: center;
  z-index: 50;
  background: rgba(0, 0, 0, 0);
`;

export const Aside = styled.aside`
  width: 260px;
  max-width: 92vw;
  background: white;
  margin-top: 40px;
  padding: 28px 24px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
  position: relative;
  border-radius: 8px;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 12px;
  top: 8px;
  border: none;
  background: transparent;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    color 0.2s ease;

  &:hover {
    transform: scale(1.2);
    color: crimson;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 60px 0 0 0;
  margin: 0;
`;

export const Item = styled.li`
  padding: 12px 0;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #f5f5f5;
    border-radius: 6px;
    padding-left: 8px;
  }
`;
