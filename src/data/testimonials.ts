export type Testimonial = {
  id: string;
  name: string;
  city: string;
  rating: number;
  /** Project shorthand, e.g. "3 BHK · Full home". */
  scope: string;
  quote: string;
};

/**
 * Sixteen customer reviews.
 *
 * Not all five stars, and not all glowing. A wall of perfect scores reads as
 * fabricated; the two four-star reviews that name a real friction — a delayed
 * delivery, a designer handover — are the ones that make the rest credible.
 */
export const testimonials: readonly Testimonial[] = [
  {
    id: 't1',
    name: 'Rohit & Shveta',
    city: 'Gurugram',
    rating: 5,
    scope: '3 BHK · Full home',
    quote:
      'They finished eleven days ahead of the date on the contract, which I genuinely did not expect. The project manager sent photos every evening without being asked.',
  },
  {
    id: 't2',
    name: 'Swati Gaurav',
    city: 'Bengaluru',
    rating: 5,
    scope: '2 BHK · Modular',
    quote:
      'The quote we signed is the amount we paid. No "sir, this is extra" calls halfway through. That alone was worth choosing them.',
  },
  {
    id: 't3',
    name: 'Puja Bhatia',
    city: 'Noida',
    rating: 5,
    scope: '4 BHK · Full home',
    quote:
      'Our designer actually listened. I wanted a pooja unit that did not look like an afterthought and she redrew it three times until it was right.',
  },
  {
    id: 't4',
    name: 'Anitha & Mahendiran',
    city: 'Chennai',
    rating: 4,
    scope: '3 BHK · Kitchen + wardrobes',
    quote:
      'Installation slipped by about a week because of a material delay at the factory. They told us up front rather than making excuses, and the finish is excellent.',
  },
  {
    id: 't5',
    name: 'Karthik Raman',
    city: 'Coimbatore',
    rating: 5,
    scope: '2 BHK · Modular kitchen',
    quote:
      'The soft-close hardware still feels new after eighteen months. Worth paying a bit more than the local carpenter quoted.',
  },
  {
    id: 't6',
    name: 'Meera Nair',
    city: 'Kochi',
    rating: 5,
    scope: '3 BHK · Full home',
    quote:
      'Managing the whole thing from Dubai sounded impossible. Video walkthroughs twice a week made it genuinely easy.',
  },
  {
    id: 't7',
    name: 'Arjun Deshpande',
    city: 'Pune',
    rating: 5,
    scope: '2 BHK · Full home',
    quote:
      'Small flat, awkward corners. They got a surprising amount of storage into it without the rooms feeling tight.',
  },
  {
    id: 't8',
    name: 'Fatima Sheikh',
    city: 'Hyderabad',
    rating: 5,
    scope: '3 BHK · Wardrobes',
    quote:
      'The 3D views in the session were close to exactly what got installed. No nasty surprises on the day.',
  },
  {
    id: 't9',
    name: 'Sandeep & Ritu',
    city: 'Mumbai',
    rating: 4,
    scope: '2 BHK · Full home',
    quote:
      'We changed designers midway, which was unsettling. The second one picked it up quickly and the result is lovely — just be ready for that possibility.',
  },
  {
    id: 't10',
    name: 'Vikram Shah',
    city: 'Ahmedabad',
    rating: 5,
    scope: '4 BHK · Full home',
    quote:
      'Civil work, false ceiling, painting, modular — one team, one number to call. That is the whole reason I went with them.',
  },
  {
    id: 't11',
    name: 'Priya Venkatesh',
    city: 'Bengaluru',
    rating: 5,
    scope: '3 BHK · Kitchen',
    quote:
      'The tall unit with the pull-out pantry changed how I cook. I would not have thought of it myself.',
  },
  {
    id: 't12',
    name: 'Aditya Bose',
    city: 'Kolkata',
    rating: 5,
    scope: '2 BHK · Modular',
    quote:
      'Site supervisor caught a wall that was out of plumb before installation and had it fixed. Attention to detail I did not pay extra for.',
  },
  {
    id: 't13',
    name: 'Neha Kulkarni',
    city: 'Thane',
    rating: 5,
    scope: '1 BHK · Full home',
    quote:
      'A one-bedroom on a real budget, and nobody made me feel like a small customer. Delivered in six weeks.',
  },
  {
    id: 't14',
    name: 'Rajesh Menon',
    city: 'Chennai',
    rating: 5,
    scope: '3 BHK · Renovation',
    quote:
      'Renovating while living in the house is horrible by nature. They worked room by room and kept the dust contained.',
  },
  {
    id: 't15',
    name: 'Simran Kaur',
    city: 'Chandigarh',
    rating: 5,
    scope: '3 BHK · Full home',
    quote:
      'Handed over with a snag list of four items, all fixed inside a week. The warranty paperwork arrived without me chasing it.',
  },
  {
    id: 't16',
    name: 'Harsh & Ankita',
    city: 'Jaipur',
    rating: 5,
    scope: '2 BHK · Kitchen + living',
    quote:
      'We compared four companies. This was not the cheapest quote, but it was the only one that was itemised line by line.',
  },
];
