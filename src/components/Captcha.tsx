import React, { useEffect, useState } from 'react'

interface Props {
  onChange: (indexes: number[]) => void;
}

const Captcha = ({ onChange }: Props) => {
  //Check or select index
  const [selectIndex, setSelectedIndex] = useState<number[]>([])

  //Call onChange function with selectIndex array whenever it changes
  useEffect(() => {
    onChange(selectIndex)
  }, [selectIndex])

  //Map out arr of images to store in grid
  const captchaImages: string[] = new Array(9)
    .fill(null)
    .map((value, index: number) => {
      return `/api/ImageAPI?index=${index}`;
    });

  const handleSelectedIndex = (index: number) => {
    //Handle and filter all index's that have been selected/unselected
    setSelectedIndex(previousIndex => {
      if (previousIndex.includes(index)) {
        return previousIndex.filter(value => value !== index)
      } else {
        return [...previousIndex, index]
      }
    })
  }

  return (
    <div className="captchaContainer">
      <h2>Select All The Jim&#39;s:</h2>
      <div className="captchaImages">
        {captchaImages.map((image, index) => (
          <React.Fragment key={index}>
            <div
              onClick={() => handleSelectedIndex(index)}
              className={selectIndex.includes(index) ? 'selectedJimImages' : 'jimImages'}>
              <img src={image} alt={image} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Captcha;