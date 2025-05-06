import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavHeader() {
  return (
    <Container>
      <Navbar expand="xxl" className="bg-body-tertiary" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Container>
          <Navbar.Brand href="#" style={{ fontSize: '2rem', fontWeight: '600', color: '#1a73e8' }}>
            Secure Notes
          </Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
}

export default NavHeader;
