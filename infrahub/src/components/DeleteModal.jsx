import React from 'react'
import { X, Trash2 } from 'lucide-react'
import { supabase } from '../client'
import './DeleteModal.css'

function DeleteModal({postid, onClose}) {
    const deletePost = async (event) => {
            event.preventDefault();

            try {
                await supabase
                    .from('Posts')
                    .delete()
                    .eq('id', postid)
            } catch(error) {
                console.log(error);
                return;
            }
            console.log("Post deleted successfully")
            window.location = '/dashboard';
    }

    return (
        <div className="delete-modal">
            <div className="body">  
                <h2> Are you sure want to delete post? </h2>
                <button onClick={deletePost} className="delete-button"> <Trash2 /> Delete </button>
                <button onClick={onClose} className="cancel-button"> <X/> Cancel </button>
            </div>
        </div>
    )
}

export default DeleteModal;