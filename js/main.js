let tableData = [];

const form = document.getElementById('crudForm');
const tableBody = document.querySelector('#dataTable tbody');
const searchInput = document.getElementById('searchInput');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const age = document.getElementById('age').value;
  const email = document.getElementById('email').value.trim();
  const city = document.getElementById('city').value.trim();

  if (!name || !age || !email || !city) {
    alert('All fields must be filled out.');
    return;
  }

  const newData = { name, age, email, city };
  tableData.push(newData);
  renderTable();
  form.reset();
});

function renderTable() {
  tableBody.innerHTML = '';
  const filter = searchInput.value.toLowerCase();

  tableData
    .filter(item =>
      Object.values(item).some(value => value.toLowerCase().includes(filter))
    )
    .forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.email}</td>
        <td>${item.city}</td>
        <td>
          <button onclick="editRow(${index})">Edit</button>
          <button onclick="deleteRow(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
}

function deleteRow(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    tableData.splice(index, 1);
    renderTable();
  }
}

function editRow(index) {
  const item = tableData[index];
  document.getElementById('name').value = item.name;
  document.getElementById('age').value = item.age;
  document.getElementById('email').value = item.email;
  document.getElementById('city').value = item.city;

  tableData.splice(index, 1); // remove old entry so update acts like "edit"
  renderTable();
}

searchInput.addEventListener('input', renderTable);

function sortTable(colIndex) {
  tableData.sort((a, b) => {
    const aVal = Object.values(a)[colIndex].toLowerCase();
    const bVal = Object.values(b)[colIndex].toLowerCase();
    return aVal.localeCompare(bVal);
  });
  renderTable();
}
