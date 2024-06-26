import React from 'react';

const Modal = ({ children, onClose }) => (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
        &#8203;
      </span>
      <div className="inline-block text-black align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left 
      overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
        {children}
        {/* <button onClick={onClose} className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
          Mégse
        </button> */}
      </div>
    </div>
  </div>
);

export default Modal;
