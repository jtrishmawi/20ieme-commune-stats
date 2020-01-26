import styled from 'styled-components';

export const Container = styled.div`
  width: ${props => props.theme.popup.width};
`

export const BallotContainer = styled.div`
  height: 200px;
`

export const List = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-around;
  padding: 0;
`

export const Table = styled.table`
  width: 100%;

  th:last-child,
  td:last-child {
    text-align: center;
  }
`

export const Header = styled.h3`
text-align: center;

  small {
    display: block;
  }
`