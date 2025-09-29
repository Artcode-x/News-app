import { useDispatch, useSelector } from 'react-redux';
import { openMenuSelector } from '../../store/selectors/selector';
import { setSidebarOpen } from '../../store/reducers/reducers';
import * as S from './Sidebar.styled';

function Sidebar() {
  const open: boolean = useSelector(openMenuSelector);
  const dispatch = useDispatch();

  const closeMenu = () => dispatch(setSidebarOpen(false));

  const categories: string[] = [
    'SCIENCE',
    'GENERAL',
    'ENTERTAINMENT',
    'TECHNOLOGY',
    'BUSINESS',
    'HEALTH',
    'SPORTS',
  ];

  return (
    <S.Overlay $open={open}>
      <S.Aside tabIndex={open ? 0 : -1}>
        <S.CloseButton onClick={closeMenu}>×</S.CloseButton>
        <S.List>
          {categories.map(category => (
            <S.Item key={category}>{category}</S.Item>
          ))}
        </S.List>
      </S.Aside>
    </S.Overlay>
  );
}

export default Sidebar;
