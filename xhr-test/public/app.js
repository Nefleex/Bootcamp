let xhr = new XMLHttpRequest();
let formData = new FormData();
const btn = document.querySelector(".btn");

submit = () => {
  console.log("clicked");
  xhr.open("POST", "./database.txt", true);
  xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState == 4) {
      console.log(formData);
      console.log(xhr.status + xhr.readyState);
    }
  };
};

btn.addEventListener("click", submit);
