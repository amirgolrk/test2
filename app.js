////variables

///eventListeners
function eventListeners() {
  document.addEventListener("DOMContentLoaded", LsONLoad);
  document.querySelector("#formm").addEventListener("submit", newNote);
  document.querySelector("#myul").addEventListener("click", function (e) {
    if (e.target.classList.contains("deletebtns")) {
      deleteFunc(e);
    }
  });
}
eventListeners();

///functions

function newNote(e) {
  e.preventDefault();
  const myValue = document.getElementById("textarea").value;
  console.log(myValue);
  //console.log(myValue.split(','));
  let muli = document.createElement("li");
  muli.classList = "p-2 list-group-item d-flex justify-content-between";
  muli.innerHTML = `<span>${myValue}</span>
              <a class="deletebtns">X</a>`;
  document.querySelector("#myul").appendChild(muli);
  if (localStorage.getItem("notes")) {
    let prevArr = getfromLS();
    prevArr.push(myValue);
    let newData = JSON.stringify(prevArr);
    localStorage.setItem("notes", newData);
    console.log(newData);
  } else {
    localStorage.setItem("notes", JSON.stringify([myValue]));
  }
  this.reset();
  //console.log(getfromLS);
}

function getfromLS() {
  let arr = [];
  let notes = localStorage.getItem("notes");
  if (notes !== null) {
    arr = JSON.parse(notes);
  } else {
    arr = [];
  }
  //arr.push(notes)
  //console.log(arr);
  return arr;
}

function LsONLoad() {
  let rawInfo = localStorage.getItem("notes");
  if (rawInfo !== null) {
    let arrayedInfo = JSON.parse(rawInfo);
    arrayedInfo.map((index) => {
      let muli = document.createElement("li");
      muli.classList = "p-2 list-group-item d-flex justify-content-between";
      muli.innerHTML = `<span>${index}</span>
                <a class="deletebtns">X</a>`;
      document.querySelector("#myul").appendChild(muli);
    });
  } else {
    console.log("local storage is null");
  }
}

function deleteFunc(e) {
  //e.preventDefault();
  let li = e.target.closest("li");
  li.remove();
  //remove from ls
  //console.log(li.querySelector('span').innerText);     // innerText innerHTML textContent
  let text = li.querySelector("span").innerText;
 /* let updatedNotes = getfromLS().filter((index) => {
    index !== text;
  });*/ //this function didnt work because when you use curly bracket you need to define 'return' explicitly
  let updatedNotes = getfromLS().filter(index => index !== text)

  localStorage.setItem('notes',JSON.stringify(updatedNotes))
}
