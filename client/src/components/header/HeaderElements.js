import styled from "styled-components";

export const Nav = styled.nav`
  /* border: 1px solid red; */

  /* 070a10 */
  /* background: #000; */
  background: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 10vh;
  margin-top: -80px;
  font-size: 1rem;
  border-bottom: 3px solid #fff;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  padding: 0 24px;
`;

export const NavLogo = styled.a`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;

  > .MuiSvgIcon-root {
    color: #04d394;
    font-size: 2.25rem;
    margin-right: 5px;
  }

  &:hover {
    > h1 {
      color: #04d394;
    }
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 960px) {
    display: none;
    padding: 0;
  }
`;

export const NavItem = styled.li``;

export const NavBox = styled.div`
  /* border: 1px solid red; */

  display: flex;
  align-items: center;
  background: #fff;
  height: 30px;
  margin-left: 50px;
  padding: 10px 12px;
  border-radius: 10px;

  > h4 {
    color: #000;
    margin: 0;
    margin-right: 3px;
    font-weight: 400;
  }

  > a {
    color: #04d394;
    text-decoration: none;
  }

  &:hover {
    background: #0c111c;

    > h4 {
      color: #fff;
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBox2 = styled.div`
  display: flex;
  align-items: center;

  height: 30px;
  margin-left: 50px;
  padding: 10px 12px;
  border-radius: 10px;

  > h4 {
    color: #fff;
    margin: 0;
    margin-right: 3px;
    font-weight: 400;
  }

  > a {
    color: #04d394;
    text-decoration: none;
  }

  &:hover {
    > a {
      color: #18ad7b;
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
