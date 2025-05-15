
export interface OnlineDoctor {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  availableFor: ("video" | "phone")[];
  rating: number;
  price: number;
}

export const onlineDoctors: OnlineDoctor[] = [
  {
    id: 1,
    name: "د. محمد الحسن",
    specialty: "طب أطفال",
    imageUrl: "/placeholder.svg",
    availableFor: ["video", "phone"],
    rating: 4.9,
    price: 50
  },
  {
    id: 2,
    name: "د. سارة العلي",
    specialty: "أمراض نساء وتوليد",
    imageUrl: "/placeholder.svg",
    availableFor: ["video"],
    rating: 4.8,
    price: 65
  },
  {
    id: 3,
    name: "د. أحمد العميري",
    specialty: "طب باطني",
    imageUrl: "/placeholder.svg",
    availableFor: ["phone"],
    rating: 4.7,
    price: 45
  },
  {
    id: 4,
    name: "د. فاطمة الزهراء",
    specialty: "جلدية",
    imageUrl: "/placeholder.svg",
    availableFor: ["video", "phone"],
    rating: 4.9,
    price: 70
  }
];
