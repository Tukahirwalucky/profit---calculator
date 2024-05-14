let dayCount = 1;
let dailyProfits = {};
let loggedIn = false;

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  document.getElementById("loginOverlay").style.display = "none";
  document.getElementById("calculatorOverlay").style.display = "flex";
  loggedIn = true;
}

function loginWithGoogle() {
  alert("Google login functionality coming soon!");
}

function loginWithFacebook() {
  alert("Facebook login functionality coming soon!");
}

function addDay() {
  const daysDiv = document.getElementById("days");
  const dayDiv = document.createElement("div");
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  dayDiv.innerHTML = `
    <table>
        <tr>
            <th>Day</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Buying Price (UGX)</th>
            <th>Selling Price (UGX)</th>
            <th>Profit/Loss (UGX)</th>
            <th>Action</th>
        </tr>
        <tr id="day${dayCount}">
            <td>${daysOfWeek[(dayCount - 1) % 7]}</td>
            <td><input type="text" class="productName" id="day${dayCount}_productName_1"></td>
            <td><input type="text" class="productDescription" id="day${dayCount}_productDescription_1"></td>
            <td><input type="number" class="buyingPrice" id="day${dayCount}_buyingPrice_1" onchange="calculateProfitLoss(${dayCount}, 1)"></td>
            <td><input type="number" class="sellingPrice" id="day${dayCount}_sellingPrice_1" onchange="calculateProfitLoss(${dayCount}, 1)"></td>
            <td class="profitLoss" id="day${dayCount}_profitLoss_1">0</td>
            <td><button class="btn-add-product" onclick="addProduct(${dayCount})">Add Product</button></td>
        </tr>
        <tr id="totalProfitRow${dayCount}">
            <td colspan="5"></td>
            <td>Total Profit:</td>
            <td id="totalProfitCell${dayCount}">0</td>
        </tr>
    </table>
    `;

  daysDiv.appendChild(dayDiv);
  dailyProfits[`day${dayCount}`] = 0;
  dayCount++;
}

function addProduct(dayId) {
  const dayRow = document.getElementById(`day${dayId}`);
  const productCount = dayRow.parentNode.getElementsByTagName("tr").length - 1;

  const newRow = document.createElement("tr");
  newRow.setAttribute("id", `day${dayId}_product${productCount}`);

  newRow.innerHTML = `
    <td></td>
    <td><input type="text" class="productName" id="day${dayId}_productName_${productCount}"></td>
    <td><input type="text" class="productDescription" id="day${dayId}_productDescription_${productCount}"></td>
    <td><input type="number" class="buyingPrice" id="day${dayId}_buyingPrice_${productCount}" onchange="calculateProfitLoss(${dayId}, ${productCount})"></td>
    <td><input type="number" class="sellingPrice" id="day${dayId}_sellingPrice_${productCount}" onchange="calculateProfitLoss(${dayId}, ${productCount})"></td>
    <td class="profitLoss" id="day${dayId}_profitLoss_${productCount}">0</td>
    <td>
        <button class="btn-add-product" onclick="addProduct(${dayId})">Add Product</button>
        <button class="btn-delete-product" onclick="deleteProduct(${dayId}, ${productCount})">Delete Product</button>
    </td>
    `;

  dayRow.parentNode.insertBefore(newRow, dayRow.nextSibling);
}

function calculateProfitLoss(dayId, productId) {
  const buyingPriceUGX = parseFloat(
    document.getElementById(`day${dayId}_buyingPrice_${productId}`).value
  );
  const sellingPriceUGX = parseFloat(
    document.getElementById(`day${dayId}_sellingPrice_${productId}`).value
  );

  const profitUGX = sellingPriceUGX - buyingPriceUGX;

  const profitLossElement = document.getElementById(
    `day${dayId}_profitLoss_${productId}`
  );
  if (!isNaN(profitUGX)) {
    profitLossElement.textContent = `${profitUGX.toFixed(2)}`;
    profitLossElement.style.color = profitUGX >= 0 ? "green" : "red";
    dailyProfits[`day${dayId}`] = calculateTotalProfitForDay(dayId);
    updateTotalProfit(dayId);
  } else {
    profitLossElement.textContent = "Invalid input";
    profitLossElement.style.color = "black";
  }
}

function calculateTotalProfitForDay(dayId) {
  const dayRow = document.getElementById(`day${dayId}`);
  const productCount = dayRow.parentNode.getElementsByTagName("tr").length - 2;

  let totalProfitForDay = 0;
  for (let i = 1; i <= productCount; i++) {
    const profitUGX = parseFloat(
      document.getElementById(`day${dayId}_profitLoss_${i}`).textContent
    );
    totalProfitForDay += profitUGX;
  }
  return totalProfitForDay;
}

function updateTotalProfit(dayId) {
  const totalProfitCell = document.getElementById(`totalProfitCell${dayId}`);
  totalProfitCell.textContent = `${dailyProfits[`day${dayId}`].toFixed(2)}`;
}

function saveData() {
  alert("Data saved successfully!");
}

function deleteProduct(dayId, productId) {
  const productRow = document.getElementById(`day${dayId}_product${productId}`);
  productRow.parentNode.removeChild(productRow);
  calculateProfitLoss(dayId, productId);
}
