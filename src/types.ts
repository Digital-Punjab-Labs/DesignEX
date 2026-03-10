export interface UnitType {
  id: string;
  bhk: string;
  price: number;
  sqft: number;
  beds: number;
  baths: number;
  image: string;
  virtualTourImage: string;
  description: string;
  amenities: string[];
}

export interface Development {
  id: string;
  name: string;
  developer: string;
  location: string;
  city: string;
  mainImage: string;
  description: string;
  amenities: string[];
  status: 'Under Construction' | 'Ready to Move' | 'Newly Launched';
  units: UnitType[];
}

export const DEVELOPMENTS: Development[] = [
  {
    id: 'd1',
    name: 'CM Infinia',
    developer: 'CM Luxury Homes',
    location: 'CM Valley, Enclave, Jainpur',
    city: 'Ludhiana',
    mainImage: 'https://housing-images.n7net.in/012c1500/87992a8c183697b685ae93f7b6bfe883/v0/fs.jpeg',
    description: 'Khoti Sa Bada ghar',
    amenities: ['Olympic-size Pool', 'Club House', 'Pet Park', 'Organic Garden', '24/7 Concierge'],
    status: 'Ready to Move',
    units: [
      // {
      //   id: 'u1-4bhk',
      //   bhk: '4 BHK',
      //   price: 250000000,
      //   sqft: 7400,
      //   beds: 4,
      //   baths: 5,
      //   image: 'https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=1200',
      //   virtualTourImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000',
      //   description: 'Ultra-luxury 4BHK apartment with expansive balconies and world-class finishes.',
      //   amenities: ['Private Elevator', 'Smart Home', 'Golf View', 'Concierge']
      // },
      {
        id: 'u1-5bhk',
        bhk: '5 BHK',
        price: 350000000,
        sqft: 9500,
        beds: 5,
        baths: 6,
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200',
        virtualTourImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000',
        description: 'The pinnacle of luxury living. A sprawling 5BHK penthouse with panoramic views.',
        amenities: ['Private Pool', 'Club House', 'Chef Kitchen', 'Wine Cellar']
      }
    ]
  },
  {
    id: 'd2',
    name: 'World One',
    developer: 'Lodha Group',
    location: 'Lower Parel',
    city: 'Chandigarh',
    mainImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200',
    description: 'World One is a residential skyscraper in Mumbai. It is located in Lower Parel and stands at 280.2 meters.',
    amenities: ['Armani/Casa Interiors', 'Sky Lounge', 'Observatory Deck', 'World-class Spa', 'Private Jets'],
    status: 'Ready to Move',
    units: [
      {
        id: 'u2-3bhk',
        bhk: '3 BHK',
        price: 85000000,
        sqft: 2100,
        beds: 3,
        baths: 3,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200',
        virtualTourImage: 'https://images.unsplash.com/photo-1536376074432-cd4258ae71dd?auto=format&fit=crop&q=80&w=2000',
        description: 'Elegant 3BHK residence with interiors by Armani/Casa.',
        amenities: ['Sea View', 'Gym', 'Spa', 'Clubhouse']
      },
      {
        id: 'u2-4bhk',
        bhk: '4 BHK',
        price: 125000000,
        sqft: 3200,
        beds: 4,
        baths: 4,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
        virtualTourImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000',
        description: 'Spacious 4BHK with wrap-around decks and stunning city views.',
        amenities: ['Private Deck', 'Home Automation', 'Infinity Pool', 'Library']
      }
    ]
  },
  {
    id: 'd3',
    name: 'Godrej Meridien',
    developer: 'Godrej Properties',
    location: 'Sector 106',
    city: 'Mohali',
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    description: 'Godrej Meridien is a place of plush residences, that offers some of the finest amenities in the NCR region.',
    amenities: ['66,000 sqft Clubhouse', 'Olympic-size Pool', 'Fine Dining', 'Wine Tasting Room', 'Mini Theater'],
    status: 'Under Construction',
    units: [
      {
        id: 'u3-2bhk',
        bhk: '2 BHK',
        price: 18000000,
        sqft: 1400,
        beds: 2,
        baths: 2,
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1200',
        virtualTourImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=2000',
        description: 'Modern 2BHK apartment designed for urban professionals.',
        amenities: ['Clubhouse', 'Swimming Pool', 'Jogging Track', 'Security']
      },
      {
        id: 'u3-3bhk',
        bhk: '3 BHK',
        price: 25000000,
        sqft: 1850,
        beds: 3,
        baths: 3,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
        virtualTourImage: 'https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=2000',
        description: 'Comfortable 3BHK family home with premium fittings.',
        amenities: ['Park View', 'Kids Play Area', 'Gym', 'Power Backup']
      }
    ]
  },
  {
    id: 'd4',
    name: 'Prestige Kingfisher Towers',
    developer: 'Prestige Group',
    location: 'Lavelle Road',
    city: 'Mohali',
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    description: 'Prestige Kingfisher Towers is one of the most premium residential developments in Bengaluru.',
    amenities: ['Private Lobby', 'Billiards Room', 'Tennis Court', 'Badminton Court', 'Health Club'],
    status: 'Ready to Move',
    units: [
      {
        id: 'u4-4bhk',
        bhk: '4 BHK',
        price: 300000000,
        sqft: 8300,
        beds: 4,
        baths: 5,
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200',
        virtualTourImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000',
        description: 'Exclusive 4BHK residence occupying an entire floor.',
        amenities: ['Private Lobby', 'City View', 'Billiards Room', 'Tennis Court']
      }
    ]
  }
];
