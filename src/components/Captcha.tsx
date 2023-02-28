import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Props {
  onChange: (indexes: number[]) => void;
  captchaKey: string;

}

const Captcha = ({ onChange, captchaKey }: Props) => {
  //Check or select index
  const [selectIndex, setSelectIndex] = useState<number[]>([])

  //Validation for index selected
  useEffect(() => {
    onChange(selectIndex)
  }, [selectIndex])

  //Reset index for each reload of captcha
  useEffect(() => {
    setSelectIndex([])
  }, [captchaKey])



  //Map out arr of images to store in grid
  const captchaImages: string[] = new Array(9)
    .fill(null)
    .map((value, index: number) => {
      return `/api/ImageAPI?index=${index}&key=${captchaKey}`;
    });

  const handleSelectIndex = (index: number) => {
    //Handle and filter all index's that have been selected/unselected
    setSelectIndex(previousIndex => {
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
              onClick={() => handleSelectIndex(index)}
              className={selectIndex.includes(index) ? 'selectedJimImages' : 'jimImages'}>
              <Image src={image} alt={image} width="64" height="64"/>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Captcha;