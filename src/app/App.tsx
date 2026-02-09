import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Search, MessageSquare, Bell, User, Plus, Home,
  MapPin, Filter, ArrowLeft, Send, Check, X,
  MoreVertical, Share2, Info, LogOut, Edit
} from 'lucide-react';
import { MatButton, MatCard, MatFAB, MatInput, cn } from './components/MaterialUI';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// --- Types & Mock Data ---

type Screen = 'splash' | 'home' | 'search' | 'details' | 'chat' | 'notifications' | 'profile';

interface Group {
  id: string;
  name: string;
  subject: string;
  members: number;
  description: string;
  image: string;
  isJoined?: boolean;
}

const GROUPS: Group[] = [
  {
    id: '1',
    name: 'Calculus II Study Group',
    subject: 'Math',
    members: 12,
    description: 'Weekly problem solving sessions for Calc II. Join us at the library!',
    image: 'https://images.unsplash.com/photo-1721702754494-fdd7189f946c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwZ3JvdXAlMjB1bml2ZXJzaXR5JTIwbGlicmFyeSUyMGNvZGluZyUyMHBoeXNpY3MlMjBiaW9sb2d5fGVufDF8fHx8MTc3MDYxNTU2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '2',
    name: 'Physics Lab Partners',
    subject: 'Physics',
    members: 8,
    description: 'Looking for partners for the upcoming thermodynamics project.',
    image: 'https://images.unsplash.com/photo-1758573466942-fbc45731e6eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHlzaWNzJTIwZXhwZXJpbWVudCUyMGxhYnxlbnwxfHx8fDE3NzA2MTU1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '3',
    name: 'Java & Algorithms',
    subject: 'Coding',
    members: 24,
    description: 'Practicing LeetCode and data structures together.',
    image: 'https://images.unsplash.com/photo-1718483610680-c26f3d02c57b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBsYXB0b3AlMjBjb2ZmZWV8ZW58MXx8fHwxNzcwNjA2NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '4',
    name: 'Bio 101 Review',
    subject: 'Biology',
    members: 15,
    description: 'Preparing for the midterm exam. Bring your notes!',
    image: 'https://images.unsplash.com/photo-1636386689060-37d233b5d345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9sb2d5JTIwbWljcm9zY29wZSUyMGxhYnxlbnwxfHx8fDE3NzA2MTU1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

const NOTIFICATIONS = [
  { id: 1, text: 'Your join request was approved for "Physics Lab Partners"', time: '2h ago' },
  { id: 2, text: 'New message in "Calculus II Study Group"', time: '5h ago' },
  { id: 3, text: 'StudyCircle: Welcome to the community!', time: '1d ago' }
];

const MESSAGES = [
  { id: 1, text: 'Hey everyone, are we meeting today?', sender: 'Alice', self: false, time: '10:30 AM' },
  { id: 2, text: 'Yes, library room 304 at 2 PM.', sender: 'Bob', self: false, time: '10:32 AM' },
  { id: 3, text: 'I\'ll be there!', sender: 'Me', self: true, time: '10:35 AM' },
];

// --- Main App Component ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Splash Screen Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('home');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (scr: Screen, group?: Group) => {
    if (group) setSelectedGroup(group);
    setScreen(scr);
    setDrawerOpen(false);
  };

  // --- Views ---

  const SplashScreen = () => (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#3F51B5] text-white">
      <div className="w-24 h-24 bg-white rounded-none flex items-center justify-center shadow-xl mb-6">
         <MessageSquare className="w-12 h-12 text-[#3F51B5]" fill="#3F51B5" />
      </div>
      <h1 className="text-5xl font-black tracking-wide mb-2">StudyCircle</h1>
      <p className="text-lg font-bold tracking-widest uppercase opacity-90">Find. Join. Learn.</p>
      <div className="mt-12 w-8 h-8 border-4 border-white/30 border-t-white rounded-none animate-spin"></div>
    </div>
  );

  const Drawer = () => (
    <div className={cn(
      "absolute inset-0 z-50 transition-transform duration-300 ease-in-out",
      drawerOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* Backdrop */}
      <div 
        className={cn("absolute inset-0 bg-black/50 transition-opacity", drawerOpen ? "opacity-100" : "opacity-0")}
        onClick={() => setDrawerOpen(false)}
      />
      {/* Sidebar content */}
      <div className="absolute left-0 top-0 bottom-0 w-[80%] max-w-[300px] bg-white shadow-2xl z-50 flex flex-col">
        <div className="h-40 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=500')] bg-cover bg-center p-4 flex flex-col justify-end text-white">
          <div className="w-16 h-16 rounded-none bg-white mb-3 flex items-center justify-center overflow-hidden border-2 border-white">
             <User className="w-8 h-8 text-gray-400" />
          </div>
          <div className="font-black text-xl text-shadow">Alex Student</div>
          <div className="text-sm font-bold opacity-100 text-shadow">alex@university.edu</div>
        </div>
        <div className="flex-1 py-2 overflow-y-auto">
          {[
            { icon: <Home size={20} />, label: 'Home', action: () => navigateTo('home') },
            { icon: <Search size={20} />, label: 'Find Groups', action: () => navigateTo('search') },
            { icon: <Bell size={20} />, label: 'Notifications', action: () => navigateTo('notifications') },
            { icon: <User size={20} />, label: 'Profile', action: () => navigateTo('profile') },
            { icon: <LogOut size={20} />, label: 'Logout', action: () => navigateTo('splash') },
          ].map((item, idx) => (
            <button 
              key={idx}
              onClick={item.action}
              className="w-full flex items-center px-4 py-3 hover:bg-gray-100 text-gray-900 font-bold text-base"
            >
              <span className="mr-6 text-gray-800">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="my-2 border-t-2 border-gray-200"></div>
          <div className="px-4 py-2 text-xs font-black text-gray-500 uppercase">Subscribed</div>
           {GROUPS.slice(0, 2).map(g => (
             <button key={g.id} className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-900 font-bold truncate" onClick={() => navigateTo('details', g)}>
               {g.name}
             </button>
           ))}
        </div>
      </div>
    </div>
  );

  const AppBar = ({ title, showBack = false, actions }: { title: string, showBack?: boolean, actions?: React.ReactNode }) => (
    <div className="h-14 bg-[#3F51B5] flex items-center px-4 shadow-md z-40 text-white shrink-0">
      {showBack ? (
        <button onClick={() => navigateTo('home')} className="mr-4 p-1 rounded-none hover:bg-white/10">
          <ArrowLeft size={24} strokeWidth={3} />
        </button>
      ) : (
        <button onClick={() => setDrawerOpen(true)} className="mr-4 p-1 rounded-none hover:bg-white/10">
          <Menu size={24} strokeWidth={3} />
        </button>
      )}
      <h1 className="text-xl font-bold flex-1 truncate uppercase tracking-tight">{title}</h1>
      <div className="flex items-center gap-4">
        {actions}
      </div>
    </div>
  );

  const HomeScreen = () => (
    <div className="flex flex-col h-full bg-gray-100">
      <AppBar 
        title="StudyCircle" 
        actions={<Search className="cursor-pointer" strokeWidth={3} onClick={() => navigateTo('search')} />} 
      />
      
      {/* Subject Filter Chips */}
      <div className="overflow-x-auto whitespace-nowrap px-2 py-3 bg-[#303F9F] text-white shadow-sm no-scrollbar">
        {['All', 'Math', 'Physics', 'Coding', 'Biology', 'History', 'Arts'].map((chip, i) => (
          <button 
            key={chip} 
            className={cn(
              "inline-block px-5 py-2 rounded-none text-sm font-bold mx-1 transition-colors uppercase tracking-wide",
              i === 0 ? "bg-white text-[#303F9F]" : "bg-[#3F51B5] border-2 border-white/30 hover:bg-[#283593]"
            )}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-2 pb-20">
        {GROUPS.map(group => (
          <MatCard key={group.id} className="mb-4 overflow-hidden flex flex-col border-b-2 border-gray-300" onClick={() => navigateTo('details', group)}>
            <div className="relative h-36 w-full">
              <ImageWithFallback src={group.image} alt={group.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-none">
                {group.members} MEMBERS
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black text-black leading-tight mb-1">{group.name}</h3>
                  <span className="text-xs font-black text-white bg-[#FF4081] uppercase tracking-wide px-2 py-1 inline-block mt-1">
                    {group.subject}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700 line-clamp-2 leading-relaxed">{group.description}</p>
            </div>
            <div className="border-t-2 border-gray-100 px-2 py-2 flex justify-end bg-gray-50">
              <MatButton variant="text" color="primary" className="font-bold" onClick={(e) => { e.stopPropagation(); navigateTo('details', group); }}>
                View Info
              </MatButton>
              <MatButton variant="contained" color="accent" className="font-bold ml-2 shadow-none" onClick={(e) => { e.stopPropagation(); navigateTo('chat', group); }}>
                Join Group
              </MatButton>
            </div>
          </MatCard>
        ))}
      </div>
      
      <div className="absolute bottom-20 right-4 z-30">
        <MatFAB onClick={() => alert('Create Group feature would open here!')}>
          <Plus size={28} strokeWidth={3} />
        </MatFAB>
      </div>
    </div>
  );

  const SearchScreen = () => (
    <div className="flex flex-col h-full bg-[#FAFAFA]">
       <div className="h-16 bg-white flex items-center px-2 shadow-md z-40 border-b-2 border-gray-200">
        <button onClick={() => navigateTo('home')} className="p-3 text-gray-800">
          <ArrowLeft size={24} strokeWidth={3} />
        </button>
        <input 
          autoFocus
          type="text" 
          placeholder="SEARCH GROUPS..." 
          className="flex-1 h-full text-lg font-bold outline-none text-black placeholder-gray-500 uppercase"
        />
        <button className="p-3 text-gray-800">
          <X size={24} strokeWidth={3} />
        </button>
      </div>
      
      <div className="p-4 space-y-6">
        <div className="bg-white p-5 rounded-none shadow-sm border border-gray-200">
          <h3 className="text-[#3F51B5] font-black text-lg mb-6 flex items-center uppercase tracking-wide">
            <Filter size={20} strokeWidth={3} className="mr-2" /> Filters
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs text-black uppercase font-black mb-2 block tracking-wider">Subject</label>
              <select className="w-full border-b-2 border-gray-400 py-2 bg-transparent outline-none font-bold text-gray-900">
                <option>Any Subject</option>
                <option>Math</option>
                <option>Physics</option>
                <option>Coding</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs text-black uppercase font-black mb-2 block tracking-wider">Location</label>
              <div className="flex items-center border-b-2 border-gray-400 py-2">
                <MapPin size={18} className="text-gray-600 mr-2" strokeWidth={2.5} />
                <span className="text-gray-900 font-bold">Current Location (Campus)</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
             <MatButton color="accent" className="px-8">Apply</MatButton>
          </div>
        </div>
      </div>
    </div>
  );

  const DetailsScreen = () => {
    if (!selectedGroup) return null;
    return (
      <div className="flex flex-col h-full bg-white overflow-y-auto">
        <div className="relative h-56 w-full shrink-0">
          <ImageWithFallback src={selectedGroup.image} alt={selectedGroup.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3F51B5]/90 to-transparent flex items-end p-6">
            <h1 className="text-white text-3xl font-black shadow-black drop-shadow-md leading-none">{selectedGroup.name}</h1>
          </div>
          <button onClick={() => navigateTo('home')} className="absolute top-4 left-4 p-2 bg-black/40 rounded-none text-white hover:bg-black/60">
            <ArrowLeft size={24} strokeWidth={3} />
          </button>
        </div>
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <span className="bg-[#FF4081] text-white font-black uppercase tracking-wider text-sm px-4 py-1.5 rounded-none shadow-md">
              {selectedGroup.subject}
            </span>
            <div className="flex text-black font-bold text-sm items-center">
              <User size={18} strokeWidth={3} className="mr-2" /> {selectedGroup.members} MEMBERS
            </div>
          </div>

          <MatCard className="p-5 mb-6 border-l-4 border-[#3F51B5] bg-gray-50">
            <h3 className="font-black text-black uppercase tracking-wide mb-2 text-sm">About Group</h3>
            <p className="text-gray-900 font-medium leading-relaxed text-base">{selectedGroup.description}</p>
          </MatCard>

          <MatCard className="p-0 mb-20 overflow-hidden border border-gray-200">
            <div className="bg-gray-200 px-5 py-3 border-b-2 border-gray-300 font-black text-gray-700 text-sm uppercase tracking-wider">
              Members List
            </div>
            {Array.from({length: 4}).map((_, i) => (
              <div key={i} className="flex items-center p-4 border-b border-gray-200 last:border-0 hover:bg-gray-50">
                <div className="w-12 h-12 rounded-none bg-[#3F51B5] flex items-center justify-center text-white font-black text-xl mr-4">
                  {String.fromCharCode(65 + i)}
                </div>
                <div className="flex-1">
                  <div className="text-black font-bold text-lg">Student {i + 1}</div>
                  <div className="text-xs font-bold text-gray-500 uppercase">Joined 2 days ago</div>
                </div>
                <MessageSquare size={20} className="text-gray-400" />
              </div>
            ))}
          </MatCard>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] flex gap-3 z-30 max-w-md mx-auto border-t border-gray-200">
          <MatButton variant="outlined" className="flex-1 border-2 font-black">Request Join</MatButton>
          <MatButton color="accent" className="flex-1 font-black shadow-lg" onClick={() => navigateTo('chat', selectedGroup)}>Open Chat</MatButton>
        </div>
      </div>
    );
  };

  const ChatScreen = () => {
    if (!selectedGroup) return null;
    return (
      <div className="flex flex-col h-full bg-[#E0E0E0]">
        <AppBar 
          title={selectedGroup.name} 
          showBack 
          actions={<MoreVertical className="cursor-pointer" strokeWidth={2.5} />} 
        />
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center text-xs font-bold text-gray-500 my-4 uppercase tracking-widest">Today, 10:25 AM</div>
          {MESSAGES.map(msg => (
             <div key={msg.id} className={cn("flex flex-col max-w-[85%]", msg.self ? "self-end items-end" : "self-start items-start")}>
               {!msg.self && <span className="text-xs font-bold text-gray-600 ml-1 mb-1">{msg.sender}</span>}
               <div className={cn(
                 "px-4 py-3 shadow-md text-sm font-medium relative border-none",
                 msg.self ? "bg-[#3F51B5] text-white rounded-none" : "bg-white text-gray-900 rounded-none"
               )}>
                 {msg.text}
               </div>
               <span className="text-[10px] font-bold text-gray-500 mt-1 mx-1">{msg.time}</span>
             </div>
          ))}
        </div>

        <div className="bg-white p-3 flex items-center gap-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] border-t border-gray-300">
          <button className="p-2 text-gray-500 hover:text-gray-800">
             <div className="w-8 h-8 border-2 border-current rounded-none flex items-center justify-center text-lg font-black">:)</div>
          </button>
          <input 
            className="flex-1 py-3 px-4 bg-gray-100 rounded-none outline-none text-sm font-medium text-black placeholder-gray-500 border-b-2 border-transparent focus:border-[#3F51B5] transition-colors" 
            placeholder="TYPE A MESSAGE..."
          />
          <button className="p-3 bg-[#FF4081] text-white rounded-none shadow-md hover:shadow-lg transition-shadow">
            <Send size={20} className="ml-0.5" strokeWidth={3} />
          </button>
        </div>
      </div>
    );
  };

  const NotificationsScreen = () => (
    <div className="flex flex-col h-full bg-[#FAFAFA]">
      <AppBar title="Notifications" />
      <div className="p-2 space-y-3">
        <div className="flex justify-end p-2">
           <button className="text-[#3F51B5] text-sm font-black uppercase tracking-wide">Clear All</button>
        </div>
        {NOTIFICATIONS.map(n => (
          <MatCard key={n.id} className="p-5 flex gap-4 items-start border-l-8 border-[#3F51B5] shadow-sm">
            <div className="mt-1">
               <Info size={24} className="text-[#3F51B5]" strokeWidth={3} />
            </div>
            <div className="flex-1">
              <p className="text-black text-sm font-bold leading-snug">{n.text}</p>
              <p className="text-xs text-gray-500 font-bold mt-2 uppercase">{n.time}</p>
            </div>
          </MatCard>
        ))}
      </div>
    </div>
  );

  const ProfileScreen = () => (
    <div className="flex flex-col h-full bg-[#FAFAFA]">
      <AppBar title="Profile" />
      <div className="bg-[#3F51B5] text-white pb-14 pt-10 px-6 relative mb-16 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-none bg-white p-1 shadow-2xl mb-5 relative z-10 rotate-3">
             <div className="w-full h-full rounded-none bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=500" alt="Profile" className="w-full h-full object-cover grayscale contrast-125" />
             </div>
             <button className="absolute -bottom-2 -right-2 bg-[#FF4081] p-3 rounded-none text-white shadow-lg border-2 border-white">
               <Edit size={16} strokeWidth={3} />
             </button>
          </div>
          <h2 className="text-3xl font-black tracking-wide">Alex Student</h2>
          <p className="opacity-90 font-bold uppercase tracking-widest text-xs mt-1">Computer Science Dept.</p>
        </div>
      </div>

      <div className="px-5 -mt-8 space-y-5">
        <MatCard className="p-6 flex justify-around text-center border-t-4 border-[#FF4081] shadow-md">
          <div>
            <div className="text-3xl font-black text-[#3F51B5]">12</div>
            <div className="text-xs text-black font-bold uppercase tracking-widest mt-1">Groups</div>
          </div>
          <div className="w-0.5 bg-gray-200"></div>
          <div>
            <div className="text-3xl font-black text-[#3F51B5]">48</div>
            <div className="text-xs text-black font-bold uppercase tracking-widest mt-1">Friends</div>
          </div>
        </MatCard>

        <h3 className="text-sm font-black text-black uppercase tracking-wider ml-1 mt-8 border-b-2 border-black inline-block pb-1">Joined Groups</h3>
        <div className="space-y-3 pb-20">
          {GROUPS.slice(0, 3).map(g => (
            <MatCard key={g.id} className="p-4 flex items-center border border-gray-200 hover:border-[#3F51B5] transition-colors">
              <div className="w-12 h-12 rounded-none bg-gray-200 mr-4 overflow-hidden shrink-0 border border-gray-300">
                <ImageWithFallback src={g.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 truncate">
                <div className="font-bold text-black text-lg truncate">{g.name}</div>
                <div className="text-xs font-bold text-[#FF4081] uppercase">{g.subject}</div>
              </div>
            </MatCard>
          ))}
        </div>
      </div>
    </div>
  );

  // --- Bottom Navigation ---
  // Only show on Home, Notifications, Profile
  const showBottomNav = ['home', 'notifications', 'profile'].includes(screen);

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center p-0 md:p-8 font-roboto">
      {/* Styles for animation */}
      <style>{`
        @keyframes ripple {
          to { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        .animate-ripple { animation: ripple 0.6s linear; }
        .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Mobile Frame */}
      <div className="w-full h-full md:w-[375px] md:h-[667px] bg-white md:rounded-none shadow-2xl overflow-hidden relative flex flex-col">
        {screen === 'splash' ? (
          <SplashScreen />
        ) : (
          <>
            <Drawer />
            <div className="flex-1 overflow-hidden relative bg-[#FAFAFA]">
              {screen === 'home' && <HomeScreen />}
              {screen === 'search' && <SearchScreen />}
              {screen === 'details' && <DetailsScreen />}
              {screen === 'chat' && <ChatScreen />}
              {screen === 'notifications' && <NotificationsScreen />}
              {screen === 'profile' && <ProfileScreen />}
            </div>

            {showBottomNav && (
              <div className="h-16 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)] flex items-center justify-around z-40 border-t-2 border-gray-100">
                <button 
                  onClick={() => setScreen('home')}
                  className={cn("flex flex-col items-center justify-center w-full h-full", screen === 'home' ? "text-[#3F51B5]" : "text-gray-400")}
                >
                  <Home size={28} strokeWidth={screen === 'home' ? 3 : 2.5} />
                </button>
                <button 
                   onClick={() => setScreen('notifications')}
                   className={cn("flex flex-col items-center justify-center w-full h-full", screen === 'notifications' ? "text-[#3F51B5]" : "text-gray-400")}
                >
                  <Bell size={28} strokeWidth={screen === 'notifications' ? 3 : 2.5} />
                </button>
                <button 
                   onClick={() => setScreen('profile')}
                   className={cn("flex flex-col items-center justify-center w-full h-full", screen === 'profile' ? "text-[#3F51B5]" : "text-gray-400")}
                >
                  <User size={28} strokeWidth={screen === 'profile' ? 3 : 2.5} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
