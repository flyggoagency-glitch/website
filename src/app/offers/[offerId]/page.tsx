import type { Metadata } from 'next';
import OfferClient from './OfferClient';
import { collection, getDocs } from 'firebase/firestore/lite';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ offerId: string }>;
}): Promise<Metadata> {
  const { offerId } = await params;
  return {
    title: `Special Offer`,
    alternates: {
      canonical: `https://flyggo.com/offers/${offerId}`,
    },
  };
}

export default function OfferPage() {
  return <OfferClient />;
}
