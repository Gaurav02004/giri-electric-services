export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  iconName: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  serviceUsed: string;
  verified: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  address: string;
  status: 'Pending' | 'Confirmed' | 'Technician Assigned' | 'In Progress' | 'Completed';
  technicianName?: string;
  technicianPhone?: string;
  technicianRating?: number;
  etaMinutes?: number;
}

export interface TechnicianLocation {
  x: number; // percentage coordinate 0-100 on mock map
  y: number;
  name: string;
  phone: string;
  eta: number;
  status: string;
}
