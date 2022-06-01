//problem class:represent a problem
//ui class: handle ui task
//store class: handle storage
//event:diplay books, add book, remove book

class Problem {
  constructor(title, link, platform, topic, status, remarks,date) {
    this.title = title;
    this.link = link;
    this.platform = platform;
    this.topic = topic;
    this.status = status;
    this.remarks = remarks;
   
    this.date= date;
  }
}
//
class UI {
  static displayProblems() {
    

    const problems = store.getProblems();

    problems.forEach((problem) => UI.addProblemToList(problem));

  }

  static addProblemToList(problem) {
    const list = document.querySelector("#problem-list");

    const row = document.createElement("tr");

   
   

    row.innerHTML = `
       
   
        <td>${problem.date[0]}-${problem.date[1]}-${problem.date[2]}</td>
        <td class="wrap "><a href=${problem.link} target="_blank" rel="noopener noreferrer" class="link">${problem.title}</td>
        <td >${problem.platform}</td>
        <td >${problem.topic}</td>
        <td>${problem.status}</td>
        <td class="wrap">${problem.remarks}</td>
      
       <td><a href="#" class=" btn btn-danger btn-sm delete">X</a></td>
        `;

   
    list.appendChild(row);
  }

  static deleteProblem(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
      UI.showAlert("Problem removed","info");
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#problem-form");
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 1000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#Link").value = "";
    document.querySelector("#Platform").value = "";
    document.querySelector("#Topic").value = "";
    document.querySelector("#Status").value = "";
    document.querySelector("#Remarks").value = "";
  }
}

class store{

    static getProblems()
    {
        let problems;
        if(localStorage.getItem('problems')===null)
        {
            problems=[];
        }
        else
        {
            problems=JSON.parse(localStorage.getItem('problems'));
        }
        
        return problems;

    }

    static addProblem(problem)
    {
        const problems= store.getProblems();

        problems.push(problem);

        localStorage.setItem('problems',JSON.stringify(problems));

    }

    static removeProblem(title)
    {
        const problems= store.getProblems();

        problems.forEach((problem,index) => {

            if(problem.title==title)
            {
                problems.splice(index,1);


            }
        });

        localStorage.setItem('problems',JSON.stringify(problems));

    }
}

document.addEventListener("DOMContentLoaded", UI.displayProblems);

document.querySelector("#problem-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const link = document.querySelector("#Link").value;
  const Platform = document.querySelector("#Platform").value;
  const Topic = document.querySelector("#Topic").value;
  const Status = document.querySelector("#Status").value;
  const Remarks = document.querySelector("#Remarks").value;
  const day = new Date().getDate();
  const month = new Date().toLocaleString('default', { month: 'long' });
  const year = new Date().getFullYear();
  const date= [day,month,year];
  

  //validate

  if (
    title == "" ||
    link == "" ||
    Platform == "" ||
    Status == "" ||
    Topic == "" 
    
  ) {
    UI.showAlert("Please fill in all compulsory fields", "danger");
  } else {
    //instantiate problem
    const problem = new Problem(title, link, Platform, Topic, Status, Remarks,date);

    //add problem to ui

    UI.addProblemToList(problem);

    store.addProblem(problem);
    UI.showAlert("Problem Added successfully","success");


    UI.clearFields();
  }
});

//remove a problem

document.querySelector("#problem-list").addEventListener("click", (e) => {
  UI.deleteProblem(e.target);

  store.removeProblem(e.target.parentElement.parentElement.children[1].textContent);
  // console.log(e.target.parentElement.parentElement.children)
});


// //filter problems on basis of topics

// document.querySelector('#Attempted').addEventListener("click",(e)=>{

//   console.log((e.target));
// })
