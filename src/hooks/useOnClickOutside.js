import React, { useEffect } from 'react'

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    console.log('ref',ref); //ref.current 는 div.modal 이다

    const listener = (event) =>{
      if(!ref.current || ref.current.contains(event.target)){
        //모달창이 안닫히는 경우
        return;
      }
      //모달창이 닫히는 경우 () => {setModalOpen(false)}
      handler(event);
    }
    document.addEventListener("mousedown",listener);
    document.addEventListener("touchstart",listener);
  },[ref, handler]);
}

export default useOnClickOutside