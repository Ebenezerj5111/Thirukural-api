
const kuralinput = document.querySelector("#kuralinput");

const btn = document.querySelector("#btn");

const word = document.querySelector(".word");

btn.addEventListener('click', async (e) => {

    e.preventDefault();

    const kural = kuralinput.value;

    if (kural >= 1 && kural <= 1330) {

        try {
            const kuraldata = await getkuralData(kural);
            displaykural(kuraldata);

            // console.log(kuraldata)
        }

        catch (error) {
            displayError(error)

            // console.log(error)
        }
    }

    else {
        displayError("1 முதல் 1330 குறள் எண்ணை உள்ளிடவும்.")

        // console.log(error)
    }
})


async function getkuralData(number) {

    const apiurl = `https://getthirukkural.appspot.com/api/3.0/kural/${number}?appid=18c2aukokxmoz`

    const response = await fetch(apiurl);

    console.log(response)

    if (!response.ok) {
        throw new Error("Could Not Fetch Kural Data")
    }
    return response.json();

}

function displaykural(data) {

    word.textContent = ""
    word.innerHTML += `
     <div class="content">
       <h3>திருக்குறள் : ${data.number}</h3>
         <ul>
          <h4>"${data.line1} <br>${data.line2}"</h4>
         </ul>

         <h2>பொருள் : </h3>
          <p>${data.urai1}</p> 
     </div> 
     
     <div class="content2">
        <h2>மொழிபெயர்ப்பு :</h2>
        <p>${data.translation}.</p>
    </div>
    `
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;

    word.textContent = ""
    word.style.display = "flex"
    word.appendChild(errorDisplay)
}

{/* <h3>திருக்குறள் : ${data.number}</h3> */}


