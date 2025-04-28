// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
    { id: 'item-4', content: 'Item 4' },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/login');
      return;
    }

    const email = localStorage.getItem('userEmail');

    if (email) {
      setUser({ email });
      setLoading(false);
    } else {
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:5009/api/user/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(response.data.user);
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.removeItem('authToken');
          navigate('/login');
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="flex flex-col items-center space-y-6">

        <div className="flex flex-col items-center w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome to the dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Logout
          </button>
        </div>

        <h3 className="text-xl font-semibold text-gray-700">
          Dashboard - Drag and Drop
        </h3>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-white shadow-md p-6 rounded-md overflow-auto"
                style={{ width: '300px', minHeight: '400px' }}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 mb-4 rounded-md text-white font-medium transition duration-200 ${
                          snapshot.isDragging ? 'bg-blue-800' : 'bg-blue-600'
                        }`}
                        style={{
                          userSelect: 'none',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

      </div>
    </div>
  );
};

export default Home;
