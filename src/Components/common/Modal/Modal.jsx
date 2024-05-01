import React,{useState} from 'react';
import { Button, Modal, Progress } from "antd";
import './modal.scss';
import { AiOutlinePicture } from 'react-icons/ai';
import ReactQuill from 'react-quill';
const ModalComponent = ({ modalOpen, setModalOpen, 
   sendStatus, setStatus, status,updateStatus,
   isEdit,uploadPostImage, setPostImage , postImage,  currentPost, setCurrentPost}) => {
    const [progress, setProgress] = useState(0);
  return (
    <>
      {/* Post Update Modal */}
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage('');
          setCurrentPost({});
        }
        }
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage('');
          setCurrentPost({});
        }
        }
        footer={[
          <Button
            onClick={isEdit ? updateStatus : sendStatus}
            key="submit" type="primary" disabled={status.length > 0 ? false : true}>
            {isEdit ? "Update" : "Post"}
          </Button>,
        ]}
      >
      <div className='posts-body'>
        
        < ReactQuill className='modal-input' theme='snow' value={status} onChange={setStatus} />

        {progress === 0 || progress === 100 ? 
            ( <> </> ) :
            (<div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>)
        }

        {postImage?.length > 0 || currentPost?.postImage?.length ? 
        <img className='preview-image' src={postImage || currentPost?.postImage} alt='postImage' /> : <></>}
        
      </div>

        <label for="pic-upload">
          <AiOutlinePicture size={35} className='picture-icon' />
        </label>
        
        <input id='pic-upload' type={'file'} hidden onChange={(event) => uploadPostImage(event.target.files[0], setPostImage , setProgress)}/>
      </Modal>
    </>
  );
};

export default ModalComponent;