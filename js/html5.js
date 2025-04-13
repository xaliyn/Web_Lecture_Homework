// Web Storage
if (localStorage.hits) {
    localStorage.hits = Number(localStorage.hits) + 1;
  } else {
    localStorage.hits = 1;
  }
  document.getElementById("localResult").innerText =
    "Total Hits: " + localStorage.hits;
    
    function resetLocalStorage() {
        localStorage.removeItem("hits");
        location.reload();
      }
      
  
  // Web Worker
  function bigLoop() {
    if (typeof(Worker) !== "undefined") {
      const worker = new Worker("js/bigLoop.js");
      worker.onmessage = function(event) {
        alert("Completed " + event.data + " iterations");
      };
    } else {
      alert("Sorry, your browser does not support Web Workers...");
    }
  }
  
  function sayHello() {
    alert("Hello...");
  }
  
  // Simulate SSE
  function simulateSSE() {
    let time = new Date().toLocaleTimeString();
    document.getElementById("sseResult").innerHTML += `Message: ${time}<br>`;
  }
  
  // Geolocation
  function getLocation() {
    const x = document.getElementById("geoResult");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    const x = document.getElementById("geoResult");
    x.innerHTML =
      "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;
  }
  
  // Drag and Drop
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
  
  
