
export interface CosmeticCenter {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  services: string[];
  priceRange: string;
  images: string[];
  description: string;
  specialties: string[];
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  workingHours: string;
}

export const cosmeticCentersData: CosmeticCenter[] = [
  {
    id: 1,
    name: "مركز الجمال التخصصي",
    rating: 4.9,
    reviewCount: 248,
    address: "شارع فلسطين، بغداد",
    services: ["بوتكس", "فيلر", "تقشير كيميائي", "ليزر"],
    priceRange: "$$",
    images: [
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=مركز+الجمال+1",
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=مركز+الجمال+2"
    ],
    description: "مركز متخصص في علاجات التجميل الطبي والعناية بالبشرة مع أحدث التقنيات.",
    specialties: ["تجميل الوجه", "نحت الجسم", "العناية بالبشرة"],
    contactInfo: {
      phone: "+964-7XX-XXX-XXX",
      email: "info@beautyexpert.iq",
      website: "www.beautyexpert.iq"
    },
    workingHours: "السبت - الخميس: 10 صباحًا - 8 مساءً"
  },
  {
    id: 2,
    name: "مركز النضارة للتجميل",
    rating: 4.8,
    reviewCount: 186,
    address: "المنصور، بغداد",
    services: ["تضليل الحواجب", "نضارة البشرة", "ميزوثيرابي", "بلازما"],
    priceRange: "$$$",
    images: [
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=مركز+النضارة+1",
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=مركز+النضارة+2"
    ],
    description: "خدمات تجميلية متكاملة بأيدي خبراء مختصين وأجهزة عالمية.",
    specialties: ["تجميل الوجه", "العناية بالشعر", "العناية بالبشرة"],
    contactInfo: {
      phone: "+964-7XX-XXX-XXX",
      email: "contact@freshbeauty.iq"
    },
    workingHours: "السبت - الخميس: 9 صباحًا - 7 مساءً"
  },
  {
    id: 3,
    name: "مركز إشراقة لطب التجميل",
    rating: 4.7,
    reviewCount: 157,
    address: "الكرادة، بغداد",
    services: ["تجميل الأنف", "شد الوجه", "زراعة الشعر", "شد البطن"],
    priceRange: "$$$",
    images: [
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=مركز+إشراقة+1",
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=مركز+إشراقة+2"
    ],
    description: "مركز متخصص في جراحات التجميل والإجراءات غير الجراحية.",
    specialties: ["جراحة التجميل", "العمليات غير الجراحية"],
    contactInfo: {
      phone: "+964-7XX-XXX-XXX",
      email: "info@ishraqa.iq",
      website: "www.ishraqa.iq"
    },
    workingHours: "السبت - الخميس: 10 صباحًا - 6 مساءً"
  },
  {
    id: 4,
    name: "مركز الفا كلينك للتجميل",
    rating: 4.9,
    reviewCount: 210,
    address: "زيونة، بغداد",
    services: ["نحت الجسم", "شد الترهلات", "تكبير الشفاه", "نفخ الخدود"],
    priceRange: "$$$$",
    images: [
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=الفا+كلينك+1",
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=الفا+كلينك+2"
    ],
    description: "مركز تجميل فاخر يقدم أحدث التقنيات العالمية في مجال التجميل.",
    specialties: ["نحت الجسم", "تجميل الوجه", "الليزر"],
    contactInfo: {
      phone: "+964-7XX-XXX-XXX",
      email: "info@alphaclinic.iq",
      website: "www.alphaclinic.iq"
    },
    workingHours: "السبت - الخميس: 11 صباحًا - 9 مساءً"
  },
  {
    id: 5,
    name: "بيوتي لاين كلينك",
    rating: 4.6,
    reviewCount: 143,
    address: "الجادرية، بغداد",
    services: ["الفيلر", "البوتكس", "الليزر", "تقشير البشرة"],
    priceRange: "$$",
    images: [
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=بيوتي+لاين+1",
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=بيوتي+لاين+2"
    ],
    description: "علاجات تجميلية بأسعار تنافسية وبأيدي خبراء متخصصين.",
    specialties: ["العناية بالبشرة", "الحقن التجميلي"],
    contactInfo: {
      phone: "+964-7XX-XXX-XXX",
      email: "info@beautyline.iq"
    },
    workingHours: "السبت - الأربعاء: 9 صباحًا - 6 مساءً"
  },
  {
    id: 6,
    name: "رويال كلينك للتجميل",
    rating: 4.8,
    reviewCount: 192,
    address: "العرصات، بغداد",
    services: ["تجميل الأنف", "تجميل الأذن", "شد الوجه", "زراعة الشعر"],
    priceRange: "$$$",
    images: [
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=رويال+كلينك+1",
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=رويال+كلينك+2"
    ],
    description: "مركز جراحات تجميلية متكامل بإشراف نخبة من الأطباء المتخصصين.",
    specialties: ["جراحة التجميل", "زراعة الشعر"],
    contactInfo: {
      phone: "+964-7XX-XXX-XXX",
      email: "care@royalclinic.iq",
      website: "www.royalclinic.iq"
    },
    workingHours: "السبت - الخميس: 10 صباحًا - 8 مساءً"
  },
  {
    id: 7,
    name: "مركز دايموند للتجميل",
    rating: 4.7,
    reviewCount: 165,
    address: "الحارثية، بغداد",
    services: ["تجميل الأسنان", "تبييض الأسنان", "ابتسامة هوليوود"],
    priceRange: "$$$$",
    images: [
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=دايموند+1",
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=دايموند+2"
    ],
    description: "مركز متخصص في تجميل الأسنان وابتسامة هوليوود.",
    specialties: ["تجميل الأسنان"],
    contactInfo: {
      phone: "+964-7XX-XXX-XXX",
      email: "smile@diamond.iq",
      website: "www.diamond.iq"
    },
    workingHours: "السبت - الخميس: 10 صباحًا - 7 مساءً"
  },
  {
    id: 8,
    name: "سكاي بيوتي سنتر",
    rating: 4.5,
    reviewCount: 132,
    address: "الكاظمية، بغداد",
    services: ["مكياج دائم", "تاتو الحواجب", "رموش دائمة"],
    priceRange: "$$",
    images: [
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=سكاي+بيوتي+1",
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=سكاي+بيوتي+2"
    ],
    description: "مركز متخصص في المكياج الدائم والتاتو التجميلي.",
    specialties: ["المكياج الدائم", "العناية بالبشرة"],
    contactInfo: {
      phone: "+964-7XX-XXX-XXX",
      email: "info@skybeauty.iq"
    },
    workingHours: "السبت - الخميس: 11 صباحًا - 8 مساءً"
  },
  {
    id: 9,
    name: "مركز فيفا للتجميل",
    rating: 4.6,
    reviewCount: 147,
    address: "الأعظمية، بغداد",
    services: ["تنحيف الجسم", "شد البطن", "شفط الدهون", "نحت الخصر"],
    priceRange: "$$$",
    images: [
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=فيفا+1",
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=فيفا+2"
    ],
    description: "مركز متخصص في علاجات تنحيف وتجميل الجسم.",
    specialties: ["نحت الجسم", "إزالة الدهون"],
    contactInfo: {
      phone: "+964-7XX-XXX-XXX",
      email: "info@viva.iq"
    },
    workingHours: "السبت - الخميس: 9 صباحًا - 7 مساءً"
  },
  {
    id: 10,
    name: "مركز كريستال للتجميل",
    rating: 4.9,
    reviewCount: 225,
    address: "الغدير، بغداد",
    services: ["الخيوط الذهبية", "نضارة البشرة", "تقشير البشرة", "علاج حب الشباب"],
    priceRange: "$$$$",
    images: [
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=كريستال+1",
      "https://placehold.co/400x300/E9D5FF/4C1D95?text=كريستال+2"
    ],
    description: "مركز طبي تجميلي يقدم أحدث تقنيات الخيوط الذهبية ونضارة البشرة.",
    specialties: ["العناية بالبشرة", "الخيوط التجميلية", "البشرة المشرقة"],
    contactInfo: {
      phone: "+964-7XX-XXX-XXX",
      email: "info@crystal.iq",
      website: "www.crystal.iq"
    },
    workingHours: "السبت - الجمعة: 10 صباحًا - 9 مساءً"
  }
];
