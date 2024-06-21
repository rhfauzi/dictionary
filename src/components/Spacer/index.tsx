import styled from 'styled-components';
import { COLORS } from 'src/const/COLORS';

export const Spacer = styled.span`
  display: ${(p: any) => p.display || 'block'};
  width: ${(p: any) => p.size}px;
  min-width: ${(p: any) => p.size}px;
  height: ${(p: any) => p.size}px;
  min-height: ${(p: any) => p.size}px;
  background-color: ${(p: any) => COLORS[p.color] || p.color || 'transparent'};
  flex-grow: ${(p: any) => p.filler && 1};
  flex-basis: ${(p: any) => p.basis || 'auto'};
`;

export default Spacer