import { useRef } from 'react';
import { useFetch } from './useFetch';
import { Booking } from '../types/types';
//todo: idk lol kan nok slette
export function useIsSigned() {
  const [isSigned] = useRef(false);
  const { data } = useFetch<Booking[]>('http://localhost:3000/api/bookings');
  
  return isSigned;
}
