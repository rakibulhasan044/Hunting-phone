const loadPhone = async (searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    //console.log(phones)
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    //console.log(phones)

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = ``;

    //display show all button if therer are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');

    } else {
        showAllContainer.classList.add('hidden');
    }

    console.log('is show all ' + isShowAll)

    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
    
    phones.forEach(phone => {
        //console.log(phone)
        //2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.className = `card bg-gray-100 shadow-xl p-5`;
        //3. set innerhtml
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>this is the latest phone with latest featurs and inovation</p>
                <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        //4. appendchild
        phoneContainer.appendChild(phoneCard)
    });
    //hide loading spinner

    toggleLoadingSpinner(false);
}

//detals show method
const showDetails = async (id) =>{
    //console.log('work', id)
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    
    showPhoneDetails(phone);
}
//handle search button

// phone details

const showPhoneDetails = (phone) =>{
    console.log(phone)
    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-container');

    showDetailsContainer.innerHTML = `
        <img src='${phone.image}'/>
        <p><span>Strorage:</span>${phone.mainFeatures?.storage}</p>
    `;
    show_details_modal.showModal()
}

const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

//handle show all
 const handleShowAll = () =>{
    handleSearch(true);
 }

// loadPhone();