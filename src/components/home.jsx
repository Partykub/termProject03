import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/userAuthContext';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

function Home() {
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const [imageUrls, setImageUrls] = useState([]);

    console.log(user);

    const handleProfile = async () => {
        try {
            navigate('/profile');
        } catch(err) {
            console.log(err.message);
        }
    }
    

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
                            <Nav.Link onClick={handleProfile} className="btn btn-danger">Profile</Nav.Link>
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

export default Home;
