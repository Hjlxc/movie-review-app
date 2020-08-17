import styled from 'styled-components';

const HEADER_HEIGHT = 50;
const BODY_PADDING = 15;

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
  height: calc(100% - ${HEADER_HEIGHT + BODY_PADDING * 2}px);
  width: calc(100% - ${BODY_PADDING * 2}px);
  padding: ${BODY_PADDING}px;
  position: absolute;
`;
