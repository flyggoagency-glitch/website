import OfferClient from './OfferClient';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function generateStaticParams() {
  try {
    const querySnapshot = await getDocs(collection(db, 'offers'));
    return querySnapshot.docs.map((doc) => ({
      offerId: doc.id,
    }));
  } catch (error) {
    console.error("Error generating static params for offers:", error);
    return [];
  }
}

export default function OfferPage() {
  return <OfferClient />;
}
