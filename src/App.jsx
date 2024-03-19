import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

function App() {
  const [imageUrls, setImageUrls] = useState([]);

  const fetchImages = async () => {
    const storage = getStorage();
    const imagesRef = ref(storage, 'items');
    const items = await listAll(imagesRef);
    const urls = await Promise.all(items.items.map(async (item) => {
      return await getDownloadURL(item);
    }));
    setImageUrls(urls);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <span className="exchange-text">Exchange things</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/login" className="btn btn-success me-2">Login</Nav.Link>
              <Nav.Link as={Link} to="/register" className="btn btn-primary">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <div className="gallery-container">
          {imageUrls.map((imageUrl, index) => (
            <div key={index} className="gallery-image-container">
              <img src={imageUrl} alt={`Image ${index}`} className="gallery-image" />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default App;
