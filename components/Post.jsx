import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  DotsHorizontalIcon,
  BookmarkIcon,
  ChatIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  addDoc,
  setDoc,
  deleteDoc,
  doc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Moment from "react-moment";

const Post = ({ id, userName, userImg, img, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [id]
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes, session?.user?.uid]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        userName: session?.user?.userName,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      userName: session?.user?.userName,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <li className="bg-white my-7 border rounded-sm">
      <div className="flex items-center p-5">
        <div className="border p-1 mr-3 rounded-full">
          <div className="relative h-12 w-12">
            <Image
              src={userImg}
              alt={userName}
              className="rounded-full"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <p className="flex-1 font-bold">{userName}</p>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>

      <div className="relative w-full h-[766px]">
        <Image
          src={img}
          alt=""
          layout="fill"
          objectFit="cover"
          placeholder="empty"
        />
      </div>

      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>

          <BookmarkIcon className="btn" />
        </div>
      )}

      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{userName} </span>
        {caption}
      </p>

      {comments.length !== 0 && (
        <ul
          className="ml-8 h-20 overflow-y-scroll 
        scrollbar-thumb-black scrollbar-thin"
        >
          {comments.map((comment) => (
            <li key={comment.id} className="flex items-center space-x-2 mb-3">
              <div className="relative h-9 w-9">
                <Image
                  src={comment.data().userImage}
                  alt={comment.userName}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                />
              </div>
              <p>
                <span className="font-bold">{comment.data().userName}</span>{" "}
                {comment.data().comment}
              </p>

              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </li>
          ))}
        </ul>
      )}

      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </li>
  );
};

export default Post;
