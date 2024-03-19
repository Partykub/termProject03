import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../context/userAuthContext';
import { Navbar, Container, Tab, Row, Col, Image, Nav } from 'react-bootstrap';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getDownloadURL } from "firebase/storage";

function Profile() {
    const { user, logOut } = useUserAuth();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userRef = doc(db, "users", user.uid);
                const userSnapshot = await getDoc(userRef);
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    setUserData(userData);
                } else {
                    setError("User data not found");
                }
            } catch (error) {
                setError("Error fetching document: " + error.message);
            }
        };

        fetchProfileData();
    }, [user]);

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand href="#home" className="mr-auto">
                        <span className="exchange-text">Exchange things</span>
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link onClick={logOut} className="btn btn-danger">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-5">
                <Tab.Container id="profile-tab" defaultActiveKey="profile">
                    <Row>
                        <Col>
                            <h2 className="text-center mb-4">Profile</h2>
                            <Tab.Content>
                                <Tab.Pane eventKey="profile">
                                    {error && <p>{error}</p>}
                                    {userData && (
                                        <>
                                            <div className="text-center mb-4">
                                                <Image src={userData.imageProfile} alt="Profile" roundedCircle style={{ width: '200px', height: '200px' }} />
                                            </div>
                                            <p>Email: {userData.email}</p>
                                            <p>Username: {userData.username}</p>
                                            <p>Phone Number: {userData.phoneNumber}</p>
                                        </>
                                    )}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </>
    );
}

export default Profile;
