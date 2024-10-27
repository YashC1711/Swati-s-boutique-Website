document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("billDate").value = today; // Set default date
});

document
  .getElementById("billingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    generateBill();
  });

function addItem() {
  const container = document.getElementById("itemContainer");
  const itemRow = document.createElement("div");
  itemRow.classList.add("itemRow");

  itemRow.innerHTML = `
          <input type="text" placeholder="Item Name" class="itemName" required>
          <input type="number" placeholder="Quantity" class="itemQuantity" required min="1" step="1">
          <input type="number" placeholder="Price" class="itemPrice" required min="0" step="0.01">
      `;
  container.appendChild(itemRow);
}

function generateBill() {
  const customerName = document.getElementById("customerName").value;
  const billDate = document.getElementById("billDate").value;
  const itemNames = document.querySelectorAll(".itemName");
  const itemQuantities = document.querySelectorAll(".itemQuantity");
  const itemPrices = document.querySelectorAll(".itemPrice");
  let total = 0;
  let itemsList = "";

  itemNames.forEach((item, index) => {
    const quantity = parseInt(itemQuantities[index].value);
    const price = parseFloat(itemPrices[index].value);
    const amount = quantity * price;
    total += amount;
    itemsList += `<tr><td style="text-align: center;">${index + 1}</td><td>${
      item.value
    }</td><td style="text-align: center;">${quantity}</td><td style="text-align: right;">Rs. ${price.toFixed(
      2
    )}</td><td style="text-align: right;">Rs. ${amount.toFixed(2)}</td></tr>`;
  });

  const billContent = `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #333; max-width: 700px; margin: auto;">
              <h2 style="text-align: center; color: #333;">SWATI'S BOUTIQUE</h2>
              <p style="text-align: center; color: #777; font-size: 14px;">Diamond Vishal Paradise, A-202, near Iskon Temple, Ravet</p>
              <hr style="border-top: 2px solid #333; margin-top: 10px; margin-bottom: 20px;">
  
              <div style="margin-bottom: 20px;">
                  <p><strong>Customer Name:</strong> ${customerName}</p>
                  <p><strong>Date:</strong> ${billDate}</p>
              </div>
  
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                  <thead style="background-color: #0073e6; color: white;">
                      <tr>
                          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">SI No.</th>
                          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description of Goods</th>
                          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Quantity</th>
                          <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Rate (Rs.)</th>
                          <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Amount (Rs.)</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${itemsList}
                  </tbody>
                  <tfoot>
                      <tr>
                          <td colspan="4" style="text-align: right; padding: 8px; font-weight: bold;">Total (Rs.):</td>
                          <td style="text-align: right; padding: 8px; font-weight: bold;">Rs. ${total.toFixed(
                            2
                          )}</td>
                      </tr>
                  </tfoot>
              </table>
  
              <p style="text-align: center; margin-top: 20px;">Thank you for your purchase!</p>
          </div>
      `;

  const element = document.createElement("div");
  element.innerHTML = billContent;

  const options = {
    margin: 1,
    filename: `${customerName}_${billDate}.pdf`,
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().from(element).set(options).save();
}
