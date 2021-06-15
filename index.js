const addButton = document.querySelector("#add");

const updateLSData = () => {
    const compiledData = document.querySelectorAll('textarea');
    // console.log(compiledData);
    const arr = [];
    compiledData.forEach((currValue) => {
        return arr.push(currValue.value);
        // console.log(arr);
    })
    localStorage.setItem('storedcContent', JSON.stringify(arr));
}



const insertTile = (text = '') => {
    console.log(text);
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('note');
    // console.log(containerDiv);
    const injectedHtmlData = `
    <div class="operation">
<button class="edit"> <i class="fas fa-edit"></i> </button>
<button class="delete"> <i class="fas fa-trash-alt"></i> </button>
</div>

<div class="main ${text ? "" : "hidden"} "></div>
<textarea class="${text ? "hidden" : ""}"></textarea>  `



    containerDiv.insertAdjacentHTML('afterbegin', injectedHtmlData)

    //Reference variables to use 
    const editButton = containerDiv.querySelector('.edit');
    const deleteButton = containerDiv.querySelector('.delete');
    const mainDiv = containerDiv.querySelector('.main');
    const editDiv = containerDiv.querySelector('textarea');

    //adding deleting functionality
    deleteButton.addEventListener('click', () => {
        containerDiv.remove();
        updateLSData();
    })


    editDiv.value = text;
    mainDiv.innerHTML = text;



    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        editDiv.classList.toggle('hidden');
    })

    //adding functionality ==> that whatever we write in our editDiv is then displayed in mainDiv on toggling
    editDiv.addEventListener('change', (event) => {
        const data = event.target.value;
        mainDiv.innerHTML = data;

        updateLSData();
    })


    document.body.appendChild(containerDiv);
}

const arr = JSON.parse(localStorage.getItem('storedcContent'));
if (arr) { arr.forEach((currValue) => insertTile(currValue)) };







addButton.addEventListener('click', ()=> insertTile());