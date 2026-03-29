import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  image?: string;
}

export default function ToDo() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newImage, setNewImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch tasks from MongoDB", err);
        setLoading(false);
      });
  }, []);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTask, image: newImage })
      });
      const savedTask = await res.json();
      setTasks([savedTask, ...tasks]);
      setNewTask("");
      setNewImage("");
    } catch (err) {
      console.error("Failed to add task to MongoDB", err);
    }
  };

  const removeTask = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error("Failed to remove task from MongoDB", err);
    }
  };

  return (
    <main className="min-h-[100dvh] w-full overflow-y-auto overflow-x-hidden scroll-smooth relative bg-black">
      <div className="max-w-4xl mx-auto px-8 md:px-16 pt-48 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="font-serif text-4xl md:text-6xl text-white font-light italic">Our Bucket List</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] mt-4">Dreams to fulfill together</p>
        </motion.div>

        {/* Add Task Form */}
        <motion.form 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          onSubmit={addTask} 
          className="mb-12 flex flex-col md:flex-row gap-4 bg-white/[0.02] p-6 border border-white/10 rounded-sm shadow-xl"
        >
           <input 
             type="text" 
             placeholder="What's our next adventure?" 
             value={newTask}
             onChange={e => setNewTask(e.target.value)}
             className="flex-1 bg-transparent border-b border-white/20 text-white placeholder-white/30 px-2 py-2 focus:outline-none focus:border-white/60 transition-colors"
           />
           <div className="flex items-center gap-2 border-b border-white/20 px-2">
             <ImageIcon className="w-4 h-4 text-white/40" />
             <input 
               type="text" 
               placeholder="Image URL (optional)" 
               value={newImage}
               onChange={e => setNewImage(e.target.value)}
               className="bg-transparent text-white text-sm placeholder-white/30 py-2 focus:outline-none w-full md:w-32 lg:w-48"
             />
           </div>
           <button type="submit" className="bg-white text-black px-6 py-2 text-xs uppercase tracking-widest hover:bg-white/80 transition-colors flex items-center justify-center gap-2 mt-4 md:mt-0 shadow-lg">
             <Plus className="w-4 h-4" /> Add
           </button>
        </motion.form>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-white/40 uppercase tracking-[0.3em] font-light text-xs py-12 animate-pulse">
            Loading our memories from MongoDB...
          </div>
        )}

        {/* Tasks List Database Rendering */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {tasks.map(task => (
                <motion.div 
                  key={task._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  className="group relative border border-white/10 overflow-hidden bg-white/5 flex flex-col h-64 rounded-sm shadow-2xl"
                >
                   {task.image ? (
                     <div className="absolute inset-0 z-0 opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700">
                       <img src={task.image} className="w-full h-full object-cover" alt="" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                       <div className="absolute inset-0 bg-romantic-red mix-blend-color opacity-20 pointer-events-none group-hover:opacity-10 transition-opacity duration-700" />
                     </div>
                   ) : (
                     <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-transparent" />
                   )}
                   <div className="relative z-10 p-6 flex-1 flex flex-col justify-end">
                      <h3 className="font-serif text-2xl md:text-3xl text-white leading-tight drop-shadow-md">{task.title}</h3>
                   </div>
                   <button 
                     onClick={() => removeTask(task._id)}
                     type="button"
                     className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/50 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:border-red-400/50 transition-all backdrop-blur-sm"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
