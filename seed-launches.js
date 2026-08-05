import { db } from "./src/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";

const defaultCompanies = [
  "AANOOR GLOBAL EXPORTS",
  "THEBARBACK",
  "ACADAMKEY",
  "JAIROENTERPRESISE",
  "DERMAGLOW",
  "CADSPIRA",
  "IMS SOLAR",
  "REATILTALENT",
  "COCO CRAFT EXPORTS"
];

async function seedLaunches() {
  const launchesRef = collection(db, 'launches');
  const snap = await getDocs(launchesRef);
  
  if (snap.empty) {
    console.log("No launches found. Seeding default data...");
    for (const name of defaultCompanies) {
      await addDoc(launchesRef, {
        name,
        createdAt: serverTimestamp()
      });
      console.log(`Added ${name}`);
    }
    console.log("Seeding complete!");
  } else {
    console.log("Launches already exist. Skipping seed.");
  }
}

seedLaunches().catch(console.error);
