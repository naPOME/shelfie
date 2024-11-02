import { supabase } from '@/lib/supabaseClient';
import React, { useEffect, useState } from 'react';
import { FaPen, FaSignOutAlt } from 'react-icons/fa'; 

export const ProfileDetail = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      const { data: { user }, error } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        setEmail(user.email);
        setName(user.user_metadata?.name || ''); 
      } else {
        console.log("User not logged in");
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => setEditMode(!editMode);

  const handleSignOut = async()=>{
    const {error} = await supabase.auth.signOut();
    if(error){
      console.log("Error Signing Out",error)
    }else{
      console.log("user Signed out success")
      window.location.href = "./sign-in"
    }
  }

  return (
    <div className="max-w-64 mx-auto mt-10 bg-gray-100 shadow-lg rounded-lg border-gray-200 border-2 text-gray-900 absolute top-5 right-5 p-4 z-50 shadow-gray-900">
      <div className="rounded-t-lg h-24 overflow-hidden">
        <img
          className="object-cover object-top w-full"
          src="https://img.freepik.com/free-vector/abstract-black-texture-background-hexagon_206725-413.jpg?t=st=1730290619~exp=1730294219~hmac=2177d163e2c9e480ea3a71aeaace2046767f1853fe5e5f11179db42714ab8d0e&w=826"
          alt="Background"
        />
      </div>

      <div className="w-20 h-20 relative -mt-10 mx-auto border-4 border-white rounded-full overflow-hidden">
        <img
          className="object-cover object-center h-32"
          src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
          alt="Profile"
        />
      </div>

      <div className="text-center mt-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {editMode ? (
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg font-semibold border rounded px-2"
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-lg font-semibold border rounded px-2 mt-2"
                  placeholder="Email"
                />
               
              </div>
            ) : (
              <div>
           
                <p className='text-sm text-gray-700 font-bald'>{email}</p>
               
              </div>
            )}
          </>
        )}

        <div className="flex justify-around py-3 border-t text-sm">
          <div className="text-center">
            <h3 className="font-semibold">100</h3>
            <span className="text-gray-500">Finished</span>
          </div>
          <div className="text-center">
            <h3 className="font-semibold">150</h3>
            <span className="text-gray-500">Reading List</span>
          </div>
          <div className="text-center">
            <h3 className="font-semibold">150</h3>
            <span className="text-gray-500">Read</span>
          </div>
        </div>
        <FaSignOutAlt onClick={handleSignOut}/>
      </div>
    </div>
  );
};
