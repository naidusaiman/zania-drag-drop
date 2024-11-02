// src/mocks/browser.js
import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

// Mock data
let cardsData = [
  { type: "bank-draft", title: "Bank Draft", position: 0 },
  { type: "bill-of-lading", title: "Bill of Lading", position: 1 },
  { type: "invoice", title: "Invoice", position: 2 },
  { type: "bank-draft-2", title: "Bank Draft 2", position: 3 },
  { type: "bill-of-lading-2", title: "Bill of Lading 2", position: 4 },
];

// Setup the worker with http handlers
const worker = setupWorker(
  http.get("/api/cards", () => {
    return HttpResponse.json(cardsData);
  }),
  http.post("/api/cards", (req) => {
    const newCard = req.body;
    cardsData.push(newCard);
    return HttpResponse.json(newCard, { status: 201 });
  })
);

// Export the worker for use in your app
export { worker };
