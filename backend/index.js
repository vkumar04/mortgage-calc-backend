const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const uri =
  "mongodb+srv://vick:K8j9N0S9ZE8YEhEz@cluster0.n9bozrb.mongodb.net/?retryWrites=true&w=majority"; //db uri
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas", err);
  }
}

connectToDatabase();

// Mortgage calculation function
function calculateMortgage(principal, interestRate, loanTerm) {
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment =
    (principal *
      (monthlyInterestRate * (1 + monthlyInterestRate) ** numberOfPayments)) /
    ((1 + monthlyInterestRate) ** numberOfPayments - 1);
  return monthlyPayment.toFixed(2);
}

// Generate amortization table function
function generateAmortizationTable(principal, interestRate, loanTerm) {
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = calculateMortgage(principal, interestRate, loanTerm);

  const amortizationTable = [];

  let remainingBalance = principal;

  for (let month = 1; month <= numberOfPayments; month++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;

    amortizationTable.push({
      month,
      principalPayment: principalPayment.toFixed(2),
      interestPayment: interestPayment.toFixed(2),
      remainingBalance: remainingBalance.toFixed(2),
    });

    remainingBalance -= principalPayment;
  }

  return amortizationTable;
}

// API endpoint to calculate mortgage and save data to MongoDB Atlas
app.post("/calculate-mortgage", async (req, res) => {
  const { principal, interestRate, loanTerm } = req.body;

  if (!principal || !interestRate || !loanTerm) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const monthlyPayment = calculateMortgage(principal, interestRate, loanTerm);
  const amortizationTable = generateAmortizationTable(
    principal,
    interestRate,
    loanTerm
  );

  // Save user input and calculation data to MongoDB Atlas
  const db = client.db("mortgage-calc"); // Replace with your database name
  const collection = db.collection("input-data"); // Replace with your collection name

  try {
    await collection.insertOne({
      principal,
      interestRate,
      loanTerm,
      monthlyPayment,
      amortizationTable,
      timestamp: new Date(),
    });

    res.json({ monthlyPayment, amortizationTable });
  } catch (err) {
    console.error("Error saving data to MongoDB Atlas", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
