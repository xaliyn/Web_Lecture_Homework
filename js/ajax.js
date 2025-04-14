
function getRequest() {
    return new XMLHttpRequest();
  }
  
  function readData() {
    const code = document.getElementById("code").value.trim();
    if (!code) return alert("Please enter your code.");
  
    const xhr = getRequest();
    xhr.open("POST", "http://gamf.nhely.hu/ajax2/");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    xhr.onload = function () {
      const res = JSON.parse(xhr.responseText);
      const list = res.list;
  
      let html = "";
      let sum = 0, max = 0;
  
      list.forEach((item) => {
        html += `ID: ${item.id}, Name: ${item.name}, Height: ${item.height}, Weight: ${item.weight}<br>`;
        const heightNum = parseFloat(item.height);
        if (!isNaN(heightNum)) {
          sum += heightNum;
          if (heightNum > max) max = heightNum;
        }
      });
  
      const avg = (list.length > 0) ? (sum / list.length).toFixed(2) : 0;
  
      document.getElementById("readResult").innerHTML = html;
      document.getElementById("heightStats").innerHTML =
        `<strong>Height Stats</strong><br>Sum: ${sum}<br>Average: ${avg}<br>Max: ${max}`;
    };
  
    xhr.send(`op=read&code=${code}`);
  }
  

  function createData() {
    const name = document.getElementById("createName").value.trim();
    const height = document.getElementById("createHeight").value.trim();
    const weight = document.getElementById("createWeight").value.trim();
    const code = document.getElementById("createCode").value.trim();
  
    if (!name || !height || !weight || !code) {
      alert("All fields are required.");
      return;
    }
    if (name.length > 30) {
      alert("Name must be max 30 characters.");
      return;
    }
  
    const xhr = getRequest();
    xhr.open("POST", "http://gamf.nhely.hu/ajax2/");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    xhr.onload = function () {
      document.getElementById("createFeedback").innerText =
        xhr.responseText.includes("1") ? "Record created successfully." : "Failed to create.";
    };
  
    const postData = `op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`;
    xhr.send(postData);
  }
  

  function getDataForId() {
    const code = document.getElementById("updateCode").value.trim();
    const id = document.getElementById("updateId").value.trim();
    if (!id || !code) return alert("Please enter both ID and code.");
  
    const xhr = getRequest();
    xhr.open("POST", "http://gamf.nhely.hu/ajax2/");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    xhr.onload = function () {
      const data = JSON.parse(xhr.responseText).list;
      const item = data.find((r) => r.id === id);
  
      if (item) {
        document.getElementById("updateName").value = item.name;
        document.getElementById("updateHeight").value = item.height;
        document.getElementById("updateWeight").value = item.weight;
      } else {
        alert("Record not found for this ID.");
      }
    };
  
    xhr.send(`op=read&code=${code}`);
  }
  
  function updateData() {
    const id = document.getElementById("updateId").value.trim();
    const name = document.getElementById("updateName").value.trim();
    const height = document.getElementById("updateHeight").value.trim();
    const weight = document.getElementById("updateWeight").value.trim();
    const code = document.getElementById("updateCode").value.trim();
  
    if (!id || !name || !height || !weight || !code) {
      alert("All fields are required.");
      return;
    }
    if (name.length > 30) {
      alert("Name must be max 30 characters.");
      return;
    }
  
    const xhr = getRequest();
    xhr.open("POST", "http://gamf.nhely.hu/ajax2/");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    xhr.onload = function () {
      document.getElementById("updateFeedback").innerText =
        xhr.responseText.includes("1") ? "Update successful." : "Update failed.";
    };
  
    xhr.send(`op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${code}`);
  }
  
  // DELETE
  function deleteData() {
    const id = document.getElementById("deleteId").value.trim();
    const code = document.getElementById("deleteCode").value.trim();
    if (!id || !code) return alert("Please enter both ID and code.");
  
    const xhr = getRequest();
    xhr.open("POST", "http://gamf.nhely.hu/ajax2/");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    xhr.onload = function () {
      document.getElementById("deleteFeedback").innerText =
        xhr.responseText.includes("1") ? "Delete successful." : "Delete failed.";
    };
  
    xhr.send(`op=delete&id=${id}&code=${code}`);
  }
  