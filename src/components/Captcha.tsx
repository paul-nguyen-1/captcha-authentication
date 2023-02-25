import React from 'react'

const Captcha = () => {
  //Map out arr of images to store in grid
  const captchaImages: string[] = new Array(9)
    .fill(null)
    .map((value, index : number) => {
      return `/api/ImageAPI?index=${index}.webp`;
    });

  return (
    <div className="captchaContainer">
      <h2>Select All The Jim&#39;s:</h2>
      <div className="captchaImages">
        {captchaImages.map((image, index) => (
          <React.Fragment key={index}>
            <div className='jimImages'>
              <img src={image} alt= {image} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Captcha