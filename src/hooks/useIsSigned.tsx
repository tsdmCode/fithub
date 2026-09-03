import { useRef } from 'react';
import { useFetch } from './useFetch';
import { Booking } from '../types/types';

export function useIsSigned() {
  const [isSigned] = useRef(false);
  const { data } = useFetch<Booking[]>('http://localhost:3000/api/bookings');
  
  if ()

}
