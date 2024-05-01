import React, { useState } from 'react'
import { editProfile } from '../../../api/FirestoreAPI';
import { AiOutlineClose } from 'react-icons/ai';
import './ProfileEdit.scss'
import { Button } from 'antd'

export default function ProfileEdit({onEdit,currentUser}) {
    const [editInputs,setEditInputs] = useState(currentUser);
    const getInput = (event) =>{
        let {name,value} = event.target;
        let input = {[name]:value};
        setEditInputs({...editInputs,...input});
    };
    const updateProfileData = async () =>{
        await editProfile(currentUser?.id,editInputs);
        await onEdit();
    };
  return (
    <div className='profile-card'>
        
        <div className="edit-btn">
          <AiOutlineClose onClick={onEdit} className='close-icon' size={25}/>
        </div>
        <div className="profile-edit-inputs">
        <label>Name</label>
        <input  
            onChange={getInput} 
            className='edit-input' 
            type="text" 
            placeholder='Name' 
            name='name'
            value={editInputs.name}
        />
        <label>Headline</label>
        <input 
            onChange={getInput} 
            className='edit-input' 
            type="text" 
            placeholder='Headline' 
            name='headline'
            value={editInputs.headline}
        />
        <label>Country</label>
        <input 
            onChange={getInput} 
            className='edit-input' 
            type="text" 
            placeholder='Country' 
            name='country' 
            value={editInputs.country}
            />
        <label>City</label>
        <input 
            onChange={getInput} 
            className='edit-input' 
            type="text" 
            placeholder='City' 
            name='city' 
            value={editInputs.city}
            />
        <label>Company</label>
        <input 
            onChange={getInput} 
            className='edit-input' 
            type="text" 
            placeholder='Company' 
            name='company'
            value={editInputs.company}
        />
        <label>Industry</label>
        <input 
            onChange={getInput} 
            className='edit-input' 
            type="text" 
            placeholder='Industry' 
            name='industry' 
            value={editInputs.industry}
            />
        <label>College</label>
        <input 
            onChange={getInput} 
            className='edit-input' 
            type="text" 
            placeholder='College' 
            name='college'
            value={editInputs.college}
        />
        <label>Website</label>
        <input 
            onChange={getInput} 
            className='edit-input' 
            type="text" 
            placeholder='Website' 
            name='website' 
            value={editInputs.website}
            />
        <label>About Me</label>
        <textarea 
            onChange={getInput} 
            className='edit-textArea' 
            rows={5}
            placeholder='About Me' 
            name='aboutMe' 
            value={editInputs.aboutMe}
            />
            <label>Skills</label>
            <input 
            onChange={getInput} 
            className='edit-input' 
            type="text" 
            placeholder='Skills' 
            name='skills' 
            value={editInputs.skills}
            />
        </div>
        
        <div className="save-container">
            <Button className='save-btn' onClick={updateProfileData}>Save</Button>
        </div> 
    </div>
  )
}
