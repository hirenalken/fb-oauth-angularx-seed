interface AuthResponse{
    accessToken: string;
    expiresIn: string;
    signedRequest: string;
    userID: string;
}

export interface FacebookAuthResponse {
   
    status: string;
    authResponse : AuthResponse;    
}