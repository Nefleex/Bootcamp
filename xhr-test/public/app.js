const btnGetPost = document.querySelector(".btn-get-posts");
const btnSubmit = document.querySelector(".btn-submit");
const firstField = document.querySelector(".first-name");
const lastField = document.querySelector(".last-name");

const form = document.querySelector(".myForm");

submit = () => {
  console.log("clicked");
  const data = {
    firstName: firstField.value,
    lastName: lastField.value
  };

  console.log(data);

  fetch("http://localhost:3000/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(result => console.log(result))
    .catch(err => console.log(err));

  // Empty the fields
  firstField.value = "";
  lastField.value = "";
};

getPosts = () => {
  fetch("http://localhost:3000/")
    .then(res => res.json())
    .then(results =>
      results.forEach(element => {
        let list = document.createElement("li");
        list.innerHTML = element.firstName;
        document.body.appendChild(list);
      })
    )
    .then(x => console.log(x))
    .catch(err => console.log(err));
};

btnGetPost.addEventListener("click", getPosts);
btnSubmit.addEventListener("click", submit);
