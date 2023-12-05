import React, {useState} from 'react'
import AccountNav from './AccountNav';
import PhotoUploader from '../../Components/PhotoUploader'

const AccountMemory = () => {
  const [addedPhotos,setAddedPhotos] = useState([]);
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  return (
    <div className='mb-4'>
      <AccountNav />
      <p className='text-[30px] font-semibold text-[#F2BE22] text-center'>My Memories</p>
      {preInput('Photos','Save the moments')}
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
    </div>
  )
}

export default AccountMemory