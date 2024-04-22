import React, { useState } from 'react'
import '../QrcodeGenerator/Main.css';
// import img from '../QrcodeGenerator/people-9.jpg'

// Qrcodegenerator using state

const QrCode = () => {

  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] =useState("https://youtube.com");
  const [size, setSize] = useState("150");

  async function GenerateQR(){

    setLoading(true)

    try {

      const url =
      `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
      setImg (url)
      
    } catch (error) {
      
    }finally{
      setLoading(false)
    }  
    
  }

  const DownloadQR = () => {
      fetch(img).then((Response) => Response.blob()).then((blob) =>{

        const link =document.createElement("a")
        link.href = URL.createObjectURL(blob);
        link.download= "qrcode.png";
        document.body.appendChild(link);
        link.click();
       document.body.removeChild(link);
      }).catch((error) => {
        console.error("Error downloading QR", error);
      });
    
  }
  return (
    <>
      <div className='app-container'>
      <h3>QR Code Generator</h3>
     {loading && <p>Please wait....</p>}
       { img && <img src={img} alt='' className='qr-code-image' />}
        <label htmlFor='dataInput' className='input-label'>Data For Qr Code:</label>

        <input type='text' id='dataInput' value={data} placeholder='Enter qr code' 
        onChange={(e) => setData(e.target.value)}/>

        <label htmlFor='sizeInput' className='input-label'>
          image Size:
        </label>
        <input type='text' id='sizeInput' value={size} placeholder='Enter image size' 
        onChange={(e) => setSize(e.target.value)}/>

        <button className='generate-button' disabled={loading} onClick={GenerateQR}>Generate QR Code</button>

        <button className='download-button'onClick={DownloadQR}>Download QR Code</button>


      </div>

      <p>Designed By <a href='nivethitha.github.io' target='_blank'>Nivethitha U</a></p>

    </>
  )
}

export default QrCode