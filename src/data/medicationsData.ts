
export interface Medication {
  id: number;
  name: string;
  nameAr: string;
  category: string;
  description: string;
  descriptionAr: string;
  dosage: string;
  price: number;
  availability: boolean;
  imageUrl: string;
  requiresPrescription: boolean;
}

export const medications: Medication[] = [
  {
    id: 1,
    name: "Paracetamol",
    nameAr: "باراسيتامول",
    category: "Pain Relief",
    description: "Used for fever and mild to moderate pain",
    descriptionAr: "يستخدم لخفض الحرارة وتخفيف الآلام الخفيفة إلى المتوسطة",
    dosage: "500mg",
    price: 5.99,
    availability: true,
    imageUrl: "https://placehold.co/300x200/4CAF50/FFFFFF?text=Paracetamol",
    requiresPrescription: false
  },
  {
    id: 2,
    name: "Amoxicillin",
    nameAr: "أموكسيسيلين",
    category: "Antibiotics",
    description: "Used to treat a number of bacterial infections",
    descriptionAr: "يستخدم لعلاج عدد من الالتهابات البكتيرية",
    dosage: "250mg",
    price: 12.50,
    availability: true,
    imageUrl: "https://placehold.co/300x200/2196F3/FFFFFF?text=Amoxicillin",
    requiresPrescription: true
  },
  {
    id: 3,
    name: "Omeprazole",
    nameAr: "أوميبرازول",
    category: "Digestive System",
    description: "Reduces the amount of acid produced in the stomach",
    descriptionAr: "يقلل من كمية الحمض المنتج في المعدة",
    dosage: "20mg",
    price: 8.75,
    availability: true,
    imageUrl: "https://placehold.co/300x200/FFC107/FFFFFF?text=Omeprazole",
    requiresPrescription: false
  },
  {
    id: 4,
    name: "Loratadine",
    nameAr: "لوراتادين",
    category: "Allergy",
    description: "Used to treat allergies such as hay fever and hives",
    descriptionAr: "يستخدم لعلاج الحساسية مثل حمى القش والشرى",
    dosage: "10mg",
    price: 7.25,
    availability: true,
    imageUrl: "https://placehold.co/300x200/9C27B0/FFFFFF?text=Loratadine",
    requiresPrescription: false
  },
  {
    id: 5,
    name: "Atorvastatin",
    nameAr: "أتورفاستاتين",
    category: "Cardiovascular",
    description: "Used to prevent cardiovascular disease in high risk patients",
    descriptionAr: "يستخدم للوقاية من أمراض القلب والأوعية الدموية لدى المرضى المعرضين للخطر",
    dosage: "40mg",
    price: 18.99,
    availability: true,
    imageUrl: "https://placehold.co/300x200/E91E63/FFFFFF?text=Atorvastatin",
    requiresPrescription: true
  },
  {
    id: 6,
    name: "Salbutamol",
    nameAr: "سالبوتامول",
    category: "Respiratory",
    description: "Used to treat asthma and COPD",
    descriptionAr: "يستخدم لعلاج الربو ومرض الانسداد الرئوي المزمن",
    dosage: "100mcg",
    price: 15.50,
    availability: true,
    imageUrl: "https://placehold.co/300x200/3F51B5/FFFFFF?text=Salbutamol",
    requiresPrescription: true
  },
  {
    id: 7,
    name: "Metformin",
    nameAr: "ميتفورمين",
    category: "Diabetes",
    description: "Used to treat type 2 diabetes",
    descriptionAr: "يستخدم لعلاج داء السكري من النوع 2",
    dosage: "500mg",
    price: 9.99,
    availability: true,
    imageUrl: "https://placehold.co/300x200/00BCD4/FFFFFF?text=Metformin",
    requiresPrescription: true
  },
  {
    id: 8,
    name: "Ibuprofen",
    nameAr: "إيبوبروفين",
    category: "Anti-inflammatory",
    description: "Used to treat pain, fever, and inflammation",
    descriptionAr: "يستخدم لعلاج الألم والحمى والالتهاب",
    dosage: "400mg",
    price: 6.25,
    availability: true,
    imageUrl: "https://placehold.co/300x200/FF5722/FFFFFF?text=Ibuprofen",
    requiresPrescription: false
  }
];

// Medication categories
export const medicationCategories = [
  "Pain Relief",
  "Antibiotics",
  "Digestive System",
  "Allergy",
  "Cardiovascular",
  "Respiratory",
  "Diabetes",
  "Anti-inflammatory"
];
