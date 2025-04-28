import { Product, Conversation, ChatMessage, User } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    email: 'ravi.kumar@iitb.ac.in',
    college: 'Indian Institute of Technology, Bombay',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
    isAdmin: false
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@du.ac.in',
    college: 'University of Delhi',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
    isAdmin: false
  },
  {
    id: '3',
    name: 'Admin Singh',
    email: 'admin.singh@iitk.ac.in',
    college: 'Indian Institute of Technology, Kanpur',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    isAdmin: true
  },
  {
    id: '4',
    name: 'Ananya Gupta',
    email: 'ananya.gupta@iimk.ac.in',
    college: 'Indian Institute of Management, Kozhikode',
    avatar: 'https://images.pexels.com/photos/5324891/pexels-photo-5324891.jpeg?auto=compress&cs=tinysrgb&w=100',
    isAdmin: false
  },
  {
    id: '5',
    name: 'Karan Mehta',
    email: 'karan.mehta@nitdgp.ac.in',
    college: 'National Institute of Technology, Durgapur',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    isAdmin: false
  },
  {
    id: '6',
    name: 'Sonia Verma',
    email: 'sonia.verma@bhu.ac.in',
    college: 'Banaras Hindu University',
    avatar: 'https://images.pexels.com/photos/3809523/pexels-photo-3809523.jpeg?auto=compress&cs=tinysrgb&w=100',
    isAdmin: false
  },
  {
    id: '7',
    name: 'Amit Yadav',
    email: 'amit.yadav@iitm.ac.in',
    college: 'Indian Institute of Technology, Madras',
    avatar: 'https://images.pexels.com/photos/7584204/pexels-photo-7584204.jpeg?auto=compress&cs=tinysrgb&w=100',
    isAdmin: false
  },
  {
    id: '8',
    name: 'Neha Singh',
    email: 'neha.singh@iitd.ac.in',
    college: 'Indian Institute of Technology, Delhi',
    avatar: 'https://images.pexels.com/photos/4929980/pexels-photo-4929980.jpeg?auto=compress&cs=tinysrgb&w=100',
    isAdmin: false
  },
  {
    id: '9',
    name: 'Rohit Bansal',
    email: 'rohit.bansal@iiml.ac.in',
    college: 'Indian Institute of Management, Lucknow',
    avatar: 'https://images.pexels.com/photos/2533465/pexels-photo-2533465.jpeg?auto=compress&cs=tinysrgb&w=100',
    isAdmin: false
  },
  {
    id: '10',
    name: 'Simran Kapoor',
    email: 'simran.kapoor@upes.ac.in',
    college: 'University of Petroleum and Energy Studies',
    avatar: 'https://images.pexels.com/photos/3513175/pexels-photo-3513175.jpeg?auto=compress&cs=tinysrgb&w=100',
    isAdmin: false
  }
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Calculus Textbook - 10th Edition',
    description: 'Barely used Calculus textbook. Highlights on some pages but otherwise in great condition.',
    price: 35,
    category: 'books',
    condition: 'good',
    images: [
      'https://images.pexels.com/photos/5238119/pexels-photo-5238119.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    seller: mockUsers[1],
    createdAt: '2025-03-15T10:20:30Z',
    isSold: false,
    isFree: false,
    college: 'University of Delhi'
  },
  {
    id: '2',
    title: 'Dell XPS 13 Laptop (2024)',
    description: 'Selling my Dell XPS 13 laptop. Intel i7, 16GB RAM, 512GB SSD. Purchased last year. Comes with charger and sleeve.',
    price: 850,
    category: 'electronics',
    condition: 'like-new',
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600'
    ],
    seller: mockUsers[0],
    createdAt: '2025-03-18T14:45:00Z',
    isSold: false,
    isFree: false,
    college: 'Indian Institute of Technology, Bombay'
  },
  {
    id: '3',
    title: 'Mini Fridge - Perfect for Dorms',
    description: 'Black mini fridge, 2.7 cubic feet. Works perfectly, I just graduated and don\'t need it anymore.',
    price: 65,
    category: 'hostel',
    condition: 'good',
    images: [
      'https://images.pexels.com/photos/5824883/pexels-photo-5824883.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    seller: mockUsers[1],
    createdAt: '2025-03-10T09:30:15Z',
    isSold: true,
    isFree: false,
    college: 'University of Delhi'
  },
  {
    id: '4',
    title: 'Free Psychology Books',
    description: 'Giving away several psychology textbooks. I\'ve completed my degree and want these to go to someone who needs them.',
    price: 0,
    category: 'books',
    condition: 'fair',
    images: [
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    seller: mockUsers[2],
    createdAt: '2025-03-17T11:20:45Z',
    isSold: false,
    isFree: true,
    college: 'Indian Institute of Technology, Kanpur'
  },
  {
    id: '5',
    title: 'Desk Lamp with Wireless Charging',
    description: 'Modern desk lamp with built-in wireless charging pad. Adjustable brightness levels. Like new condition.',
    price: 28,
    category: 'hostel',
    condition: 'like-new',
    images: [
      'https://images.pexels.com/photos/6186812/pexels-photo-6186812.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    seller: mockUsers[0],
    createdAt: '2025-03-16T16:40:20Z',
    isSold: false,
    isFree: false,
    college: 'Indian Institute of Technology, Bombay'
  },
  {
    id: '6',
    title: 'Basketball - Wilson NCAA Official Size',
    description: 'Official size basketball, good condition. Has some scuff marks but plenty of grip left.',
    price: 15,
    category: 'sports',
    condition: 'good',
    images: [
      'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    seller: mockUsers[1],
    createdAt: '2025-03-14T13:50:10Z',
    isSold: false,
    isFree: false,
    college: 'University of Delhi'
  },
  {
    id: '7',
    title: 'Winter Coat - North Face (Medium)',
    description: 'North Face winter coat, medium size. Black color, waterproof, very warm. Selling because I got a new one as a gift.',
    price: 120,
    category: 'clothing',
    condition: 'good',
    images: [
      'https://images.pexels.com/photos/7319158/pexels-photo-7319158.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    seller: mockUsers[2],
    createdAt: '2025-03-12T10:15:30Z',
    isSold: false,
    isFree: false,
    college: 'Indian Institute of Technology, Kanpur'
  },
  {
    id: '8',
    title: 'Computer Science Fundamentals Book',
    description: 'Introduction to Computer Science book, covers algorithms, data structures, and programming basics.',
    price: 25,
    category: 'books',
    condition: 'fair',
    images: [
      'https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    seller: mockUsers[0],
    createdAt: '2025-03-11T09:25:45Z',
    isSold: false,
    isFree: false,
    college: 'Indian Institute of Technology, Bombay'
  },
  {
    id: '9',
    title: 'Macbook Pro 2023 (16-inch)',
    description: 'Selling my Macbook Pro 16-inch, i9 processor, 32GB RAM, 1TB SSD. In perfect condition, just upgraded to a new model.',
    price: 95000,
    category: 'electronics',
    condition: 'like-new',
    images: [
      "https://www.notebookcheck.net/fileadmin/Notebooks/Apple/MacBook_Pro_14_2023_M3/IMG_1048.JPG"
    ],
    seller: mockUsers[5],
    createdAt: '2025-03-19T09:40:00Z',
    isSold: false,
    isFree: false,
    college: 'Banaras Hindu University'
  },
  {
    id: '10',
    title: 'Canon EOS Camera Kit',
    description: 'Canon EOS 80D Camera with lens kit, including bag and memory card. Used for a year, in excellent condition.',
    price: 750,
    category: 'electronics',
    condition: 'good',
    images: [
      'https://images.pexels.com/photos/747897/pexels-photo-747897.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    seller: mockUsers[7],
    createdAt: '2025-03-21T14:30:15Z',
    isSold: false,
    isFree: false,
    college: 'Indian Institute of Technology, Delhi'
  }
];
// Mock Conversations
export const mockConversations: Conversation[] = [
    {
      id: 'conv1',
      participants: [mockUsers[0], mockUsers[1]],
      productId: '1',
      lastMessage: {
        id: 'msg3',
        senderId: mockUsers[1].id,
        receiverId: mockUsers[0].id,
        productId: '1',
        content: 'Great, I\'ll meet you at the library tomorrow at 2pm.',
        timestamp: '2025-03-19T15:30:00Z',
        isRead: false
      },
      unreadCount: 1
    },
    {
      id: 'conv2',
      participants: [mockUsers[0], mockUsers[2]],
      productId: '4',
      lastMessage: {
        id: 'msg5',
        senderId: mockUsers[0].id,
        receiverId: mockUsers[2].id,
        productId: '4',
        content: 'Are these books still available?',
        timestamp: '2025-03-18T11:45:00Z',
        isRead: true
      },
      unreadCount: 0
    }
  ];
  
  // Mock Messages
export const mockMessages: ChatMessage[] = [
    {
      id: 'msg1',
      senderId: mockUsers[0].id,
      receiverId: mockUsers[1].id,
      productId: '1',
      content: 'Hi, is the Calculus textbook still available?',
      timestamp: '2025-03-19T14:20:00Z',
      isRead: true
    },
    {
      id: 'msg2',
      senderId: mockUsers[1].id,
      receiverId: mockUsers[0].id,
      productId: '1',
      content: 'Yes it is! Would you like to meet up to see it?',
      timestamp: '2025-03-19T14:25:00Z',
      isRead: true
    },
    {
      id: 'msg3',
      senderId: mockUsers[0].id,
      receiverId: mockUsers[1].id,
      productId: '1',
      content: 'That would be great. How about tomorrow at the library?',
      timestamp: '2025-03-19T14:40:00Z',
      isRead: true
    },
    {
      id: 'msg4',
      senderId: mockUsers[1].id,
      receiverId: mockUsers[0].id,
      productId: '1',
      content: 'Great, I\'ll meet you at the library tomorrow at 2pm.',
      timestamp: '2025-03-19T15:30:00Z',
      isRead: false
    },
    {
      id: 'msg5',
      senderId: mockUsers[0].id,
      receiverId: mockUsers[2].id,
      productId: '4',
      content: 'Are these books still available?',
      timestamp: '2025-03-18T11:45:00Z',
      isRead: true
    },
    {
      id: 'msg6',
      senderId: mockUsers[2].id,
      receiverId: mockUsers[0].id,
      productId: '4',
      content: 'Yes, they are! When would you like to pick them up?',
      timestamp: '2025-03-18T12:30:00Z',
      isRead: true
    }
  ];