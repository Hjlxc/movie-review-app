import styled from 'styled-components';

const HEADER_HEIGHT = 50;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const HorizontalFlexWrapper = styled.div`
  display: flex;
`;

export const VerticalFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CenteredWrapper = styled(Wrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextWrapper = styled.div`
  padding-bottom: 5px;
`;
export const BoldWrapper = styled(TextWrapper)`
  font-weight: 700;
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

export const MovieItemWrapper = styled(VerticalFlexWrapper)`
  padding-bottom: 20px;
  position: relative;
`;

export const MovieItemSwatch = styled.img`
  width: 100%;
  position: relative;
  padding-bottom: 10px;
  cursor: pointer;
  top: 0px;
  &:hover {
    top: -3px;
  }
`;

export const MovieModalSwatch = styled.img`
  height: 100%;
  max-height: 300px;
  padding-right: 10px;
`;
