import React from "react";  
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase/firebase";
import { db } from "../firebase/firebase";
import {getDocs, collection, addDoc } from "firebase/firestore";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";


function ProfileMaker(){

    
    const profileListRef = collection(db, "Profiles")
    
    const navigate = useNavigate();

    const youAreWelcome = () => {
        navigate("/Home", {replace: true});
    }
     const [profileList, setProfileList] = useState([]);

     
    
            const getProfiles = async() => {
              try{
                  const profiles = await getDocs(profileListRef);
                  const filteredProfiles = profiles.docs.map((user) => ({...user.data(), id: user.id}))
                  setProfileList(filteredProfiles)
              } catch(err) {
                alert(err);
              }
                }
    
            useEffect(() => {
    
                getProfiles();
    
            }, [])

            const verifyInput = async() => {

               let isTagUsed = false;
               let  isUserNameUsed = false;
                
                profileList.map((profile) => {

                    if(profile.tag == userAt){
                        
                        isTagUsed = true;
                        
                        return;
                    }
                    else if(profile.userName == userName) {
                        
                        isUserNameUsed = true;
                        return;
                    }
                })

                if(!isTagUsed && !isUserNameUsed && userImage != null){
                  const profileImageRef = ref(storage, `profileImages/${auth.currentUser.uid}`)
                uploadBytes(profileImageRef, userImage);
                await addDoc(profileListRef, {
                    bio: userBio,
                    tag: userAt,
                    userName: userName,
                    userId: auth.currentUser.uid,
                    followers: [],
                    following: []
                });
                youAreWelcome();
                }
                if(isTagUsed == true){
                    setTagUsed(true);
                }
                else {
                    setTagUsed(false);
                }
                 if(isUserNameUsed == true){
                    setUserNameUsed(true);
                }
                else {
                    setUserNameUsed(false);
                }
                

            
                
                
            }


          const [tagUsed, setTagUsed] = useState(false);
          const [userNameUsed, setUserNameUsed] = useState(false);

        const [userImage, setUserImage] = useState(null);
        const [userAt, setUserAt] = useState('');
        const [userName, setUserName] = useState('');
        const [userBio, setUserBio] = useState('');

    return (
        <>
            <div className="profileMaker">
                <div className="bg-gray-800 opacity-100 text-white flex flex-col items-center m-auto w-2/5 h-2/3 mt-16 py-14 rounded-3xl border-white overflow-hidden">
                <label htmlFor="Image">Add your profile image:</label>
                <input type="file" name="Image" id="" alt="Add image" accept="image/png, image/jpeg" className="text-white py-8 -mt-4" 
                onChange={(e) => {setUserImage(e.target.files[0])}}/>
                <label htmlFor="At" className="">Add your at:</label>
                <input type="text" name="At" id=""  maxLength={20} className="text-black" onChange={(e) => setUserAt(e.target.value)}/>
                {tagUsed && (<p className="text-red-700">At is allready used!</p>)}
                <label htmlFor="UserName">Add your username:</label>
                <input type="text" name="UserName" id="" maxLength={30} className="text-black" onChange={(e) => setUserName(e.target.value)}/>
                {userNameUsed && (<p className="text-red-700">User name is allready used!</p>)}
                <label htmlFor="Bio">Your bio down here:</label>
                <textarea name="Bio" id="" cols="30" rows="4" className="text-black" onChange={(e) => setUserBio(e.target.value)}></textarea>
                <button className="rounded-3xl bg-gray-700 text-base text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-4 px-32 py-5" 
                onClick={() => verifyInput()}>Come in!</button>
                </div>

            </div>
        </>
    )


}

export default ProfileMaker;