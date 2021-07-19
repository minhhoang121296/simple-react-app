import styled from 'styled-components';
import {media} from '../global';

export const Grid = styled.div`
`;

export const Col = styled.div<{size?: number}>`
  flex: ${({size}) => (size ? size : 1)};
  margin: 5px;
`;

export const Row = styled.div<{flexDirection?: string;}>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({flexDirection}) => (flexDirection ? 'row-reverse' : 'row')};
  margin-bottom: 10px;

  ${media.phone} {
    flex-direction: column;
  }
`;