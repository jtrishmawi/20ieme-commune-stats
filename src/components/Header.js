import React, { useState } from 'react';
import { Link } from '@yeutech-lab/react-router-dom-utils';
import {
  A,
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from '@bootstrap-styled/v4';

const Brand = props => <NavbarBrand tag={A} {...props} />

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="faded" light full toggleable="sm">
      <Container>
        <div className="d-flex justify-content-between">
          <Link tag={Brand} waitChunk to="/">Municipales 2020</Link>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        </div>
        <Collapse navbar isOpen={isOpen}>
          <Nav navbar className="mr-auto">
            <NavItem>
              <Link tag={NavLink} waitChunk to="/">Carte</Link>
            </NavItem>
            <NavItem>
              <Link tag={NavLink} waitChunk to="/tableau">Tableau</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;