export interface Teams {
    id:      number;
    name:    string;
    image:   Image;
    user:    User;
    ratings: number[];
}

export interface Image {
    url: string;
}

export interface User {
    id:          number;
    name:        string;
    description?: string;
}

export interface TeamDetails {
    id:              number;
    name:            string;
    description:     string;
    day:             string;
    time:            string;
    maxParticipants: number;
    userId:          number;
    imageId:         number;
    user:            User;
    image:           Image;
    ratings:         number[];
}

export interface Image {
    url: string;
}

export interface Booking {
    id: number;
    teamId: number;
    userId: number;
}

export interface Ratings {
    _avg: Avg;
}

export interface Avg {
    numStars: null;
}

export interface UserDetails {
    id:    number;
    name:  string;
    description?: string;
    email: string;
    isActive?: boolean;
    image: Image;
}

export interface Image {
    url: string;
}

export interface UserLoginData {
    accessToken:  string;
    refreshToken: string;
    user:         UserLogin;
}

export interface UserLogin {
    id:   number;
    name: string;
}

export interface UserData {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
}