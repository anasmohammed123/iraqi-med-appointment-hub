
// Types
export interface Doctor {
  id: string;
  name: string;
  nameAr: string;
  specialty: string;
  specialtyAr: string;
  city: string;
  cityAr: string;
  hospital: string;
  hospitalAr: string;
  address: string;
  addressAr: string;
  phone: string;
  email: string;
  bio: string;
  bioAr: string;
  experience: number;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
  availableDays: string[];
  education: Education[];
  languages: string[];
  consultationTypes?: ("video" | "phone" | "home")[];  // Added consultation types
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
}

export interface Specialty {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  count: number;
}

export interface City {
  id: string;
  name: string;
  nameAr: string;
  count: number;
}

// Mock Data
export const specialties: Specialty[] = [
  { id: "1", name: "Cardiology", nameAr: "أمراض القلب", icon: "heart", count: 24 },
  { id: "2", name: "Dermatology", nameAr: "الأمراض الجلدية", icon: "stethoscope", count: 18 },
  { id: "3", name: "Orthopedics", nameAr: "جراحة العظام", icon: "bone", count: 16 },
  { id: "4", name: "Pediatrics", nameAr: "طب الأطفال", icon: "baby", count: 28 },
  { id: "5", name: "Neurology", nameAr: "طب الأعصاب", icon: "brain", count: 14 },
  { id: "6", name: "Ophthalmology", nameAr: "طب العيون", icon: "eye", count: 12 },
  { id: "7", name: "Dentistry", nameAr: "طب الأسنان", icon: "tooth", count: 22 },
  { id: "8", name: "Gynecology", nameAr: "أمراض النساء", icon: "female", count: 20 },
];

export const iraqiCities: City[] = [
  { id: "1", name: "Baghdad", nameAr: "بغداد", count: 86 },
  { id: "2", name: "Basra", nameAr: "البصرة", count: 42 },
  { id: "3", name: "Mosul", nameAr: "الموصل", count: 38 },
  { id: "4", name: "Erbil", nameAr: "أربيل", count: 45 },
  { id: "5", name: "Najaf", nameAr: "النجف", count: 29 },
  { id: "6", name: "Karbala", nameAr: "كربلاء", count: 31 },
  { id: "7", name: "Sulaymaniyah", nameAr: "السليمانية", count: 36 },
  { id: "8", name: "Kirkuk", nameAr: "كركوك", count: 27 },
];

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Ali Al-Safi",
    nameAr: "د. علي الصافي",
    specialty: "Cardiology",
    specialtyAr: "أمراض القلب",
    city: "Baghdad",
    cityAr: "بغداد",
    hospital: "Baghdad Medical City",
    hospitalAr: "مدينة بغداد الطبية",
    address: "Al-Andalus Square, Medical City Complex",
    addressAr: "ساحة الأندلس، مجمع مدينة الطب",
    phone: "+964 771 123 4567",
    email: "dr.ali@iraqimedhub.iq",
    bio: "Dr. Ali is a senior cardiologist with over 15 years of experience in treating various heart conditions. He specializes in interventional cardiology and cardiac imaging.",
    bioAr: "د. علي هو طبيب قلب متقدم مع أكثر من 15 عاما من الخبرة في علاج مختلف أمراض القلب. يتخصص في قسطرة القلب والتصوير القلبي.",
    experience: 15,
    rating: 4.8,
    reviewCount: 124,
    price: 50000, // IQD
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    availableDays: ["Sunday", "Tuesday", "Thursday"],
    education: [
      { degree: "MD", institution: "University of Baghdad", year: 2002 },
      { degree: "PhD in Cardiology", institution: "Imperial College London", year: 2007 }
    ],
    languages: ["Arabic", "English"],
    consultationTypes: ["video", "phone"]
  },
  {
    id: "2",
    name: "Dr. Sarah Mahmood",
    nameAr: "د. سارة محمود",
    specialty: "Pediatrics",
    specialtyAr: "طب الأطفال",
    city: "Baghdad",
    cityAr: "بغداد",
    hospital: "Children's Welfare Teaching Hospital",
    hospitalAr: "مستشفى رعاية الأطفال التعليمي",
    address: "Medical City, Baghdad",
    addressAr: "مدينة الطب، بغداد",
    phone: "+964 771 234 5678",
    email: "dr.sarah@iraqimedhub.iq",
    bio: "Dr. Sarah is a compassionate pediatrician with extensive experience in neonatal care and childhood diseases. She provides comprehensive healthcare for children from birth to adolescence.",
    bioAr: "د. سارة هي طبيبة أطفال حنونة ذات خبرة واسعة في رعاية حديثي الولادة وأمراض الطفولة. توفر رعاية صحية شاملة للأطفال من الولادة حتى سن المراهقة.",
    experience: 10,
    rating: 4.9,
    reviewCount: 158,
    price: 45000, // IQD
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    availableDays: ["Saturday", "Monday", "Wednesday"],
    education: [
      { degree: "MB ChB", institution: "Al-Mustansiriya University", year: 2010 },
      { degree: "Fellowship in Pediatrics", institution: "Royal College of Physicians, UK", year: 2015 }
    ],
    languages: ["Arabic", "English", "Kurdish"],
    consultationTypes: ["video", "phone", "home"]
  },
  {
    id: "3",
    name: "Dr. Mohammed Al-Janabi",
    nameAr: "د. محمد الجنابي",
    specialty: "Orthopedics",
    specialtyAr: "جراحة العظام",
    city: "Basra",
    cityAr: "البصرة",
    hospital: "Basra General Hospital",
    hospitalAr: "مستشفى البصرة العام",
    address: "Al-Ashar, Basra",
    addressAr: "العشار، البصرة",
    phone: "+964 770 345 6789",
    email: "dr.mohammed@iraqimedhub.iq",
    bio: "Dr. Mohammed is a skilled orthopedic surgeon specializing in joint replacement and sports injuries. He has performed over 1000 successful surgeries.",
    bioAr: "د. محمد هو جراح عظام ماهر متخصص في استبدال المفاصل وإصابات الرياضة. قام بإجراء أكثر من 1000 عملية جراحية ناجحة.",
    experience: 12,
    rating: 4.7,
    reviewCount: 112,
    price: 60000, // IQD
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    availableDays: ["Sunday", "Monday", "Thursday"],
    education: [
      { degree: "MB ChB", institution: "University of Basra", year: 2008 },
      { degree: "MS in Orthopedic Surgery", institution: "University of Jordan", year: 2013 }
    ],
    languages: ["Arabic", "English"],
    consultationTypes: ["home"]
  },
  {
    id: "4",
    name: "Dr. Noor Al-Hakim",
    nameAr: "د. نور الحكيم",
    specialty: "Dermatology",
    specialtyAr: "الأمراض الجلدية",
    city: "Erbil",
    cityAr: "أربيل",
    hospital: "Erbil Dermatology Center",
    hospitalAr: "مركز أربيل للأمراض الجلدية",
    address: "60m Street, Erbil",
    addressAr: "شارع الستين متر، أربيل",
    phone: "+964 750 456 7890",
    email: "dr.noor@iraqimedhub.iq",
    bio: "Dr. Noor is a renowned dermatologist with expertise in treating various skin conditions, cosmetic dermatology, and laser treatments.",
    bioAr: "د. نور هي طبيبة جلدية مشهورة ذات خبرة في علاج مختلف أمراض الجلد، طب الجلد التجميلي، وعلاجات الليزر.",
    experience: 8,
    rating: 4.6,
    reviewCount: 98,
    price: 55000, // IQD
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    availableDays: ["Saturday", "Tuesday", "Wednesday"],
    education: [
      { degree: "MD", institution: "Hawler Medical University", year: 2012 },
      { degree: "Diploma in Dermatology", institution: "American Academy of Dermatology", year: 2016 }
    ],
    languages: ["Arabic", "English", "Kurdish"],
    consultationTypes: ["video", "phone"]
  },
  {
    id: "5",
    name: "Dr. Hasan Al-Najafi",
    nameAr: "د. حسن النجفي",
    specialty: "Neurology",
    specialtyAr: "طب الأعصاب",
    city: "Najaf",
    cityAr: "النجف",
    hospital: "Al-Sadr Medical City",
    hospitalAr: "مدينة الصدر الطبية",
    address: "Kufa Road, Najaf",
    addressAr: "طريق الكوفة، النجف",
    phone: "+964 770 567 8901",
    email: "dr.hasan@iraqimedhub.iq",
    bio: "Dr. Hasan is a neurologist with special interest in treating headaches, epilepsy, and neurodegenerative disorders. He combines modern medicine with a patient-centered approach.",
    bioAr: "د. حسن هو طبيب أعصاب مهتم بشكل خاص بعلاج الصداع، الصرع، واضطرابات التنكس العصبي. يجمع بين الطب الحديث ونهج يركز على المريض.",
    experience: 14,
    rating: 4.7,
    reviewCount: 86,
    price: 65000, // IQD
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    availableDays: ["Sunday", "Monday", "Wednesday"],
    education: [
      { degree: "MB ChB", institution: "University of Kufa", year: 2006 },
      { degree: "Board Certification in Neurology", institution: "Iraqi Board of Medical Specialties", year: 2012 }
    ],
    languages: ["Arabic", "English"],
    consultationTypes: ["phone"]
  },
  {
    id: "6",
    name: "Dr. Layla Al-Kindi",
    nameAr: "د. ليلى الكندي",
    specialty: "Gynecology",
    specialtyAr: "أمراض النساء",
    city: "Mosul",
    cityAr: "الموصل",
    hospital: "Al-Khansa Women and Children Hospital",
    hospitalAr: "مستشفى الخنساء للنساء والأطفال",
    address: "Al-Dawasa, Mosul",
    addressAr: "الدواسة، الموصل",
    phone: "+964 771 678 9012",
    email: "dr.layla@iraqimedhub.iq",
    bio: "Dr. Layla is an experienced obstetrician and gynecologist who has helped bring thousands of healthy babies into the world. She specializes in high-risk pregnancies and female reproductive health.",
    bioAr: "د. ليلى هي طبيبة توليد وأمراض نساء ذات خبرة ساعدت في ولادة آلاف الأطفال الأصحاء. تتخصص في حالات الحمل عالية الخطورة وصحة الجهاز التناسلي للمرأة.",
    experience: 16,
    rating: 4.9,
    reviewCount: 176,
    price: 70000, // IQD
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    availableDays: ["Saturday", "Monday", "Thursday"],
    education: [
      { degree: "MB ChB", institution: "University of Mosul", year: 2004 },
      { degree: "Fellowship in Obstetrics and Gynecology", institution: "Royal College of Obstetricians and Gynaecologists, UK", year: 2010 }
    ],
    languages: ["Arabic", "English"],
    consultationTypes: ["video", "home"]
  }
];
