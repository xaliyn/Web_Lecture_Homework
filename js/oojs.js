class Saving {
  constructor(amount, description) {
    this.amount = parseFloat(amount);
    this.description = description;
    this.date = new Date().toLocaleDateString();
  }

  describe() {
    return ` ${this.description}: ${this.amount} Ft on ${this.date}`;
  }

  render() {
    const p = document.createElement("p");
    p.textContent = this.describe();
    document.body.appendChild(p);
  }
}

class SpecialSaving extends Saving {
  constructor(amount, description, source) {
    super(amount, description);
    this.source = source;
  }

  describe() {
    return ` ${this.description}: ${this.amount} Ft on ${this.date} (Source: ${this.source})`;
  }
}

function addSaving() {
  const amount = prompt("Enter amount:");
  const description = prompt("Enter description:");
  const source = prompt("Enter source (tip, gift, salary):");

  if (!amount || !description || !source) {
    alert("All fields are required.");
    return;
  }

  const saving = new SpecialSaving(amount, description, source);
  saving.render();
}
