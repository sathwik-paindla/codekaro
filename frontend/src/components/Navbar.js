import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  background-color: #1e1e2f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 40px;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Left = styled.div`
  flex: 1;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 25px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #61dafb;
  text-decoration: none;

  &:hover {
    color: #45bafc;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #61dafb;
  }
`;

const Button = styled(Link)`
  background: ${({ primary }) => (primary ? "#61dafb" : "transparent")};
  color: ${({ primary }) => (primary ? "#1e1e2f" : "white")};
  border: ${({ primary }) => (primary ? "none" : "1px solid #61dafb")};
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ primary }) => (primary ? "#45bafc" : "#61dafb")};
    color: ${({ primary }) => (primary ? "white" : "#1e1e2f")};
  }
`;

const Navbar = () => {
  return (
    <Nav>
      {/* Left - Logo */}
      <Left>
        <Logo to="/">Codekaro</Logo>
      </Left>

      {/* Center - Navigation Links */}
      <Center>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/problems">Problems</StyledLink>
        <StyledLink to="/submissions">My Submissions</StyledLink>
      </Center>

      {/* Right - Auth Buttons */}
      <Right>
        <Button to="/login">Login</Button>
        <Button to="/signup" primary>
          Sign Up
        </Button>
      </Right>
    </Nav>
  );
};

export default Navbar;
