import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button, Container, Row, Col } from 'react-bootstrap';
import { useUserAuth } from "../context/userAuthContext";
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db, imageDb } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(""); 
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const { signUp } = useUserAuth();
    const navigate = useNavigate();
    const [image, setImage] = useState(null); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const userCredential = await signUp(email, password);
            const { uid } = userCredential.user;
            
            let imageProfile = "";
            if (image) {
                const imageRef = ref(imageDb, `imageUsers/${image.name + v4()}`);
                await uploadBytes(imageRef, image);
                imageProfile = await getDownloadURL(imageRef);
            }

            await setDoc(doc(db, "users", uid), {
                email: email,
                username: username,
                phoneNumber: phoneNumber,
                imageProfile: imageProfile || "", 
            });

            navigate("/");
        } catch(err) {
            setError(err.message);
            console.log("error adding document", err);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                    <div className="p-4 box">
                        <h2 className="mb-3">Register</h2>
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Control 
                                    type="email"
                                    placeholder="Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                <Form.Control 
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicUsername'>
                                <Form.Control 
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicPhoneNumber'>
                                <Form.Control 
                                    type="tel"
                                    placeholder="Phone Number"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicImage'>
                                <Form.Control 
                                    type="file"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </Form.Group>

                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">Sign Up</Button>
                            </div>
                        </Form>
                        <div className="text-center mt-3">
                            Already have an account? <Link to={"/login"}>Login</Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;
