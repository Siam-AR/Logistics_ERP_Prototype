import FinanceLedger from "@/components/finance/FinanceLedger";
import { mockEntries } from "@/components/finance/mock-data";

// Later: fetch entries from MongoDB here (server component) and pass them down.
export default function FinancePage() {
    return <FinanceLedger initialEntries={mockEntries} />;
}
