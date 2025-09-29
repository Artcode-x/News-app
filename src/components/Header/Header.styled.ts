import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #efefef;
  position: sticky;
  top: 0;
  background: white;
  z-index: 40;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 0;
  text-align: center;
  flex: 1;
`;

export const MenuButton = styled.button`
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }
`;

export const MenuIcon = styled.span`
  width: 18px;
  height: 2px;
  background: #111;
  box-shadow:
    0 6px 0 #111,
    0 -6px 0 #111;
  display: inline-block;
`;
