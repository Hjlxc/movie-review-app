import styled from 'styled-components';

const HEADER_HEIGHT = 50;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const CenteredWrapper = styled(Wrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Root = styled(Wrapper)`
  text-align: center;
  position: relative;
  overflow: hidden;
`;

export const Header = styled(CenteredWrapper)`
  background-color: #282c34;
  height: ${HEADER_HEIGHT}px;
  color: white;
  font-size: 25px;
`;

export const Body = styled(Wrapper)`
  margin-top: ${HEADER_HEIGHT}px;
  top: 0px;
  height: calc(100% - ${HEADER_HEIGHT}px);
  width: 100%;
  padding: 15px;
  position: absolute;
  overflow-x: auto;
`;

export const MovieItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

export const MovieItemSwatch = styled.img`
  width: 100%;
  padding-bottom: 10px;
`;

export const MovieItemTitle = styled.div`
  font-weight: 700;
`;
