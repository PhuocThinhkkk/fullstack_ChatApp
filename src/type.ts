import * as z from "zod";
import { formSchema } from "./components/ButtonEditProfile";
export type UserDB = {
    _id : string;
    name: string,
    email: string ,
    roomsOwn?: RoomDb[],
    rooms?: RoomDb[],
    createdAt : Date,
    location? : string,
    avatarUrl? : string,
    role? : string,
    bio? : string,
    backgroundUrl? : string
}

export type UserCookie = {
    _id : string;
    name: string,
    email: string ,
    roomsOwnLength?: number,
    roomsLength?: number,
    createdAt : Date,
    location? : string,
    avatarUrl? : string,
    role? : string,
    bio? : string,
    backgroundUrl? : string
}


export type MessageDB = {
	_id? : string
	user: UserDB,
	room: RoomDb,
	createdAt? : Date,
	info: string;
}
export type ResponseMessage = {
	_id? : string
	user: UserDB,
	room: RoomDb,
	createdAt? : string,
	info: string;
}


//for area chart
export type roomMessageChartData = {
    date: string,
    dayInWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"| "Sunday",
    yourRoom: number,
    orthersRoom: number,
}

export type resPieChart = {
    id : string,
    roomName : string,
    count : number,
    fill : string,
}
  
export type resBigChart = {
    date : string,
    count : number,
}


export type UserProfile = {
    _id : string,
    name: string ,
    email: string ,
    roomsOwnLen: number,
    roomsLen: number,
    joinAt : string,
    messagesSent : number,
    location? : string,
    avatarUrl? : string,
    role? : string,
    bio? : string,
    backgroundUrl? : string
}

export type ContactFormData = z.infer<typeof formSchema>;


export type RoomDb = {
    _id: string;
    roomName: string;
    maxPeople: number,
    leaderId: UserDB;
    users: UserDB[];
    createdAt: Date;
    avatarUrl?: string
    description?: string
    category?: string
}


export type FeedbackDb = {
  _id: string
  title: string
  message: string
  rating: number
  user : UserDB
  category: string
  createdAt: Date
}

export type FeedbackFormType = {
    title: string,
    message: string,
    category: string,
    rating : number,
}


export type FriendUser = {
    _id : string,
    name : string,
    avatarUrl? : string,
    email : string,
    role? : string,
    location? : string
}

export type FriendRequestType = {
    _id : string,
    fromUser : UserDB,
    to : UserDB,
    isNewToTarget : boolean,
    createdAt : Date | string
}

export type UserSearchingType = UserDB & {
    isFriend : boolean,
    isFollowing : boolean,
    isFollower : boolean,
    requestId? : string,
}