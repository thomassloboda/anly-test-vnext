const createProductCartridge = () => {
  const article = document.createElement("article");
  article.classList.add("product");
  const img = document.createElement("img");
  img.src = "https://picsum.photos/200/300";
  article.appendChild(img);
  const p = document.createElement("p");
  p.innerText = "My Product";
  article.appendChild(p);
  article.addEventListener("click", function() {
    window.location = "/product.html?id=" + new Date().getTime();
  });
  return article;
};

const list = document.querySelector("#list");

for (var i = 0; i < 10; i++) {
  list.appendChild(createProductCartridge());
}
