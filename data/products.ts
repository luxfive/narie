import { Product } from '../types';

// Extending Product type locally for color property if needed in UI
export interface SeasonalProduct extends Product {
  colorTheme: string;
}

export const PRODUCTS_EN: SeasonalProduct[] = [
  {
    id: '1',
    name: 'Spring Bud',
    price: 35,
    priceVND: 850000,
    description: 'The touch of morning dew on young buds. A promise of new beginnings.',
    scentNotes: ['Grapefruit', 'Green Tea', 'Morning Dew'],
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a6967efd?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-olive'
  },
  {
    id: '2',
    name: 'Summer Breeze',
    price: 35,
    priceVND: 850000,
    description: 'Cool sea breeze touching the skin. Salt air and driftwood.',
    scentNotes: ['Sea Salt', 'Driftwood', 'Sage'],
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-mineral'
  },
  {
    id: '3',
    name: 'Autumn Sun',
    price: 35,
    priceVND: 850000,
    description: 'Warm sunlight through turning leaves. Spicy and grounding.',
    scentNotes: ['Cardamom', 'Cedarwood', 'Amber'],
    image: 'https://images.unsplash.com/photo-1570823635306-250abb06d4b3?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-terracotta'
  },
  {
    id: '4',
    name: 'Winter Hearth',
    price: 35,
    priceVND: 850000,
    description: 'Warmth from a kitchen corner. Comforting firewood and vanilla.',
    scentNotes: ['Firewood', 'Vanilla', 'Clove'],
    image: 'https://images.unsplash.com/photo-1608755717536-faa6a36e817e?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-charcoal'
  },
  {
    id: '5',
    name: 'Moonflower',
    price: 38,
    priceVND: 950000,
    description: 'A secret garden blooming under the moonlight. Mystical and floral.',
    scentNotes: ['Night Jasmine', 'Tuberose', 'White Musk'],
    image: 'https://images.unsplash.com/photo-1570700005880-46d6385c8085?q=80&w=1500&auto=format&fit=crop',
    category: 'limited',
    colorTheme: 'bg-indigo-900'
  },
  {
    id: '6',
    name: 'Silent Rain',
    price: 38,
    priceVND: 950000,
    description: 'The peaceful sound of rain hitting stone. Clean, fresh, and restorative.',
    scentNotes: ['Petrichor', 'Violet Leaf', 'Wet Stone'],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1500&auto=format&fit=crop',
    category: 'limited',
    colorTheme: 'bg-slate-600'
  },
  {
    id: '7',
    name: 'Velvet Night',
    price: 38,
    priceVND: 950000,
    description: 'Deep relaxation in the late hours. Smooth, rich, and calming.',
    scentNotes: ['Black Amber', 'Lavender', 'Tonka Bean'],
    image: 'https://images.unsplash.com/photo-1595461135849-bf08dc3a3303?q=80&w=1500&auto=format&fit=crop',
    category: 'limited',
    colorTheme: 'bg-purple-900'
  },
  {
    id: '11',
    name: 'Calm Diffuser Oil',
    price: 22,
    priceVND: 550000,
    description: 'Pure essential oil blend for deep sleep and relaxation.',
    scentNotes: ['French Lavender', 'Chamomile', 'Bergamot'],
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1500&auto=format&fit=crop',
    category: 'essential_oil',
    colorTheme: 'bg-stone-400'
  },
  {
    id: '12',
    name: 'Awaken Diffuser Oil',
    price: 22,
    priceVND: 550000,
    description: 'Energizing blend to start your morning with clarity.',
    scentNotes: ['Lemongrass', 'Ginger', 'Lime'],
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=1500&auto=format&fit=crop',
    category: 'essential_oil',
    colorTheme: 'bg-amber-400'
  },
  {
    id: '8',
    name: 'Narie Safety Matches',
    price: 12,
    priceVND: 250000,
    description: 'Long safety matches in a reusable glass apothecary bottle with striker pad.',
    scentNotes: ['Utility', 'Design', 'Safety'],
    image: 'https://images.unsplash.com/photo-1552590523-3d1b8b0b759e?q=80&w=1500&auto=format&fit=crop',
    category: 'accessory',
    colorTheme: 'bg-stone-500'
  },
  {
    id: '9',
    name: 'Matte Wick Trimmer',
    price: 18,
    priceVND: 450000,
    description: 'Essential tool for candle care. Ensures a clean, smoke-free burn every time.',
    scentNotes: ['Steel', 'Matte Black', 'Care'],
    image: 'https://images.unsplash.com/photo-1620642542614-10683461d64a?q=80&w=1500&auto=format&fit=crop',
    category: 'accessory',
    colorTheme: 'bg-stone-800'
  },
  {
    id: '10',
    name: 'Signature Gift Box',
    price: 8,
    priceVND: 150000,
    description: 'Luxurious packaging for the perfect gift. Includes ribbon and handwritten note.',
    scentNotes: ['Packaging', 'Gift', 'Detail'],
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1500&auto=format&fit=crop',
    category: 'accessory',
    colorTheme: 'bg-stone-300'
  }
];

export const PRODUCTS_VI: SeasonalProduct[] = [
  {
    id: '1',
    name: 'Mầm Xuân',
    price: 35,
    priceVND: 850000,
    description: 'Cảm giác sương sớm chạm lên chồi non. Tươi mới và tinh khôi.',
    scentNotes: ['Bưởi Hồng', 'Trà Xanh', 'Sương Mai'],
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a6967efd?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-olive'
  },
  {
    id: '2',
    name: 'Gió Hạ',
    price: 35,
    priceVND: 850000,
    description: 'Gió biển mát lành chạm vào da thịt. Muối biển và gỗ trôi.',
    scentNotes: ['Muối Biển', 'Gỗ Trôi', 'Xô Thơm'],
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-mineral'
  },
  {
    id: '3',
    name: 'Nắng Thu',
    price: 35,
    priceVND: 850000,
    description: 'Nắng ấm xuyên qua kẽ lá vàng. Trầm ấm và bình yên.',
    scentNotes: ['Bạch Đậu Khấu', 'Gỗ Tuyết Tùng', 'Hổ Phách'],
    image: 'https://images.unsplash.com/photo-1570823635306-250abb06d4b3?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-terracotta'
  },
  {
    id: '4',
    name: 'Lửa Đông',
    price: 35,
    priceVND: 850000,
    description: 'Hơi ấm từ góc bếp nhỏ. Củi khô và vani ngọt ngào.',
    scentNotes: ['Củi Khô', 'Vani', 'Đinh Hương'],
    image: 'https://images.unsplash.com/photo-1608755717536-faa6a36e817e?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-charcoal'
  },
  {
    id: '5',
    name: 'Hoa Trăng',
    price: 38,
    priceVND: 950000,
    description: 'Khu vườn bí mật nở rộ dưới ánh trăng. Huyền bí và quyến rũ.',
    scentNotes: ['Nhài Đêm', 'Hoa Huệ', 'Xạ Hương'],
    image: 'https://images.unsplash.com/photo-1570700005880-46d6385c8085?q=80&w=1500&auto=format&fit=crop',
    category: 'limited',
    colorTheme: 'bg-indigo-900'
  },
  {
    id: '6',
    name: 'Mưa Tĩnh Lặng',
    price: 38,
    priceVND: 950000,
    description: 'Tiếng mưa rơi êm đềm trên phiến đá. Trong lành và hồi phục.',
    scentNotes: ['Hương Đất', 'Lá Violet', 'Đá Ẩm'],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1500&auto=format&fit=crop',
    category: 'limited',
    colorTheme: 'bg-slate-600'
  },
  {
    id: '7',
    name: 'Đêm Nhung',
    price: 38,
    priceVND: 950000,
    description: 'Sự thư giãn sâu lắng những giờ khuya. Êm dịu và ấm áp.',
    scentNotes: ['Hổ Phách Đen', 'Oải Hương', 'Đậu Tonka'],
    image: 'https://images.unsplash.com/photo-1595461135849-bf08dc3a3303?q=80&w=1500&auto=format&fit=crop',
    category: 'limited',
    colorTheme: 'bg-purple-900'
  },
  {
    id: '11',
    name: 'Tinh Dầu Tĩnh Tâm',
    price: 22,
    priceVND: 550000,
    description: 'Hỗn hợp tinh dầu nguyên chất cho giấc ngủ sâu.',
    scentNotes: ['Oải Hương', 'Cúc La Mã', 'Cam Bergamot'],
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1500&auto=format&fit=crop',
    category: 'essential_oil',
    colorTheme: 'bg-stone-400'
  },
  {
    id: '12',
    name: 'Tinh Dầu Thức Tỉnh',
    price: 22,
    priceVND: 550000,
    description: 'Hỗn hợp năng lượng để khởi đầu ngày mới tỉnh táo.',
    scentNotes: ['Sả Chanh', 'Gừng', 'Chanh Tươi'],
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=1500&auto=format&fit=crop',
    category: 'essential_oil',
    colorTheme: 'bg-amber-400'
  },
  {
    id: '8',
    name: 'Diêm Thơm Narie',
    price: 12,
    priceVND: 250000,
    description: 'Diêm dài chuyên dụng trong lọ thủy tinh tái sử dụng, kèm giấy đánh lửa.',
    scentNotes: ['Tiện Dụng', 'Thiết Kế', 'An Toàn'],
    image: 'https://images.unsplash.com/photo-1552590523-3d1b8b0b759e?q=80&w=1500&auto=format&fit=crop',
    category: 'accessory',
    colorTheme: 'bg-stone-500'
  },
  {
    id: '9',
    name: 'Kéo Cắt Bấc',
    price: 18,
    priceVND: 450000,
    description: 'Dụng cụ thiết yếu để chăm sóc nến, giúp ngọn lửa cháy sạch và không khói.',
    scentNotes: ['Thép Đen', 'Bền Bỉ', 'Chăm Sóc'],
    image: 'https://images.unsplash.com/photo-1620642542614-10683461d64a?q=80&w=1500&auto=format&fit=crop',
    category: 'accessory',
    colorTheme: 'bg-stone-800'
  },
  {
    id: '10',
    name: 'Hộp Quà Signature',
    price: 8,
    priceVND: 150000,
    description: 'Gói ghém tỉ mỉ với hộp cứng, nơ lụa và thiệp viết tay. Hoàn hảo để tặng.',
    scentNotes: ['Đóng Gói', 'Quà Tặng', 'Tinh Tế'],
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1500&auto=format&fit=crop',
    category: 'accessory',
    colorTheme: 'bg-stone-300'
  }
];