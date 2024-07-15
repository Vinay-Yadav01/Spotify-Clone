const hamburger = document.querySelector(".hamburger");
const left = document.querySelector(".left");
let flag = true;
hamburger.addEventListener("click", () => {
  if(flag){
    left.style.left = "0";
    flag = false;
  }
    else{
        left.style.left = "-100%";
        flag = true;
    }
});

const close = document.querySelector(".close");
close.addEventListener("click", () => {
  left.style.left = "-100%";
  flag = true;
});