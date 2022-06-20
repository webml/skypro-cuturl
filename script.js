const form = document.querySelector(".form");
const inputForm = form.querySelector(".input");
const btnForm = form.querySelector(".btn");

const result = document.querySelector(".result");
const btnCopy = result.querySelector(".btn");
const resultHref = result.querySelector(".result__href");


let valid = new RegExp(
  "^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"
);

const request = new XMLHttpRequest();

inputForm.addEventListener("input", () => {
  if (!valid.test(inputForm.value)) {
    console.log("Введите ссылку");
    btnForm.setAttribute("disabled", "disabled")
  }

  if (valid.test(inputForm.value)) {
    btnForm.removeAttribute("disabled", "disabled");
  }
});

btnForm.addEventListener("click", () => {
  event.preventDefault();
  request.open(
    "GET",
    "https://tinyurl.com/api-create.php?url=" + inputForm.value
  );
  request.send();
})

request.onload = function () {
  resultHref.textContent = request.response;
  resultHref.setAttribute("href", request.response);
  result.classList.remove('result__none');
};

btnCopy.addEventListener("click", () => {
 navigator.clipboard.writeText(resultHref.textContent);
});