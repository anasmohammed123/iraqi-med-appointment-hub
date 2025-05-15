
export const onlineDoctorsData = [
  {
    id: 1,
    name: "د. محمد عبدالله",
    specialty: "طب عام",
    imageUrl: "https://placehold.co/400x400/3b82f6/ffffff?text=د.+محمد",
    availableFor: ["video", "phone"],
    rating: 4.8,
    price: 25
  },
  {
    id: 2,
    name: "د. سارة أحمد",
    specialty: "أمراض نساء",
    imageUrl: "https://placehold.co/400x400/3b82f6/ffffff?text=د.+سارة",
    availableFor: ["video"],
    rating: 4.9,
    price: 35
  },
  {
    id: 3,
    name: "د. علي محمود",
    specialty: "أطفال",
    imageUrl: "https://placehold.co/400x400/3b82f6/ffffff?text=د.+علي",
    availableFor: ["phone", "video"],
    rating: 4.7,
    price: 30
  },
  {
    id: 4,
    name: "د. فاطمة حسين",
    specialty: "جلدية",
    imageUrl: "https://placehold.co/400x400/3b82f6/ffffff?text=د.+فاطمة",
    availableFor: ["phone"],
    rating: 4.6,
    price: 40
  },
  {
    id: 5,
    name: "د. خالد العلي",
    specialty: "نفسية",
    imageUrl: "https://placehold.co/400x400/3b82f6/ffffff?text=د.+خالد",
    availableFor: ["video", "phone"],
    rating: 4.9,
    price: 45
  },
  {
    id: 6,
    name: "د. نور الهدى",
    specialty: "عيون",
    imageUrl: "https://placehold.co/400x400/3b82f6/ffffff?text=د.+نور",
    availableFor: ["video"],
    rating: 4.7,
    price: 35
  },
  {
    id: 7,
    name: "د. عمر محمد",
    specialty: "قلب",
    imageUrl: "https://placehold.co/400x400/3b82f6/ffffff?text=د.+عمر",
    availableFor: ["video", "phone"],
    rating: 4.8,
    price: 50
  },
  {
    id: 8,
    name: "د. زينب كريم",
    specialty: "باطنية",
    imageUrl: "https://placehold.co/400x400/3b82f6/ffffff?text=د.+زينب",
    availableFor: ["phone"],
    rating: 4.6,
    price: 30
  },
  {
    id: 9,
    name: "د. أحمد علي",
    specialty: "عظام",
    imageUrl: "https://placehold.co/400x400/3b82f6/ffffff?text=د.+أحمد",
    availableFor: ["video", "phone"],
    rating: 4.7,
    price: 40
  },
  {
    id: 10,
    name: "د. ليلى عباس",
    specialty: "أسنان",
    imageUrl: "https://placehold.co/400x400/3b82f6/ffffff?text=د.+ليلى",
    availableFor: ["video"],
    rating: 4.9,
    price: 45
  }
];

export type OnlineDoctor = typeof onlineDoctorsData[0];
