import styled from 'styled-components';

const accentColor = 'rgb(24,  197, 85)';

const MyButton = styled.button`
  align-items: center;
  background-color: ${(props) =>
    props.variant === 'primary' ? accentColor : 'white'};
  border-radius: 9999px;
  border-style: solid;
  border-width: 1px;
  border-color: ${accentColor};
  color: ${(props) => (props.variant === 'primary' ? 'white' : accentColor)};
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: bold;
  margin: 0.25rem;
  min-height: 36px;
  justify-content: center;
  min-width: 72px;
  outline-style: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  padding: 0 30px;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'primary'
        ? 'rgb(24, 197, 85)'
        : 'rgba(83, 126, 98, 0.1)'};
  }
`;

export default MyButton;
