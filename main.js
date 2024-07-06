const todayFact = document.getElementById("todayFact");
const cards = document.getElementById("cards");
const image = document.getElementById("image");

const spinners = `<div class="spinner-border m-5" role="status">
<span class="visually-hidden">Loading...</span>
</div>`;

const generate = () => {
  todayFact.innerHTML = spinners;
  axios
    .get("https://catfact.ninja/fact")
    .then((res) => {
      todayFact.innerHTML = "";
      // console.log(res);
      todayFact.innerHTML = res.data.fact;
    })
    .catch(function (error) {
      todayFact.innerHTML = "";
      console.log(error);
      todayFact.innerHTML += `<div class="text-danger p-3"><i class="fa-solid fa-triangle-exclamation text-danger"></i>Xatolik</div>`;
    });
};

const getCards = (size) => {
  cards.innerHTML = spinners;
  spinners.className = "text-center";
  axios
    .get("https://catfact.ninja/breeds")
    .then((res) => {
      cards.innerHTML = "";
      //console.log(res);
      const cardInfo = size ? res.data.data.slice(0, size) : res.data.data;
      //console.log(cardInfo);

      cardInfo.map((item, index) => {
        // console.log(cardInfo[index].country);
        cards.innerHTML += `        
        <div class=" col-md-4">
          <div class="card  rounded-3 p-3 my-3" style="background-color: #E4C1AB;">
            <p class="text-black">Breed :${cardInfo[index].breed}</p>
            <p class="text-black">Country : ${cardInfo[index].country}</p>
            <p class="text-black">Origin : ${cardInfo[index].origin}</p>
            <div class="d-flex align-items-center justify-content-between">
            <button class="btn" style="background-color: #FC6C12;">${cardInfo[index].pattern}</button>
            <button class="btn" style="background-color: #FC6C12;">${cardInfo[index].coat}</button>

          </div>
          
        </div>
        `;
      });
    })
    .catch(function (error) {
      cards.innerHTML = "";
      console.log(error);
      cards.innerHTML += `<div class="text-danger p-3"><i class="fa-solid fa-triangle-exclamation text-danger"></i>Xatolik</div>`;
    });
};

const getImageCat = () => {
  axios.get("https://api.thecatapi.com/v1/images/0XYvRd7oD").then((res) => {
    // console.log(res);
    image.src = res.data.url;
  });
};

const Init = () => (getCards(9), getImageCat());

Init();
