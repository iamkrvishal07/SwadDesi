import React from 'react'

const Model = ({ children, onClose }) => {
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
        <dialog className="modal" open onClick={e => e.stopPropagation()}>
          {children}
        </dialog>
      
    </>
  )
}

export default Model
