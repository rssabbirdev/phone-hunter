const loadPhonesData = async (searchQuarry) => {
    loader(true)
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchQuarry}`
    if (searchQuarry === '') {
        url = `https://openapi.programming-hero.com/api/phones?search=a`
    }
    const response = await fetch(url);
    const data = await response.json();
    displayPhone(data.data)
}

const loadPhoneBySlug = async(slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    const response = await fetch(url);
    const data = await response.json();
    displayModal(data.data)
}

const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click',() => {
    const searchField = document.getElementById('search-field');
    const searchString = searchField.value;
    loadPhonesData(searchString)
    searchField.value = ''
})

const displayPhone = (phones) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    if (phones.length > 0) {
        phones.forEach(phone => {
        const {brand,phone_name,slug,image} = phone;
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('card','card-side','bg-white','shadow-xl','text-black','w-3/4','p-2')
        phoneCard.innerHTML = `
        <figure><img src=${image} alt="Movie"></figure>
        <div class="card-body">
            <h2 class="card-title">${phone_name}</h2>
            <p>${brand}</p>
            <div class="card-actions justify-end">
            <label onclick="loadPhoneBySlug('${slug}')" for="my-modal-5" class="px-4 py-2 bg-slate-500 hover:bg-slate-600 transition-all text-white rounded-lg cursor-pointer">Details</label>
            </div>
        </div>
        `
        phonesContainer.appendChild(phoneCard)
    })
    } else {
        const noFound = document.createElement('div');
        noFound.innerHTML = `<h1 class="text-3xl">No Product Found</h1>`
        phonesContainer.appendChild(noFound)
    }
    loader(false)
}

const displayModal = (phone) => {
    console.log(phone);
    const { brand, name, image, mainFeatures, releaseDate, others } = phone;
    const {storage, displaySize,chipSet, memory, sensors} = mainFeatures;
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <div class="modal-box w-11/12 max-w-5xl">
        <h3 class="font-bold text-lg">${name}</h3>
        <img class="mx-auto py-4 rounded-lg" src=${image} alt="" />
        <p>Brand: ${brand}</p>
        <p>First Release: ${releaseDate}</p>

        <p class="pl-2 text-bold text-xl">Features</p>

        <p>Storage: ${storage}</p>
        <p>Display Size: ${displaySize}</p>
        <p>Chip Set: ${chipSet}</p>
        <p>Memory: ${memory}</p>
        <div class="modal-action">
        <label for="my-modal-5" class="btn">Close</label>
        </div>
    </div>
    `
}

function loader(isTrue) {
    const loaderContainer = document.getElementById('loader-container');
    if (isTrue) {
        loaderContainer.classList.remove('hidden');
    } else {
        loaderContainer.classList.add('hidden')
    }
}
loadPhonesData('a')