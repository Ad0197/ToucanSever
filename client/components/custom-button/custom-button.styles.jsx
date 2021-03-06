import styled from "styled-components";

export const CustomButtonContainer = styled.button`
  background-color: ${({ color, theme }) => theme[color]};
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  padding: 10px 30px;
  border-radius: ${({ theme, rounded }) => (rounded ? theme.borderRadiusButton : "0px")};
  font-size: 14px;
  transition: opacity 200ms ease-in, box-shadow 200ms ease;
  color: ${({ theme, txtColor }) => theme[txtColor]};

  &:hover {
    opacity: 0.9;
    box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.2);
  }
`;
