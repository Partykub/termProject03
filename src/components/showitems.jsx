import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { storage } from 'firebase/app'; // แก้ไขการ import Firebase Storage เป็น storage จาก firebase/app

function ShowItems() { // แก้ชื่อ function เป็น ShowItems
  const [imageUrls, setImageUrls] = useState([]);

  // ฟังก์ชันสำหรับดึงรายการของรูปภาพจาก Firebase Storage
  const fetchImages = async () => {
    const imagesRef = storage().ref('items'); // ใช้ storage() เพื่อเข้าถึง Firebase Storage
    const items = await imagesRef.listAll();
    const urls = await Promise.all(items.items.map(async (item) => {
      return await item.getDownloadURL();
    }));
    setImageUrls(urls);
  };

  // เรียกใช้งานฟังก์ชัน fetchImages เมื่อคอมโพเนนต์ ShowItems ถูกโหลดครั้งแรก
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <Container className="mt-5">
        <h3>Welcome Page</h3>
        <div className="image-gallery">
          {imageUrls.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Image ${index}`} className="gallery-image" />
          ))}
        </div>
      </Container>
    </>
  );
}

export default ShowItems;
