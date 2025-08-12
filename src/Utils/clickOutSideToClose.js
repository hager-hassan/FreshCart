export default function clickOutSideToClose(elementRef , onOutSideClick){
    function handleClick(event){
    if(!elementRef.current.contains(event.target)){
        onOutSideClick();
    }
  };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
    document.removeEventListener("mousedown", handleClick);
    document.removeEventListener("touchstart", handleClick);
}
}