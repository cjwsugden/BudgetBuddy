const incomeItemsArray = [];
const expenseItemArray = [];

function handleClick() {
  let itemType = document.getElementById("type").value;
  let itemTitle = document.getElementById("item-title").value;
  let itemDescription = document.getElementById("item-desc").value;
  let itemValue = parseFloat(document.getElementById("item-value").value);

  if (handleErrors(itemTitle, itemValue)) {
    const newItem = {
      title: itemTitle,
      description: itemDescription,
      value: itemType === "inc" ? itemValue : -itemValue,
    };

    if (itemType === "inc") {
      incomeItemsArray.push(newItem);
      //   console.log(incomeItemsArray);
    } else {
      expenseItemArray.push(newItem);
      //   console.log(expenseItemArray);
    }

    renderItems(incomeItemsArray, "income-table");
    renderItems(expenseItemArray, "expenses-table");

    document.getElementById("item-title").value = "";
    document.getElementById("item-desc").value = "";
    document.getElementById("item-value").value = "";

    localStorage.setItem("incomeItems", JSON.stringify(incomeItemsArray));
    localStorage.setItem("expenseItems", JSON.stringify(expenseItemArray));

    calculateNet();
  }
}

function handleErrors(title, value) {
  if (title && value) {
    document.getElementById("err1").style.color = "black";
    document.getElementById("err2").style.color = "black";
    return true;
  } else if (!title) {
    document.getElementById("err1").style.color = "#ff5049";
    return false;
  } else if (!value) {
    document.getElementById("err2").style.color = "#ff5049";
    return false;
  }
}

function calculateIncome() {
  let totalIncome = 0;
  incomeItemsArray.forEach((item) => {
    totalIncome += item.value;
  });
  //   console.log(totalIncome);
  return totalIncome;
}

function calculateExpenses() {
  let totalExpenses = 0;
  expenseItemArray.forEach((item) => {
    totalExpenses += item.value;
  });
  //   console.log(totalExpenses);
  return totalExpenses;
}

function calculateNet() {
  const totalIncome = calculateIncome();
  const totalExpenses = calculateExpenses();
  const net = totalIncome + totalExpenses;

  document.getElementById("net").textContent =
    net >= 0 ? "+ " + net.toFixed(2) : " " + net.toFixed(2);
  document.getElementById("income-num").textContent = "+ " + totalIncome;
  document.getElementById("expenses-num").textContent = " " + totalExpenses;
  renderItems(incomeItemsArray, "income-table");
  renderItems(expenseItemArray, "expenses-table");
  localStorage.setItem("incomeItems", JSON.stringify(incomeItemsArray));
  localStorage.setItem("expenseItems", JSON.stringify(expenseItemArray));
}

function renderItems(itemArray, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  itemArray.forEach((item, index) => {
    const newItem = document.createElement("div");
    newItem.className = "item";

    const itemLeft = document.createElement("div");
    itemLeft.className = "item-left";

    const itemTitle = document.createElement("div");
    itemTitle.className = "item-title";
    // console.log(item.title);
    itemTitle.textContent = item.title;

    const itemDescription = document.createElement("div");
    itemDescription.className = "item-desc";
    itemDescription.textContent = item.description;

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "delete-icon";

    deleteIcon.addEventListener("click", () => {
      itemArray.splice(index, 1);

      renderItems(incomeItemsArray, "income-table");
      renderItems(expenseItemArray, "expenses-table");
      calculateNet();
    });
    newItem.appendChild(deleteIcon);
    itemLeft.appendChild(itemTitle);
    itemLeft.appendChild(itemDescription);

    const itemRight = document.createElement("div");
    itemRight.className = "item-right";
    itemRight.textContent =
      item.value >= 0 ? "+ " + item.value : " " + item.value;

    newItem.appendChild(itemLeft);
    newItem.appendChild(itemRight);

    container.appendChild(newItem);
  });
}
