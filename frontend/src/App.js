import LoanPredictor from "./LoanPredictor";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <LoanPredictor />
      <Analytics />
    </>
  );
}

export default App;