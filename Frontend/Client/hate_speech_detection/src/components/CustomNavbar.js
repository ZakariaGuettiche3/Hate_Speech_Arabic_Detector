import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import Logo from '../Assets/Welcome.jpg';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function CustomNavbar() {
  return (
    <Navbar expand="lg" bg="transparent" className=" navigation_bar mx-3  mb-3 p-2">
      <Container>
     <a href='/'><img src={Logo} alt="Eunoia" style={{ height: '120px', marginRight: '8px' }} /></a>   
        
        <Navbar.Toggle />
        <Navbar.Collapse className='collapse p-3'>
          <Nav className="ms-auto ">
            <Nav.Link href="/" className="navTitle mx-md-3">Home</Nav.Link>
            
            <NavDropdown
  className="NavDropdown bg-transparent rounded-0 border-0"
  title={
    <span className="navTitle">
      Advice <FontAwesomeIcon icon={faChevronDown} className="ms-2 mx-md-3" />
    </span>
  }
  id="advice-dropdown"
>
  <NavDropdown.Item href="/advice">Anxiety</NavDropdown.Item>
  <NavDropdown.Item href="/advice">Depression</NavDropdown.Item>
</NavDropdown>

<NavDropdown
  className="NavDropdown bg-transparent rounded-0 border-0"
  title={
    <span className="navTitle">
      Time Management <FontAwesomeIcon icon={faChevronDown} className="ms-2 mx-3" />
    </span>
  }
  id="time-dropdown"
>
  <NavDropdown.Item href="/calendar">Focus</NavDropdown.Item>
  <NavDropdown.Item href="/Task">Productivity</NavDropdown.Item>
</NavDropdown>

          </Nav>
          <Button
  as={Link}
  to="/login"
  className="mt-3 mt-md-0 rounded-pill px-4 login"
  variant="outline-primary"
>
  Login
</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;